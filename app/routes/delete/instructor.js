module.exports = function (application) {
    application.get('/delete_instructor', function (req, res) {
        application.app.controllers.delete.instructor.list(application, req, res);
    });
    application.get('/delete_instructor/:id', function (req, res) {
        application.app.controllers.delete.instructor.select(application,req,res);
    });
    application.delete('/delete_instructor/:id', function (req, res) {
        application.app.controllers.delete.instructor.conclude(application, req, res);
    });
};
