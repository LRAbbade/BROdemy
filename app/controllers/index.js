module.exports.renderIndex = function (application, req, res) {
    var connection = application.config.dbConnection;
    var courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.getCourses(function (result) {
        if (typeof req.session.data === "undefined") {
            res.render("index", {courses: result, user: {}});
        } else {
            res.render("index", {courses: result, user: req.session.data});
        }
    });
};

module.exports.whatIlookingfor = function (application, req, res) {
    let data = req.body;
    let url = "/courses/" + data.toSearch;
    res.redirect(url)
};
