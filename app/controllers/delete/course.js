module.exports.done = function (application, req, res) {
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);
    const userDAO = new application.app.models.UserDAO(connection);
    const courseId = req.params._id;
    courseDAO.deleteCourse(courseId);
    res.redirect('/');
};
