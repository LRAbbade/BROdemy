module.exports.course = function (application, req, res) {
    let data = req.params;
    var connection = application.config.dbConnection;
    var courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.findCourses(data, function (result) {
        res.render("search/course", {courses: result, user: req.session.data});
    });
};
