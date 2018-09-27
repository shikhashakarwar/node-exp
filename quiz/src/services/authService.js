const jwt = require('jsonwebtoken');
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("../configs/appConfigs");

var getRefreshToken = function(data) {
    return new Promise(function (reslove, reject) {
        jwt.sign(data, config.PRIVATE_KEY, {expiresIn: 60 * 60 * 60}, function (error, token) {
            if(error) {
                console.log("Error while sign witj jwt" + error);
                return reject(error);
            }
            console.log("Token generated successfully");
            var decondedToken = jwt.decode(token);
            console.log(decondedToken);
            return reslove(token);
        });
    });
};

var dbOperations = {
    find: function(options) {
        return options.table.findOne({where: options.data}).then(function (foundedData) {
            console.log("found successfully " + JSON.stringify(foundedData));
            return foundedData;
        }, function (error) {
            console.log("some error in find " + options.data);
            return (error)
        });
    },
    insert: function (options) {
         return bcrypt.hash(options.data.password, 10).then(function(hash) {
            var userInfo = {
                firstName: options.data.firstName,
                lastName: options.data.lastName,
                email: options.data.email,
                password: hash,
                refreshToken: options.data.refreshToken
            }
            return options.table.create(userInfo).then(function (response) {
                console.log("Authservice.dboperation.insert succeesfully");
                return response;
            }, function (error) {
                console.log("Authservice.dboperation.insert fails");
                return error;
            });
        }, function(error) {
            console.log("Authservice.dboperation.insert bcrypt hashing error");
            return error;
        });
    }
};

const authService = {
    registerUser: function(userData) {
        return userModel.getUserSchema().then(function(userTable) {
            console.log("Authservice Authservice after getting connection");
            return userTable.sync().then(function() {
                return dbOperations.find({table: userTable, data: {email: userData.email}}).then(function (data) {
                    console.log("Authservice Authservice find " + data);
                    if(data) {
                        return({status: 409, payload:{error: "Email id exists"}});
                    }
                    return getRefreshToken({email: userData.email, password: userData.password}).then(function (token) {
                        userData['refreshToken'] = token;
                        return dbOperations.insert({table: userTable, data: userData}).then(function (response) {
                            console.log("Authservice Authservice insert " + JSON.stringify(userData));
                            return({status: 200, payload: {
                                message: "Success",
                                user: {
                                    firstName: response.firstName,
                                    lastName: response.lastName,
                                    email: response.email,
                                    token: token,
                                    createdAt: new Date(response.createdAt).getTime()
                                }
                            }});        
                        }, function (error) {
                            console.log("Authservice Authservice insert error " + error);
                            return({status: 400, payload: {error: "Some error occuring"}});        
                        });
                    }, function (error) {
                        console.log(error);
                    });
                }, function (error) {
                    console.log("Authservice Authservice userTable error " + error);
                    return({status: 400, payload: {error: "Some error occuring"}}); 
                });
            });
        }, function(error) {
            console.log("Authservice Authservice error ");
            console.log(error);
            return {"entryCreated": false, "invalidIputs": true};
        });    
        
    },
    loginUser: function (loginData) {
        return userModel.getUserSchema().then(function(userTable) {
            console.log("Authservice Authservice after getting connection");
            return dbOperations.find({table: userTable, data: {email: loginData.email}}).then(function (response) {
                if (response) {
                    var hash = response.password;
                    return bcrypt.compare(loginData.password, hash).then(function(isValid) {
                        console.log("is Autheticate user" + isValid);
                        if(isValid) {
                            return getRefreshToken({email: loginData.email, password: loginData.password}).then(function (token) {
                                return userTable.update({refreshToken: token}, 
                                                     {where: {
                                                        email: loginData.email
                                                    }}
                                ).then(function (updateRespose) {
                                    console.log("Authservice update refresh token successfully");
                                    var postResponse = {
                                        status: 200, 
                                        payload: {
                                            message: "Success",
                                            user: {
                                                firstName: response.firstName,
                                                lastName: response.lastName,
                                                email: response.email,
                                                token: token,
                                                createdAt: new Date(response.createdAt).getTime()
                                            }
                                        }};
                                    return(postResponse);
                                }, function (error) {
                                    return({status: 400, payload: {error: "Error occurs"}});
                                });
                            });
                        } else {
                            return({status: 401, payload: {error: "Authentication failed"}});
                        }
                    }, function(error) {
                        console.log(error);
                        return({status: 400, payload: {error: "Some error occuring"}});
                    }); 
                } else {
                    console.log("no record found");
                    return({status: 401, payload: {error: "Authentication failed"}});
                }
            });
        });
    }
};

module.exports = authService;
