module.exports.show = function (application, req, res) {
    let data = req.params;
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);
    const userDAO = new application.app.models.UserDAO(connection);
    console.log(data);
    courseDAO.checkOwnerOfCourse(data, function (result) {
        console.log(result);
        if (result.instructor_id == req.session.data._id) {
            courseDAO.getClass(data, function (classes) {
                res.render("page/class", {classes: classes, user: req.session.data})
            })
        } else {
            userDAO.checkIfUserHasCourse(req.session.data, data, function (result) {
                if (result[0].has_course) {
                    courseDAO.getClass(data, function (classes) {
                        res.render("page/class", {classes: classes, user: req.session.data})
                    })
                } else {
                    res.redirect('/course/'+data._id);
                }
            });
        }
    });

};

