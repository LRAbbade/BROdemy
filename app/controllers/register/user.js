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
    const loginDAO = new application.app.models.LoginDAO(connection);

    loginDAO.createUser(data);
    res.render("home/login", {validacao: {}, login: data,user:{}});
};

