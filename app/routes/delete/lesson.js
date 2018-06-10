module.exports = function (application) {
    application.get('/delete_class/:_id/:number',function (req,res) {
        application.app.controllers.delete.class.renderForm(application,req,res);
    });
    application.post('/delete_class/:_id/:name',function (req,res) {
        application.app.controllers.delete.class.conclude(application,req,res);
    });
};
