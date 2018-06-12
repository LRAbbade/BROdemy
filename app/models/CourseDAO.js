var objectId = require('mongodb').ObjectId;

function CourseDAO(connection) {
    this._connection = connection();
}


CourseDAO.prototype.checkAlreadyHaveThisCourse = function (course, callback) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.count({name: course.name}, function (err, count) {
                if (err) throw err;
                callback(count);
            });
            mongoclient.close()
        });
    });

};
CourseDAO.prototype.register = function (course, callback) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.insert(course);
            collection.find(course).toArray(function (mongoError, result) {
                callback(result);
            });
            mongoclient.close();
        });
    });


};
CourseDAO.prototype.checkOwnerOfCourse = function (data, callback) {
    console.log(data);
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find({_id: objectId(data._id)}).toArray(function (mongoError, result) {
                if (mongoError) throw  mongoError;
                console.log(result);
                callback(result);
            });
        });
    });
};
/*CourseDAO.prototype.addNewClass = function (data, course, callback) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find({_id: objectId(course.id)}).toArray(function (mongoError, result) {
                if (mongoError) throw  mongoError;
            });
        });
    });

                let data = result[0];
                data.classes.push(classe);
                collection.update({_id: objectId(result[0]._id)}, data, {upsert: true});
                callback();
                mongoclient.close();

};*/
CourseDAO.prototype.deleteClass = function (toDelete, info) {
    let toDel = objectId(toDelete._id);
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find({_id: toDel}).toArray(function (mongoError, result) {
                let data = result[0];
                var removed = data.classes.filter(function (el) {
                    return el.number !== info.number;
                });
                data.classes = JSON.stringify(removed, null, ' ');
                collection.update({_id: objectId(result[0]._id)}, data, {upsert: true});
                mongoclient.close();
            })
        });
    });
};
//don't work yet
CourseDAO.prototype.editClass = function (toDelete, info) {
    let toDel = objectId(toDelete._id);
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find({_id: toDel}).toArray(function (mongoError, result) {
                let data = result[0];
                console.log(data.classes);
                var removed = data.classes.filter(function (el) {
                    return el.number !== info.number;
                });
                data.classes = JSON.stringify(removed, null, ' ');
                console.log(data);
                collection.update({_id: objectId(result[0]._id)}, data, {upsert: true});
                mongoclient.close();
            })
        });
    });
};

CourseDAO.prototype.findCourses = function (data, callback) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find(data).toArray(function (mongoError, result) {
                callback(result);
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

CourseDAO.prototype.getCourses = function (callback) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find().toArray(function (mongoError, result) {
                callback(result);
            });
            mongoclient.close();
        });
    });
};
CourseDAO.prototype.getCourse = function (course, callback) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find({_id: objectId(course._id)}).toArray(function (mongoError, result) {
                callback(result);
            });
            mongoclient.close();
        });
    });
};
CourseDAO.prototype.updateCourse = function (courseBefore, req, res, courseAfter) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("course", function (err, collection) {
            collection.update({_id: objectId(courseBefore._id)}, courseAfter, {upsert: true});
            mongocliente.close();
        });
    });
};
CourseDAO.prototype.deleteCourse = function (Course) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("course", function (err, collection) {
            collection.remove({_id: objectId(Course._id)}, 1);
            mongocliente.close();
        });
    });
};
module.exports = function () {
    return CourseDAO;
};
