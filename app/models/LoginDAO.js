function LoginDAO(connection) {
    this._connection = connection();
}

LoginDAO.prototype.check = function (data, req, res) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("user", function (err, collection) {
            collection.find(data).toArray(function (mongoError, result) {
                if (result === 0) {
                    res.render("login", {
                        validacao: [{
                            "msg": "login ou senha invalida",
                            "param": {},
                            "value": {},
                            "location": {},
                            "nestedErrors": {}
                        }], login: data
                    });
                } else {
                    req.session.data = {
                        autorizado: true,
                        _id: result[0]._id,
                        email: result[0].email,
                        name: result[0].name,
                        courses: result[0].courses
                    };

                    console.log(req.session);
                    if (req.session.data.autorizado) {
                        res.redirect("/");
                    }
                }
            });
            mongoclient.close();
        });
    });
};
LoginDAO.prototype.createUser = function (data) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("user", function (err, collection) {
            collection.count({email: data.user}, function (err, count) {
                if (err) throw err;
                if (count <= 0) {
                    collection.insertOne(data);
                }
                else {
                    res.render("cadastro", {
                        validacao: [{
                            "msg": "Email ja cadastrado",
                            "param": {},
                            "value": {},
                            "location": {},
                            "nestedErrors": {}
                        }], cadastro: data
                    });
                }
                mongoclient.close();
            });

        });
    });
};
LoginDAO.prototype.EditUser = function (dataAfter, dataBefore) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("user", function (err, collection) {
            console.log(studentName);
            collection.update({id: dataBefore}, dataAfter, {upsert: true});
            mongocliente.close();
        });
    });
};

LoginDAO.prototype.deleteUser = function (data) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("user", function (err, collection) {
            collection.remove(data, 1);
            mongocliente.close();
        });
    });
};

module.exports = function () {
    return LoginDAO;
};
