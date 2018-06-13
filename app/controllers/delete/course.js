module.exports.done = function (application, req, res) {
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.deleteCourse(req.params);
    res.redirect('/');
};
