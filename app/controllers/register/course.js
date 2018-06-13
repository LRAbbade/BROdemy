module.exports.renderForm = function (application, req, res) {
    res.render("register/course", {user: req.session.data});
};
module.exports.conclude = function (application, req, res) {

    let subCategory = req.body.sub_category;

    let requisiteString = req.body.requisites;

    let requisites = requisiteString.split('\r\n');
    let course = {
        name: req.body.title,
        description: req.body.description,
        requisites: requisites,
        level: req.body.level,
        classes: [],
        category: {
            category: null,
            sub_category: subCategory
        },
        image_src: req.body.image,
        instrutor_id: req.session.data._id
    };

    let connection = application.config.dbConnection;
    let courseDAO = new application.app.models.CourseDAO(connection);

    courseDAO.checkAlreadyHaveThisCourse(course, function (count) {
        if (count === 0) {
            courseDAO.register(course, function (result) {
                res.redirect('/course/' + result[0]._id);
            });
        } else {
            res.render("register/course", {
                validacao: [{
                    "msg": "O nome deste custo ja existe",
                }],
                course: course,
                user: {}
            });
        }
    });
};
