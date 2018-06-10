module.exports.renderForm = function (application, req, res) {
    res.render("register/register_course");
};
module.exports.conclude = function (application, req, res) {
    let course = {
        title: req.body.title,
        description: req.body.description,
        requisites: req.body.requisites,
        level: req.body.level,
        classes: [],
        image_src: req.body.image,
        instrutor_id: req.session.data._id
    };

    let connection = application.config.dbConnection;
    let courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.register(course);
    res.render("register/register_class");
};
