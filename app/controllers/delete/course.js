module.exports.done = function (application, req, res) {
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);
    const userDAO = new application.app.models.UserDAO(connection);
    const courseId = req.params._id;
    courseDAO.deleteCourse(courseId, function(){
        console.log(courseId + " deleted")
    });

    // userDAO.getStudentsOfCourse(courseId, function (userHascourse) {
    //     userDAO.manageMyCourse(req.session.data, function (courses) {
    //         for(let i = 0;i<courses.length;i++){
    //             courseSelected = courses[i][0].instructor_courses._id;
    //             userDAO.removeCourseFromAllStudents(courseSelected, userHascourse,function () {
    //
    //             });
    //         }
    //     });
    // });

    res.redirect('/');
};
