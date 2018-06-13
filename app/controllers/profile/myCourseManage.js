module.exports.show = function (application, req, res) {
    const connection = application.config.dbConnection;
    const userDAO = new application.app.models.UserDAO(connection);

    userDAO.manageMyCourse(req.session.data, function (result) {
       
        if(result[0].total_courses !==  0){
            res.render('profile/mycourse', {inform: result, user: req.session.data,manage:true});
        } else{
            res.render('profile/manageNoCourses', { user: req.session.data,manage:true});
        }
    });
};



module.exports.register = function (application, req, res) {
    let course = req.params;
    const connection = application.config.dbConnection;
    let data = {
        email: req.session.data.email,
        name: req.session.data.name,
        courses: req.session.data.courses,
        password: req.session.data.password
    };
    const userDAO = new application.app.models.UserDAO(connection);
    userDAO.registerOnCourse(course, data);
    res.redirect("/my_courses");
};
