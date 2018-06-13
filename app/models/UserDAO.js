var objectId = require('mongodb').ObjectId;

function UserDAO(connection) {
    this._connection = connection();
}


//
UserDAO.prototype.manageMyCourse = function (user, callback) {
    const lookup = {
        "$lookup": {
            "from": "course",
            "localField": "_id",
            "foreignField": "instructor_id",
            "as": "instructor_courses"
        }
    };

    const project = {
        "$project": {
            "total_courses": {
                "$size": "$instructor_courses"
            },
            "email": 1,
            "name": 1,
            "instructor_courses": 1
        }
    };

    const match = {
        "$match": {
            "_id": objectId(user._id)
        }
    };
    const pipeline = [match, lookup, project];
    let cursos_do_instrutor = users.aggregate(pipeline);
};
UserDAO.prototype.showMyCourses = function (user, callback) {
    this._connection.open(function (err, mongocliente) {
        if (err) throw err;
        let aux = objectId(user._id);

        mongocliente.collection("user", function (err, collection) {
            if (err) throw err;
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
                    "course": 1
                }
            };
            const match = {
                "$match": {
                    "_id": aux
                }
            };
            const pipeline = [match, unwind, lookup, project];
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
                callback(result)
            });
            mongoclient.close();
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
        mongocliente.collection("user", function (err, collection) {
            if (err) throw err;
            req.session.data.password = dataAfter;
            collection.update({_id: data}, after, {upsert: true});
            console.log("senha alterada com sucesso");
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
            mongocliente.collection("course", function (err, col) {
                col.remove({instrutor_id: data._id});
            });
            mongocliente.close();
        });
    });
};

UserDAO.prototype.registerOnCourse = function (course, data) {
    this._connection.open(function (err, mongocliente) {
        if (err) throw err;
        mongocliente.collection("user", function (err, collection) {
            let aux = data;
            aux.courses.push(objectId(course._id));
            collection.update({email: data.email}, aux, {upsert: true});
            mongocliente.close();
        });
    });
};


module.exports = function () {
    return UserDAO;
};
