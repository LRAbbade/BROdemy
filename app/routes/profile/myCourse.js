module.exports = function (application) {
    application.get('/my_courses', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.profile.myCourse.show(application, req, res);
        } else {
            res.redirect('/login');
        }
    });
    application.post('/register_on_course/:_id', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.profile.myCourse.register(application, req, res);
        } else {
            res.redirect('/login');
        }
    });
};

