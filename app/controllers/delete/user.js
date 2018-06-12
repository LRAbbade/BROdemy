module.exports.renderForm = function (application, req, res) {
    res.render("delete/user",{user:req.session.data});
};
module.exports.conclude = function (application, req, res) {
    const connection = application.config.dbConnection;
    const userDAO = new application.app.models.UserDAO(connection);

    userDAO.deleteUser(req.session.data);
    req.session.data = {
        autorizado : false
    };
    res.redirect('/');
};

