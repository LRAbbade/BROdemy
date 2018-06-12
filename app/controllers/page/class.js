module.exports.renderClass = function (application, req, res) {
    let data = req.params;
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.checkOwnerOfCourse(data);

};

