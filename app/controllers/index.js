module.exports.renderIndex = function (application, req, res) {
    console.log(req.session.data);
    var connection = application.config.dbConnection;
    var courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.getCourses(req,res);
};
