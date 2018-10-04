const dbUtils = require("../utils/dbUtils");
var models = require("../../models");

var userService = {
    getUserInfo: function (req, res) {
        console.log("User service-> getUserInfo");
        var query = req.query;
        return models.user.findOne({where: req.body}).then(function (data) {
            var values = data.dataValues;
            let response = {firstName: values.firstName, lastName: values.lastName, email: values.email};
            return {payload: {message: "successfully", data: response}};    
        }, function (error) {
            
        });
    }
};

module.exports = userService;