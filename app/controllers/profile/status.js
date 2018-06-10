module.exports.show = function (application, req, res) {
    res.render("profile/status", {user: req.session.data,validacao:{}});
};
