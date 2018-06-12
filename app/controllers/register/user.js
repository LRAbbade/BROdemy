module.exports.renderForm = function (application, req, res) {
    res.render("register/user", {validacao: {}, student: {},user:{}});
};
module.exports.conclude = function (application, req, res) {
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        courses: []
    };
    const connection = application.config.dbConnection;
    const userDAO = new application.app.models.UserDAO(connection);

    userDAO.createUser(data,function (count) {
        if (count === 0) {
            res.render("login", {validacao: {}, login: data, user: {}});
        }
        else {
            res.render("register/user", {
                validacao: [{
                    "msg": "Email ja cadastrado",
                }],
                student: data,
                user: {}
            });
        }
    });
};
