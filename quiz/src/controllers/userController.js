const userService = require("../services/userService");

const userController = {
    getUserInfo: function (req, res, next) {
        return userService.getUserInfo(req, res).then(function (response) {
            return res.status(200).send(response);                          
        }, function (error) {
            return res.status(400).send(error);
        });
    }
};

module.exports = userController;