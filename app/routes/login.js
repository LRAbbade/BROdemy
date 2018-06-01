module.exports = function (application) {
    application.get('/login', function (req, res) {
        application.app.controllers.home.login.form(application, req, res);
    });
    application.post('/login', function (req, res) {
        application.app.controllers.home.login.check(application, req, res);
    });
};
