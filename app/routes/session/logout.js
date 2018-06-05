module.exports = function (application) {
    application.get('/logout', function (req, res) {
        if(req.session.data.autorizado){
            application.app.controllers.session.logout.out(application, req, res);
        }
        else{
            res.redirect('/');
        }
    });
};
