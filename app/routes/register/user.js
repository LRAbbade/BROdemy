module.exports = function (application) {
    application.get('/register_user',function (req,res) {
        application.app.controllers.register.user.renderForm(application,req,res);
    });
    application.post('/register_user',function (req,res) {
        application.app.controllers.register.user.conclude(application,req,res);
    });
};
