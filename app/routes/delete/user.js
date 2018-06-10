module.exports = function (application) {
    application.get('/delete_account', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.delete.user.renderForm(application, req, res);
        }else{
            res.redirect('/');
        }
    });
    application.post('/delete_account', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.delete.user.conclude(application, req, res);
        }else{
            res.redirect('/');
        }
    });
};
