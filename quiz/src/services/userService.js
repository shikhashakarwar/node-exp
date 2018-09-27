const dbUtils = require("../utils/dbUtils");
const userModel = require("../models/user");

var userService = {
    getUserInfo: function (req, res) {
        var body = req.body;
        console.log(body);
        return dbUtils.createConnection().then(function () {
            return userModel.getUserSchema().then(function () {
                return {payload: {message: "successfully"}};    
            },function () {
                
            })
        }, function (error) {
            
        });
    }
};

module.exports = userService;