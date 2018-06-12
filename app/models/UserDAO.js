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
UserDAO.prototype.check = function (data, req, res) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("user", function (err, collection) {
            collection.find(data).toArray(function (mongoError, result) {
                if (result.length === 0) {
                    res.render("login", {
                        validacao: [{
                            "msg": "login ou senha invalida"
                        }],
                        login: data,
                        user: {}
                    });
                } else {
                    req.session.data = {
                        autorizado: true,
                        _id: result[0]._id,
                        email: result[0].email,
                        name: result[0].name,
                        courses: result[0].courses,
                        password: result[0].password
                    };
                    res.redirect("/");
                }
            });
            mongoclient.close();
        });
    });
};
UserDAO.prototype.createUser = function (data, res) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("user", function (err, collection) {
            collection.count({email: data.email}, function (err, count) {
                if (err) throw err;
                if (count === 0) {
                    collection.insertOne(data);
                    res.render("login", {validacao: {}, login: data, user: {}});
                }
                else {
                    res.render("register/user", {
                        validacao: [{
                            "msg": "Email ja cadastrado",
                        }],
                        student: data,
                        user: {}
                    });
                }
                mongoclient.close();
            });
        });
    });
};
UserDAO.prototype.editPassword = function (req, res, dataAfter) {
    let data = objectId(req.session.data._id);
    let after = {
        email: req.session.data.email,
        name: req.session.data.name,
        courses: req.session.data.courses,
        password: dataAfter
    };
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


UserDAO.prototype.showMyCourses = function (req, res) {

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

module.exports = function () {
    return UserDAO;
};
