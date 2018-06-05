module.exports.out = function (application, req, res) {
    req.session.destroy(function (error) {
        res.redirect('/');
    });
};
