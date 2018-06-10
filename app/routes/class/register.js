module.exports = function (application) {
    application.get('/register_class/:course', function (req, res) {
        let data = req.params;
        if (!req.session.data.autorizado) {
            res.redirect('/login');
        } else if (data.course === req.session.data.id) {
            application.app.controllers.register.lesson.renderForm(application, req, res, data);
        } else {
            console.log(data);
            let url = "/course/:"+ data.id;
            console.log(url);
            res.redirect(url);
        }
    });
    application.post('/register_class/:_id', function (req, res) {
        var data = req.params;
        if (!req.session.data.autorizado) {
            res.redirect('/login');
        } else if (data._id === req.session.data.id) {
            application.app.controllers.register.lesson.conclude(application, req, res, data);
        } else {
            let url = "/course/:"+ data.course;
            console.log(url);
            res.redirect(url);
        }
    });
};
