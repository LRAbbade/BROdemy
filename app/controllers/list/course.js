var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://admin:brodemy_admin@cluster0-z6v5t.mongodb.net/test";

module.exports.showAll = function (application, req, res) {

    MongoClient.connect(uri, function (err, client) {
        const collection = client.db("brodemy").collection("courses");
        collection.find().forEach(function (doc) {
            console.log(doc);
        });
        client.close();
    });

    /*ar connection = application.config.dbConnection;
    var courseDAO = new application.app.models.CourseDAO(connection);
    courseDAO.getCourses(req, res);   */
};
module.exports.showOne = function (application, req, res) {
    res.render("list/course/one");
};
