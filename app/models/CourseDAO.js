function CourseDAO(connection) {
    this._connection = connection();
}

CourseDAO.prototype.register = function (Course) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.insert(Course);
            mongoclient.close();
        });
    });
};
//incompleto
CourseDAO.prototype.addNewClass = function () {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.insert(Course);
            mongoclient.close();
        });
    });
};
CourseDAO.prototype.getCourses = function (req, res) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find().toArray(function (mongoError, result) {
                console.log(result);
                if (typeof req.session.data === "undefined") {
                    res.render("index", {courses: result, user: {}});
                } else {
                    res.render("index", {courses: result, user: req.session.data});
                }
            });
            mongoclient.close();
        });
    });
};
CourseDAO.prototype.getCourse = function (course, req, res) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find(course).toArray(function (mongoError, result) {
                console.log(result);
                res.render("main", {courses: result});
            });
            mongoclient.close();
        });
    });
};
CourseDAO.prototype.updateCourse = function (CourseName, req, res, Course) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("course", function (err, collection) {
            console.log(CourseName);
            collection.update(CourseName, Course, {upsert: true});
            mongocliente.close();
        });
    });
};
CourseDAO.prototype.deleteCourse = function (Course) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("course", function (err, collection) {
            collection.remove(Course, 1);
            mongocliente.close();
        });
    });
};
module.exports = function () {
    return CourseDAO;
};
