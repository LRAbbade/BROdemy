module.exports = function (application) {
    application.get('/list_lesson',function (req,res) {
        application.app.controllers.list.lesson.showAll(application,req,res);
    });
    application.get('/list_lesson/:id',function (req,res) {
        application.app.controllers.list.lesson.showOne(application,req,res);
    });
};
