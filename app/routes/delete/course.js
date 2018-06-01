module.exports = function (application) {
    application.get('/delete_course', function (req, res) {
        application.app.controllers.delete.course.list(application, req, res);
    });
    application.get('/delete_student/:id', function (req, res) {
        application.app.controllers.delete.course.selectOne(application,req,res);
    });
    application.delete('/delete_student/:id', function (req, res) {
        application.app.controllers.delete.course.conclude(application, req, res);
    });
};
