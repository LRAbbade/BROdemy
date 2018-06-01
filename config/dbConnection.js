var mongo = require('mongodb');

var connMongoDB = function () {
    var db = new mongo.Db(
        'brodemy',
        new mongo.Server(
            'localhost',//string contendo o endereço do servidor
            27017,
            {}
        ),
        {}
    );
    return db;
};
module.exports = function () {
    return connMongoDB;
};
