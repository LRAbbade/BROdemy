module.exports.renderForm = function (application, req, res) {
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.checkOwnerOfCourse(req.params, function (result) {
        if (result.instructor_id == req.session.data._id) {
            res.render("register/class", {user: req.session.data, class: {}, courses: result});
        } else {
            res.redirect('/course/' + result._id);
        }
    });
};
module.exports.conclude = function (application, req, res) {
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);
    let msgTosend;
    const info = {
        number: req.body.number,
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        url: "https://www.youtube.com/embed/" + req.body.url
    };
    const data = req.params;

    courseDAO.checkOwnerOfCourse(data, function (result) {
        if (result.instructor_id == req.session.data._id) {
            courseDAO.checkIfClassNumberIsInCourse(data._id, info.number, function (numberOfClasses) {
                if (numberOfClasses.length === 0) {
                    courseDAO.addNewClass(data, info);
                    res.redirect('/course/' + result._id);
                } else {
                    res.render("register/class", {user: req.session.data, class: info, courses: result});
                }
            });
        } else {
            res.redirect('/course/' + result._id);
        }


    });
};
