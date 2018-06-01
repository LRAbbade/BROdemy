module.exports = function (application) {
    application.get('/list_courses',function (req,res) {
        application.app.controllers.list.course.showAll(application,req,res);
    });
    application.get('/list_course/:id',function (req,res) {
        application.app.controllers.list.course.showOne(application,req,res);
    });
};
