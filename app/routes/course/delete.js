module.exports = function (application) {
    application.post('/delete_course/:_id', function (req, res) {
        application.app.controllers.delete.course.drop(application, req, res);
    });

};
