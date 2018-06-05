module.exports = function (application) {
    application.get('/my_account', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.profile.status.show(application, req, res);
        } else {
            res.redirect('/login');
        }
    });
};
