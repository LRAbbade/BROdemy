module.exports.renderIndex = function (application, req, res) {
    var connection = application.config.dbConnection;
    var courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.getCourses(req, res);
};

module.exports.whatIlookingfor = function (application, req, res) {
    let data = req.body;
    let url = "/courses/" + data.toSearch;
    res.redirect(url)
};
