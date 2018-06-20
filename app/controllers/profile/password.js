module.exports.change = function (application, req, res) {
    res.render("profile/changepassword", {user: req.session.data, validacao: {}});
};

module.exports.checkTochange = function (application, req, res) {
    const sha256 = require('sha256');

    const user = req.session.data;
    let data = {
        passwordBefore: sha256(req.body.passwordBefore),
    };
    let newPassword = {
        passwordAfter: req.body.passwordAfter,
        passwordAfter2: req.body.passwordAfter2
    };
    let msgToSend;
    if (data.passwordBefore === req.session.data.password) {
        if (newPassword.passwordAfter === newPassword.passwordAfter2) {
            if (data.passwordBefore === sha256(newPassword.passwordAfter)) {
                msgToSend = [{msg: "Você está tentando mudar para mesma senha,DUDE!"}];
                res.render("profile/changepassword", {user: user, validacao: msgToSend});
            }
            else {
                const connection = application.config.dbConnection;
                const userDAO = new application.app.models.UserDAO(connection);
                let data = req.session.data._id;
                let aux = newPassword.passwordAfter;
                let passwordCrypto = sha256(aux);
                let after = {
                    email: req.session.data.email,
                    name: req.session.data.name,
                    courses: req.session.data.courses,
                    password: passwordCrypto
                };

                userDAO.editPassword(after.password, after, data);
                msgToSend = [{msg: "senha alterada com sucesso"}];
                req.session.data.password = after.password;
                res.render("profile/status", {user: user, validacao: msgToSend});
            }
        } else {
            msgToSend = [{msg: "as senhas não são iguais"}];
            res.render("profile/changepassword", {user: req.session.data, validacao: msgToSend});
        }
    } else {
        msgToSend = [{msg: "você inseriu a senha errada ,DUDE!"}];
        res.render("profile/changepassword", {user: req.session.data, validacao: msgToSend});
    }
};
