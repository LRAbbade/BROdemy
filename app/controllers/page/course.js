module.exports.show = function (application, req, res) {
    let data = req.params;
    let connection = application.config.dbConnection;
    let courseDAO = new application.app.models.CourseDAO(connection);
    
    courseDAO.getCourse(data, function (result) {
        res.render("page/course",{course:result[0],user:req.session.data})
    })
};
