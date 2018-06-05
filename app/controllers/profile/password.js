module.exports.change = function (application, req, res) {
    res.render("profile/changepassword", {user: req.session.data, toChange: {}});
};

module.exports.checkTochange = function (application, req, res) {
    let data = req.body;
    let msgToSend;
    if (data.passwordBefore === req.session.data.password) {
        if (data.passwordAfter === data.passwordAfter2) {
            console.log("senha alterada com sucesso");
            const connection = application.config.dbConnection;
            const loginDAO = new application.app.models.LoginDAO(connection);

            loginDAO.editPassword(req, res, req.sesion.data._id, data.passwordAfter);

            res.redirect('/my_account');//put render after 
        } else {

        }
    } else {

    }
};
