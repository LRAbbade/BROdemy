module.exports = function (application) {
    application.get('/', function (req, res) {
        application.app.controllers.home.index.renderIndex(application, req, res);
    });
};
