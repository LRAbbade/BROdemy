module.exports = function (application) {
    application.get('/logout', function (req, res) {
        application.app.controllers.logout.out(application, req, res);
    });
};
