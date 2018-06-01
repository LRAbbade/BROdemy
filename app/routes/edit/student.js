module.exports = function (application) {
    application.get('/edit_student', function (req, res) {
        application.app.controllers.edit.student.list(application, req, res);
    });
    application.get('/edit_student/:id', function (req, res) {
        application.app.controllers.edit.student.select(application,req,res);
    });
    application.put('/edit_student/:id', function (req, res) {
        application.app.controllers.edit.student.conclude(application, req, res);
    });
};
