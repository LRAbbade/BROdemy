module.exports.renderForm = function (application, req, res) {
    res.render("delete/user",{user:req.session.data});
};
module.exports.conclude = function (application, req, res) {
    const connection = application.config.dbConnection;
    const loginDAO = new application.app.models.LoginDAO(connection);

    loginDAO.deleteUser(req.session.data);
    req.session.data = {
        autorizado : false
    };
    res.redirect('/');
};

