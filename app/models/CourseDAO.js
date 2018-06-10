var  objectId = require('mongodb').ObjectId;

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
CourseDAO.prototype.addNewClass = function (course, classe) {
    console.log(course);
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find(course).toArray(function (mongoError, result) {
                let data = result;

                console.log(data);
                //data.classes.push(classe);

                console.log(data);
                //collection.update(result, data, {upsert: true});
                mongoclient.close();
            })
        });
    });
};

CourseDAO.prototype.findCourses = function (req, res, data) {
    console.log(data);
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find(data).toArray(function (mongoError, result) {
                console.log(data);
                if (typeof req.session.data === "undefined") {
                    //  res.render("courses", {courses: result, user: {}});
                } else {
                    //res.render("courses", {courses: result, user: req.session.data});
                }
                res.send(result);
            });
            mongoclient.close();
        });
    });
};
CourseDAO.prototype.showTheCourse = function (req, res, data) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find(data).toArray(function (mongoError, result) {
                if (typeof req.session.data === "undefined") {
                    res.render("thecourse", {course: result, user: {}});
                } else {
                    res.render("thecourses", {course: result, user: req.session.data});
                }
            });
            mongoclient.close();
        });
    });
};
CourseDAO.prototype.courseForm = function (req, res, data) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find(data).toArray(function (mongoError, result) {
                if (typeof req.session.data === "undefined") {
                    res.render("form/course", {course: result, user: {}});
                } else {
                    res.render("form/course", {course: result, user: req.session.data});
                }
            });
            mongoclient.close();
        });
    });
};
CourseDAO.prototype.editCourse = function (req, res, data) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.update(CourseName, Course, {upsert: true});
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
CourseDAO.prototype.updateCourse = function (courseBefore, req, res, courseAfter) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("course", function (err, collection) {
            collection.update(courseBefore, courseAfter, {upsert: true});
            mongocliente.close();
        });
    });
};
CourseDAO.prototype.deleteCourse = function (Course) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("course", function (err, collection) {
            collection.remove({_id:objectId(Course._id)},1);
            mongocliente.close();
        });
    });
};
module.exports = function () {
    return CourseDAO;
};
