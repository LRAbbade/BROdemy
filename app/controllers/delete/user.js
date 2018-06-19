module.exports.renderForm = function (application, req, res) {
    res.render("delete/user", {user: req.session.data,validacao:[]});
};
module.exports.conclude = function (application, req, res) {
    const sha256 = require('sha256');
    const password = sha256(req.body.password);
    const connection = application.config.dbConnection;
    const userDAO = new application.app.models.UserDAO(connection);
    const courseDAO = new application.app.models.CourseDAO(connection);

    const data = {
        email: req.session.data.email,
        password: password
    };
    let user = req.session.data;
    if (password == req.session.data.password) {
        userDAO.check(data, function (result) {
            if (result.length > 0) {
                userDAO.deleteUser(req.session.data);
                req.session.destroy(function (error) {
                    res.redirect('/');
                });
            }else{
                res.redirect('/');
            }

        });
    } else {
        let validacao = [{
            msg: "Senha digitada incorretamente"
        }]
        res.render("delete/user", {user: req.session.data,validacao:validacao});
    }
};
