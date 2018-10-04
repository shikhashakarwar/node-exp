const fs = require("fs");
const models = require("../../models");

var quizService = {
    getQuestions: function(queryParams) {
        console.log("query params");
        return models.quiz_questions.sequelize.sync().then(function () {
            var questionModel = models.quiz_questions;
            return questionModel.findAll({
                    where: {'category': 'social science'},
                    include: [{model: models.que_choices, attributes:['choice_1', 'choice_2', 'choice_3', 'choice_4', 'choice_1_value', 'choice_2_value', 'choice_3_value', 'choice_4_value']}]
                }, {order: ['qId', 'ASC']}).then(function (data) {
                console.log("quizService --> getQuestion question model success");
                return data;
            }, function (error) {
                console.log("quizService --> getQuestion question model error");
                console.log(error);
                return error;
            })
        });
   }
};


module.exports = quizService;