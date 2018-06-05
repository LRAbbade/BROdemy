module.exports = function (application) {
    application.get('/login', function (req, res) {
        if(!req.session.data.autorizado){
            application.app.controllers.session.login.form(application, req, res);
        }else{
            res.redirect('/my_account');
        }
    });
    application.post('/login', function (req, res) {
        application.app.controllers.session.login.check(application, req, res);
    });
};
