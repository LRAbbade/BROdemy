module.exports.show = function (application, req, res) {
    res.render("home/profile", {user: req.session.data});
};
