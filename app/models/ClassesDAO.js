function ClassesDAO(connection) {
    this._connection = connection();
}

ClassesDAO.prototype.register = function (lesson) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("lesson", function (err, collection) {
            collection.insert(lesson);
            mongoclient.close();
        })
    })
};

ClassesDAO.prototype.getLesson = function (lesson) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("lesson", function (err, collection) {
            collection.insert(lesson);
            mongoclient.close();
        })
    })
};
ClassesDAO.prototype.updateLesson = function (lessonName, req, res, lesson) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("lesson", function (err, collection) {
            console.log(lessonName);
            collection.update(lessonName, lesson, {upsert: true});
            mongocliente.close();
        });
    });
};

ClassesDAO.prototype.deleteLesson = function (Lesson) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("lesson", function (err, collection) {
            collection.remove(Lesson, 1);
            mongocliente.close();
        });
    });
};


module.exports = function () {
    return ClassesDAO;
};
