module.exports = function (application) {
    application.get('/my_courses_manage', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.profile.myCourseManage.show(application, req, res);
        } else {
            res.redirect('/login');
        }
    });
    application.post('/register_on_course/:_id', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.profile.myCourseManage.register(application, req, res);
        } else {
            res.redirect('/login');
        }
    });
};

