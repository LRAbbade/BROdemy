module.exports.form = function (application, req, res) {
    res.render("login", {validacao: {}, login: {},user:{}});
};
module.exports.check = function (application, req, res) {
    let data = req.body;
    console.log(data);
    let connection = application.config.dbConnection;
    let userDAO = new application.app.models.UserDAO(connection);
    userDAO.check(data,req,res);
};
