const fs = require('fs');
const quizService = require("../services/quizService");
var models = require("../../models");

var quizController = {
    getQuizQuestions : function (req, res, next) {
        var queryParams = req.query;
        return quizService.getQuestions(queryParams).then(function (response) {
            console.log("comming heere");
            return res.send({payload: {message: "success", data: response}});
        }, function (error) {
            return res.status(400).send({payload: {message: "error"}});
        });
    }
};

module.exports = quizController;