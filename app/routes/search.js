module.exports = function (application) {
    application.get('/courses/:name', function (req, res) {
        application.app.controllers.search.course(application, req, res);
    });
};
