module.exports = function (application) {
    application.get('/register_class/:_id', function (req, res) {
        if (!req.session.data.autorizado) {
            res.redirect('/login');
        } else {
            application.app.controllers.register.class.renderForm(application, req, res);
        }
        /* else {
                    console.log(data);
                    let url = "/course/:"+ data.id;
                    console.log(url);
                    res.redirect(url);
                }*/
    });
    application.post('/register_class/:_id', function (req, res) {
        if (!req.session.data.autorizado) {
            res.redirect('/login');
        } else {
            application.app.controllers.register.class.conclude(application, req, res);
        }
        /* else {
                    let url = "/course/:"+ data.course;
                    console.log(url);
                    res.redirect(url);
                }*/
    });
};
