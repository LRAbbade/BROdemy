var objectId = require('mongodb').ObjectId;

function UserDAO(connection) {
    this._connection = connection();
}

UserDAO.prototype.checkIfUserHasCourse = function (user, course, callback) {
    const aux = objectId(user._id);

    const match = {
        "$match": {
            "_id": aux
        }
    };
    const project = {
        "$project": {
            "has_course": {
                "$in": [
                    objectId(course._id),
                    "$courses"
                ]
            }
        }
    };
    const pipeline = [match, project];
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("user", function (err, collection) {
            if (err) throw err;
            collection.aggregate(pipeline, function (err, result) {
                let has_course = result[0].has_course
                mongocliente.close();
                callback(has_course);
            });

        });
    });
};
UserDAO.prototype.manageMyCourse = function (user, callback) {
    let aux = objectId(user._id);
    const lookup = {
        "$lookup": {
            "from": "course",
            "localField": "_id",
            "foreignField": "instructor_id",
            "as": "course"
        }
    };

    const project = {
        "$project": {
            "total_courses": {
                "$size": "$course"
            },
            "course": 1
        }
    };

    const match = {
        "$match": {
            "_id": aux
        }
    };

    const pipeline = [match, lookup, project];
    var aux2;
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("user", function (err, collection) {
            if (err) throw err;
            collection.aggregate(pipeline, function (err, result) {
                aux2 = result;
                mongocliente.close();
                callback(aux2);
            });
        });
    });
};
UserDAO.prototype.showMyCourses = function (user, callback) {
    this._connection.open(function (err, mongocliente) {
        if (err) throw err;
        let aux = objectId(user._id);
        const match1 = {
            "$match": {
                "_id": aux
            }
        };
        const unwind = {
            "$unwind": "$courses"
        };

        const lookup = {
            "$lookup": {
                "from": "course",
                "localField": "courses",
                "foreignField": "_id",
                "as": "course"
            }
        };
        const project = {
            "$project": {
                "has_course" : {
                    "$size" : "$course"
                },
                "course": 1
            }
        };
        const match2 = {
            "$match" : {
                "has_course" : {
                    "$gt" : 0
                }
            }
        }

        const pipeline = [match1, unwind, lookup, project, match2];
        mongocliente.collection("user", function (err, collection) {
            if (err) throw err;

            collection.aggregate(pipeline, function (err, result) {
                callback(result);
            });
            mongocliente.close();
        });
    });
};
UserDAO.prototype.check = function (data, callback) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("user", function (err, collection) {
            collection.find(data).toArray(function (mongoError, result) {
                mongoclient.close();
                callback(result);
            });

        });
    });
};
UserDAO.prototype.createUser = function (data, callback) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("user", function (err, collection) {
            collection.count({email: data.email}, function (err, count) {
                if (err) throw err;
                if (!count) {
                    collection.insert(data);
                }
                mongoclient.close();
                callback(count);
            });
        });
    });
};
UserDAO.prototype.editPassword = function (dataAfter, after, data) {
    this._connection.open(function (err, mongocliente) {
        if (err) throw err;
        const aux = objectId(data);

        mongocliente.collection("user", function (err, collection) {
            if (err) throw err;
            collection.update({_id: aux}, after, {upsert: true});
            mongocliente.close();
        });
    });
};
UserDAO.prototype.deleteUser = function (data) {
    let info = objectId(data._id);
    this._connection.open(function (err, mongocliente) {
        if (err) throw err;
        mongocliente.collection("user", function (err, collection) {
            if (err) throw err;
            collection.remove({_id: info}, 1);
            mongocliente.close();
        });
    });
};
UserDAO.prototype.getStudentsOfCourse = function (course_id, callback) {
    const courseId = objectId(course_id);
    const project = {
        "$project": {
            "has_course": {
                "$in": [
                    courseId,
                    "$courses"
                ]
            }
        }
    };
    const match = {
        "$match": {
            "has_course": true
        }
    };
    const pipeline = [project, match];
    this._connection.open(function (err, mongocliente) {
        if (err) throw err;
        mongocliente.collection("user", function (err, collection) {
            collection.aggregate(pipeline, function (err, result) {
                callback(result);
            });
            mongocliente.close();
        });
    });
};
UserDAO.prototype.removeCourseFromAllStudents = function (courseId, students,callback) {
    let studentId;
    this._connection.open(function (err, mongocliente) {
        if (err) throw err;
        for (let i = 0; i < students.length; i++) {
            studentId = students[i]._id;
            mongocliente.collection("user", function (err, collection) {
                collection.updateOne({"_id": objectId(studentId)}, {"$pull": {"courses": objectId(courseId)}});
            });
        }
        mongocliente.close();
    });
    callback();

};
UserDAO.prototype.registerOnCourse = function (course, data) {
    this._connection.open(function (err, mongocliente) {
        if (err) throw err;
        mongocliente.collection("user", function (err, collection) {
            collection.updateOne({email: data.email}, {$push: {courses: objectId(course._id)}});
            mongocliente.close();
        });
    });
};

module.exports = function () {
    return UserDAO;
};
