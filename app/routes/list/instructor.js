module.exports = function (application) {
    application.get('/list_instructor',function (req,res) {
        application.app.controllers.list.instructor.showAll(application,req,res);
    });
    application.get('/list_instructor/:id',function (req,res) {
        application.app.controllers.list.instructor.showOne(application,req,res);
    });
};
