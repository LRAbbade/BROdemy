module.exports = function (application) {
    application.get('/edit_lesson', function (req, res) {
        application.app.controllers.edit.lesson.list(application, req, res);
    });
    application.get('/edit_lesson/:id', function (req, res) {
        application.app.controllers.edit.lesson.select(application,req,res);
    });
    application.put('/edit_lesson/:id', function (req, res) {
        application.app.controllers.edit.lesson.conclude(application, req, res);
    });
};
