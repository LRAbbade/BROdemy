module.exports = function (application) {
    application.post('/delete_course/:_id', function (req, res) {
        if (req.session.data.autorizado) {
            application.app.controllers.delete.course.drop(application, req, res);
        }else{
            res.redirect('/login');
        }
    });
};
