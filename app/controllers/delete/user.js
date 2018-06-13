module.exports.renderForm = function (application, req, res) {
    res.render("delete/user", {user: req.session.data});
};
module.exports.conclude = function (application, req, res) {
    const connection = application.config.dbConnection;
    const userDAO = new application.app.models.UserDAO(connection);
    const courseDAO = new application.app.models.CourseDAO(connection);
    userDAO.check(req.session.data, function (result) {
        if (result.length > 0) {
            userDAO.deleteUser(req.session.data,function () {
                courseDAO.deleteCourseBecauseTheInstructorHasBeenDeleted(req.session.data);
            });
        }
    });
    req.session.data = {
        autorizado: false
    };
    res.redirect('/');
};

