module.exports = function (application) {
    application.get('/course/:id/:name', function (req, res) {
        application.app.controllers.page.class.renderClass(application, req, res);
    });
};
