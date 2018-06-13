module.exports.show = function (application, req, res) {
    const connection = application.config.dbConnection;
    const userDAO = new application.app.models.UserDAO(connection);

    userDAO.showMyCourses(req.session.data, function (result) {
        console.log(result);
        res.render('profile/mycourse', {inform: result, user: req.session.data,manage: false});
    });
};

