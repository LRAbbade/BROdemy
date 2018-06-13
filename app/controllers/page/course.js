module.exports.show = function (application, req, res) {
    let course = req.params;
    let connection = application.config.dbConnection;
    let courseDAO = new application.app.models.CourseDAO(connection);
    let userDAO = new application.app.models.UserDAO(connection);

    console.log("aqui chegou");
    courseDAO.getCourse(course, function (result) {
        if (req.session.data._id === "") {
            let have = false;
            res.render("page/course", {course: result[0], user: req.session.data, haveThisCourse: have});
        } else {
            userDAO.checkIfUserHasCourse(req.session.data, course, function (have) {
                console.log(result);
                res.render("page/course", {course: result[0], user: req.session.data, haveThisCourse: have});
            });
        }

    });
};
