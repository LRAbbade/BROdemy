module.exports = function (application) {
    application.get('/change_password', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.profile.password.change(application, req, res);
        } else {
            res.redirect('/login');
        }
    });
    application.post('/change_password', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.profile.password.checkTochange(application, req, res);
        } else {
            res.redirect('/login');
        }
    })
};
