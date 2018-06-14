module.exports.renderForm = function (application, req, res) {
    res.render("delete/user", {user: req.session.data});
};
module.exports.conclude = function (application, req, res) {
    const sha256 = require('sha256');
    const password = sha256(req.body.password);
    const connection = application.config.dbConnection;
    const userDAO = new application.app.models.UserDAO(connection);
    const courseDAO = new application.app.models.CourseDAO(connection);

    const data = {
        email: req.session.data.email,
        password: password
    };
    let user = req.session.data;
    if (password == req.session.data.password) {
        userDAO.check(data, function (result) {
            if (result.length > 0) {
                // const courseId = result[0]._id;
                // let courseSelected ;
                // userDAO.getStudentsOfCourse(courseId, function (userHascourse) {
                //     userDAO.manageMyCourse(user, function (arr_courses) {
                //         let courses = arr_courses[0].course;
                //         for(let i = 0;i<courses.length;i++){
                //             courseSelected = courses[i]._id;
                //             userDAO.removeCourseFromAllStudents(courseSelected, userHascourse,function () {
                //         //         courseDAO.deleteCourse(courseSelected,function () {
                //         //             userDAO.deleteUser(user);
                //         //         });
                //             });
                //         }
                //     });
                // });
                userDAO.deleteUser(req.session.data);
                req.session.destroy(function (error) {
                    res.redirect('/');
                });
            }else{
                res.redirect('/');
            }

        });
    } else {
        //criar uma mesnageme falando que a senha está errada.
    }


};
