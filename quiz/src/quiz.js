var express = require("express");
var router = express.Router();
const quizController = require("./controllers/quizController");

router.get("/questions", quizController.getQuizQuestions);


module.exports = router;