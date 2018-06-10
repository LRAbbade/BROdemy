module.exports = function (application) {
    application.get('/', function (req, res) {
        application.app.controllers.index.renderIndex(application, req, res);
    });
    application.post('/course_search', function (req, res) {
        application.app.controllers.index.whatIlookingfor(application, req, res);
    })
};
