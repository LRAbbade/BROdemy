module.exports.show = function (application, req, res) {
    let data = req.params;
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);
    const userDAO = new application.app.models.UserDAO(connection);
    const aux = {
        _id:req.params._id,
        number : req.params.id
    };
    courseDAO.checkOwnerOfCourse(aux, function (result) {
        if (result.instructor_id == req.session.data._id) {
            courseDAO.getClass(aux, function (classes) {
                res.render("page/class", {classes: classes, user: req.session.data})
            });
        } else {
            userDAO.checkIfUserHasCourse(req.session.data, aux, function (result) {
                if (result[0].has_course) {
                    courseDAO.getClass(aux, function (classes) {
                        res.render("page/class", {classes: classes, user: req.session.data})
                    });
                } else {
                    res.redirect('/course/' + data._id);
                }
            });
        }
    });
};
