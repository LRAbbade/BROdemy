module.exports = function (application) {
    application.get('/delete_lesson', function (req, res) {
        application.app.controllers.delete.lesson.list(application, req, res);
    });
    application.get('/delete_lesson/:id', function (req, res) {
        application.app.controllers.delete.lesson.select(application,req,res);
    });
    application.delete('/delete_lesson/:id', function (req, res) {
        application.app.controllers.delete.lesson.conclude(application, req, res);
    });
};
