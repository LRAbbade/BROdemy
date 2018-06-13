module.exports = function (application) {
    application.get('/delete_course/:_id', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.delete.course.done(application, req, res);
        }else{
            res.redirect('/login');
        }
    });
};
