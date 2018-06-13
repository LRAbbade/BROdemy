module.exports.form = function (application, req, res) {
    res.render("login", {validacao: {}, login: {}, user: {}});
};
module.exports.check = function (application, req, res) {
    const sha256 = require('sha256');
    let data = req.body;
    let connection = application.config.dbConnection;
    let userDAO = new application.app.models.UserDAO(connection);
    const aux = {
        email: data.email,
        password: sha256(data.password)
    };

    userDAO.check(aux, function (result) {
        if (result.length === 0) {
            res.render("login", {
                validacao: [{
                    "msg": "login ou senha invalida"
                }],
                login: data,
                user: {}
            });
        } else {
            req.session.data = {
                autorizado: true,
                _id: result[0]._id,
                email: result[0].email,
                name: result[0].name,
                courses: result[0].courses,
                password: result[0].password
            };
            res.redirect("/");
        }
    });
};
