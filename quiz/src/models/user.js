const Sequelize = require("sequelize");
const dbUtils = require("../utils/dbUtils");

var userSchema = {
    "firstName": {
        type: Sequelize.STRING,
        allowNull: false
    },
    "lastName": {
        type: Sequelize.STRING
    },
    "email": {
        type: Sequelize.STRING,
        primaryKey: true
    },
    "password": {
        type: Sequelize.STRING,
        allowNull: false
    },
    "refreshToken": {
        type: Sequelize.STRING
    }
};

module.exports = {
    getUserSchema: function () {
        return dbUtils.createConnection().then(function (conn) {
            // when successfully connection being established
            return conn.define("user", userSchema, {});
        }, function (error) {
            console.log("User model getUserSchema error");
            console.log(error);
                        
        })
    }
}