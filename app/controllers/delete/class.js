module.exports.renderForm = function (application, req, res) {
    res.render("delete/user", {user: req.session.data});
};
module.exports.conclude = function (application, req, res) {
    let toDelete = req.params;
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);
    console.log("aqui é no controler");
    console.log(toDelete);
    courseDAO.deleteClass(toDelete, function (result) {

    });
    res.redirect('/course/' + toDelete._id);
};
