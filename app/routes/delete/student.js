module.exports = function (application) {
    application.get('/delete_student', function (req, res) {
        application.app.controllers.delete.student.list(application, req, res);
    });
    application.get('/delete_student/:id', function (req, res) {
        application.app.controllers.delete.student.select(application,req,res);
    });
    application.delete('/delete_student/:id', function (req, res) {
        application.app.controllers.delete.student.conclude(application, req, res);
    });
};
