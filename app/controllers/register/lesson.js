module.exports.renderForm = function (application, req, res) {
    res.render("register/course", {user: req.session.data, course: {}});
};
module.exports.conclude = function (application, req, res, data) {
    let info = {
        name : req.body.name,
        description : req.body.description,
        duration : req.body.duration,
        url : "https://www.youtube.com/embed/"+ req.body.url
    };

    console.log(info);
    var connection = application.config.dbConnection;
    var courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.addNewClass(data,info);
};
//nome , descricao, duração,url
