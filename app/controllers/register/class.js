module.exports.renderForm = function (application, req, res) {
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.checkOwnerOfCourse(req.params, function (result) {
        if (result.instructor_id == req.session.data._id) {
            res.render("register/class", {user: req.session.data, class: {}, courses: result});
        } else{
            res.redirect('/course/'+result._id);
        }         
    });
};
module.exports.conclude = function (application, req, res) {
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);

    let info = {
        number: req.body.number,
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        url: "https://www.youtube.com/embed/" + req.body.url
    };


    courseDAO.checkOwnerOfCourse(req.params, function (result) {
        if (result.instructor_id == req.session.data._id) {
            courseDAO.addNewClass(result, info);
        }
        res.redirect('/course/' + result._id);

    });
};
