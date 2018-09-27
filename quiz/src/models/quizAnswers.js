const Sequelize = require("sequelize");
const dbUtils = require("../utils/dbUtils");

var quizAnswersSchema = {
    "questionId": {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    "answers": {
        type: Sequelize.STRING
    }
};

module.exports = {
    getQuizAnswersSchema: function () {
        return dbUtils.createConnection().then(function (conn) {
            // when successfully connection being established
            return conn.define("quiz_answers", quizAnswersSchema, {timestamps: false});
        }, function (error) {
            console.log("quiz_answers model getquizAnswersSchema error");
            console.log(error);
                        
        })
    }
}