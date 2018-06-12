module.exports = function (application) {
    application.get('/course/:_id', function (req, res) {
        application.app.controllers.page.course.renderForm(application, req, res);
    });
    application.post('/course/:_id', function (req, res) {
        application.app.controllers.page.course.conclude(application, req, res);
    });
};
