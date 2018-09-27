const fs = require("fs");
const answersModel = require("../models/quizAnswers");

var quizService = {
        updateAnswersDB: function() {
            return answersModel.getQuizAnswersSchema().then(function (quizAnswersTable) {
                return quizAnswersTable.sync({force: true}).then(function () {
                   return fs.readFile("/Users/vipinjoshi/Documents/github/node-expe/quiz/asset/json/answers.json","utf8", function(error, answersData) {
                       if (error) {
                           console.log("some error while reading anwsers json file" + error);
                       }
                       var answers = JSON.parse(answersData);
                       return quizAnswersTable.bulkCreate(answers.answers).then(function (data) {
                            console.log("anwswers db bulk create successfully");
                       }, function (error) {
                            console.log("anwswers db bulk create error");
                            console.log(error);
                       });
                   })
                });
            });
        }
};


module.exports = quizService;