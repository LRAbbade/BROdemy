module.exports = function (application) {
    application.get('/edit_courses', function (req, res) {
        application.app.controllers.edit.course.list(application, req, res);
    });
    application.get('/edit_courses/:id', function (req, res) {
       application.app.controllers.edit.course.select(application,req,res);
    });
    application.put('/edit_course/:id', function (req, res) {
        application.app.controllers.edit.course.conclude(application, req, res);
    });
};
