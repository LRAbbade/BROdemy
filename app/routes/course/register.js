module.exports = function (application) {
    application.get('/register_course', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.register.course.renderForm(application, req, res);
        }else{
            res.redirect('/');
        }
    });
    application.post('/register_course', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.register.course.conclude(application, req, res);
        }else{
            res.redirect('/');
        }
    });
};
