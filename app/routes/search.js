module.exports = function (application) {
    application.get('/courses/:title', function (req, res) {
        application.app.controllers.search.course(application, req, res);
    });
};
