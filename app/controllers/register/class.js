module.exports.renderForm = function (application, req, res) {
    var data = req.params;
    res.render("register/class", {user: req.session.data, class: {}, courses: data});
};
module.exports.conclude = function (application, req, res) {
    const connection = application.config.dbConnection;
    const courseDAO = new application.app.models.CourseDAO(connection);

    let data = req.params;
    let info = {
        number: req.body.number,
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        url: "https://www.youtube.com/embed/" + req.body.url
    };

    courseDAO.checkOwnerOfCourse(data, function (result) {

    });
    // courseDAO.addNewClass(data, info, function () {
    //     res.redirect('/course/' + data.id);
    // });
};
