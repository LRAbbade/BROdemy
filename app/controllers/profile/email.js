module.exports.show = function (application, req, res) {
    req.render("profile/changeEmail");
};

module.exports.checkTochange = function (application, req, res) {
    let data = req.body;
    let msgToSend;
    if (data.password === req.session.data.password) {
        const connection = application.config.dbConnection;
        const userDAO = new application.app.models.UserDAO(connection);

        userDAO.changeEmail(req,res,data);
    } else {
        msgToSend = [{msg: "Senha errada, DUDE!"}];
        res.render("profile/changeEmail", {user: req.session.data, validacao: msgToSend});
    }
};
