module.exports.change = function (application, req, res) {
    res.render("profile/changepassword", {user: req.session.data, validacao: {}});
};

module.exports.checkTochange = function (application, req, res) {
    let data = req.body;
    let msgToSend;
    if (data.passwordBefore === req.session.data.password) {
        if (data.passwordAfter === data.passwordAfter2) {
            const connection = application.config.dbConnection;
            const userDAO = new application.app.models.UserDAO(connection);

            userDAO.editPassword(req, res, data.passwordAfter);
            msgToSend = [{msg: "senha alterada com sucesso"}];
            res.render("profile/status", {user: req.session.data, validacao: msgToSend});
        } else {
            msgToSend = [{msg: "as senhas não são iguais"}];
            res.render("profile/changepassword", {user: req.session.data, validacao: msgToSend});
        }
    } else {
        msgToSend = [{msg: "você colocou a mesma senha ,DUDE!"}];
        res.render("profile/changepassword", {user: req.session.data, validacao: msgToSend});
    }
};
