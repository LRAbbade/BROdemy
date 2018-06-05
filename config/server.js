var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

function changeUndefined(req, res,next) {
    console.log(req.session.data);
    if (typeof req.session.data === "undefined") {
        req.session.data = {
            autorizado: false
        };
    }
    next();
}
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(expressSession({
    secret: 'hijiodsasdiisai2sjado',
    resave: false,
    saveUninitialized: false
}));
app.use(changeUndefined);
consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;
