const fs = require('fs');
const quizService = require("../services/quizService");
var quizController = {
    getQuizQuestions : function (req, res, next) {
        fs.readFile("/Users/vipinjoshi/Documents/github/node-expe/quiz/asset/json/questions.json", 'utf8', function (error, data) {
            quizService.updateAnswersDB().then(function () {
                if(error) {
                    console.log(error);
                    return res.status(400).send("some error");
                }
                return res.status(200).send(data);  
            })
        });
    }
};

module.exports = quizController;