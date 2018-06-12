var objectId = require('mongodb').ObjectId;

function UserDAO(connection) {
    this._connection = connection();
}


UserDAO.prototype.changeEmail = function (req, res, data) {
    let toEdit = req.session.data.email;
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("user", function (err, collection) {
            collection.find({email: data.email}).toArray(function (mongoError, result) {
                if (result.length > 0) {
                    res.render("profile/status", {
                        validacao: [{
                            "msg": "Email ja existe"
                        }],
                        user: req.session.data
                    });
                } else {
                    req.session.data.email = data.email;
                    collection.update({email: toEdit}, req.session.data, {upsert: true});

                    res.render("profile/status", {validacao: [{msg: "Email editado com sucesso"}]});
                }
            });
            mongoclient.close();
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

UserDAO.prototype.showMyCourses = function (user, callback) {
    this._connection.open(function (err, mongocliente) {
        if (err) throw err;
        mongocliente.collection("user", function (err, collection) {
            if (err) throw err;
            collection.find({_id: objectId(user._id)}).toArray(function (err, result) {
                callback(result[0].courses);
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
            aux.courses.push(course._id);
            collection.update({email: data.email}, aux, {upsert: true});
            mongocliente.close();
        });
    });
};


module.exports = function () {
    return UserDAO;
};
