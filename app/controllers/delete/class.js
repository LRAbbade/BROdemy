module.exports.renderForm = function (application, req, res) {
    res.render("delete/user", {user: req.session.data});
};
module.exports.conclude = function (application, req, res) {
    let toDelete = req.params;
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);
    courseDAO.deleteClass(toDelete._id,toDelete.number);
    res.redirect('/course/' + toDelete._id);
};
