module.exports = function (application) {
    application.get('/list_student',function (req,res) {
        application.app.controllers.list.student.showAll(application,req,res);
    });
    application.get('/list_student/:id',function (req,res) {
        application.app.controllers.list.student.showOne(application,req,res);
    });
};
