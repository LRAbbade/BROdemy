module.exports = function (application) {
    application.get('/course/:_id/:name', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.page.class.show(application, req, res);
        } else {
            res.redirect('/login');
        }

    });
};
