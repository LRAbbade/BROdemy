module.exports = function (application) {
    application.get('/register_class/:_id', function (req, res) {
        if (!req.session.data.autorizado) {
            res.redirect('/login');
        } else {
            application.app.controllers.register.class.renderForm(application, req, res);
        }
    });
    application.post('/register_class/:_id', function (req, res) {
        if (!req.session.data.autorizado) {
            res.redirect('/login');
        } else {
            application.app.controllers.register.class.conclude(application, req, res);
        }
    });
};
