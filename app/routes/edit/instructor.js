module.exports = function (application) {
    application.get('/edit_instructor', function (req, res) {
        application.app.controllers.edit.instructor.list(application, req, res);
    });
    application.get('/edit_instructor/:id', function (req, res) {
        application.app.controllers.edit.instructor.select(application,req,res);
    });
    application.put('/edit_instructor/:id', function (req, res) {
        application.app.controllers.edit.instructor.conclude(application, req, res);
    });
};
