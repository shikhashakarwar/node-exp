const Sequelize = require("sequelize")
const configs = require("../configs/appConfigs");

module.exports = {
    createConnection: function () {
        let sequelize = new Sequelize(configs.DB_NAME, configs.DB_USER, configs.DB_PASSWORD, {
            host: configs.DB_HOST,
            dialect: 'mysql'
        });
        // used to authenticate connection with db
        return sequelize.authenticate().then(function () {
            return sequelize;
        }, function (error) {
            console.log("dbutils ---> error in create connection");
            
            console.log(error);
        })
    }
};