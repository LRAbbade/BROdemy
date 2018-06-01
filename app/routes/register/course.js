module.exports = function (application) {
   application.get('/register_course',function (req,res) {
       application.app.controllers.register.course.renderForm(application,req,res);
   });
    application.post('/register_course',function (req,res) {
        application.app.controllers.register.course.conclude(application,req,res);
    });
};
