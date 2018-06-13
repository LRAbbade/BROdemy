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
    this._connection.open(function (err, mongoclient) {
        if (err) throw err;
        mongoclient.collection("course", function (err, collection) {
            if (err) throw err;                 
            collection.find({_id: objectId(data._id)}).toArray(function (mongoError, result) {
                if (mongoError) throw  mongoError;
                mongoclient.close();
                callback(result[0]);
            });
        });
    });
};
CourseDAO.prototype.getClass = function (classes,callback) {
    this._connection.open(function (err, mongoclient) {
        if (err) throw err;
        mongoclient.collection("course", function (err, collection) {
            if (err) throw err;
            collection.find({classes:{$elemMatch:{name:classes.name}}}).toArray(function (mongoError, result) {
                if (mongoError) throw  mongoError;
                mongoclient.close();
                var result_classes = result[0].classes;
                var right_class;
                for (let i =0 ;i<result_classes.length;i++){
                    if (result_classes[i].name == classes.name) {
                        right_class = result_classes[i];
                        break;
                    }
                }
                callback(right_class);
            });
        });
    });
};
CourseDAO.prototype.addNewClass = function (course, classe) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            course.classes.push(classe);
            collection.update({_id: objectId(course._id)}, course, {upsert: true});
            mongoclient.close();
        });
    });
};
CourseDAO.prototype.deleteCourseBecauseTheInstructorHasBeenDeleted = function (data) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.remove({instrutor_id: objectId(data._id)});
            mongoclient.close();
        });
    });
};
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

CourseDAO.prototype.findCourses = function (data, callback) {
    console.log(data);
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("course", function (err, collection) {
            collection.find({name: {$regex: data.name, $options: "i"}}).toArray(function (mongoError, result) {
                console.log(result);
                callback(result);
            });
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
