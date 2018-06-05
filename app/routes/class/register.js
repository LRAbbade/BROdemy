module.exports = function (application) {
    application.get('/register_lesson',function (req,res) {
        application.app.controllers.register.lesson.renderForm(application,req,res);
    });
    application.post('/register_lesson',function (req,res) {
        application.app.controllers.register.lesson.conclude(application,req,res);
    });
};
