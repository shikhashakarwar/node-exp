const authService = require("../services/authService");

const authController = {
    loginUser: function(req, res) {
        var loginData = req.body;
        if(Object.keys(loginData.email) && Object.keys(loginData.password)) {
            authService.loginUser(loginData).then(function(data) {
                return res.status(data.status).send(data);
            }, function(error) {
                console.log(error);
                
                return res.status(error.status).send(error);
            });
        }
    },
    registerUser: function (req, res) {
        var userData = req.body;
        if(Object.keys(userData).length > 0) {
            authService.registerUser(userData).then(function (data) {
                return res.status(data.status).send(data);
            }, function (error) {
                console.log(error);
                return res.status(error.status).send(error);
            });
        } else {
            return res.status(400).send({payload: {message :"Some data is missing"}});
        }
    }
};

module.exports = authController;