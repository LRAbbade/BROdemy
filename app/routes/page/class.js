module.exports = function (application) {
    application.get('/course/:id/:name', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.page.class.renderClass(application, req, res);
        }

    });
};
