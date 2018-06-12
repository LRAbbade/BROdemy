module.exports.renderForm = function (application, req, res) {
    var data = req.params;
    console.log("aqui chegou");
    res.render("register/class", {user: req.session.data, class: {},course: data});
};
module.exports.conclude = function (application, req, res) {
    var data = req.params;
    let info = {
        number: req.body.number,
        name : req.body.name,
        description : req.body.description,
        duration : req.body.duration,
        url : "https://www.youtube.com/embed/"+ req.body.url
    };

    var connection = application.config.dbConnection;
    var courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.addNewClass(data,info,res);
};
