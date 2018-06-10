module.exports.course = function (application, req, res) {
    let data = req.params;
    var connection = application.config.dbConnection;
    var courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.findCourses(req, res, data);
};
