module.exports.show = function (application, req, res) {
    const connection = application.config.dbConnection;
    const userDAO = new application.app.models.UserDAO(connection);

    userDAO.showMycouses();
};

module.exports.checkTochange = function (application, req, res) {

};
