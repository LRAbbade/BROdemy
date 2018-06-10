module.exports.list = function (application, req, res) {
    res.render("delete/student/all");
};
module.exports.select = function (application, req, res) {
    res.render("delete/student/one");
};
module.exports.conclude = function (application, req, res) {

};
module.exports.drop = function (application, req, res) {
    let data = req.params;
    var connection = application.config.dbConnection;
    var courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.deleteCourse(data);
};
