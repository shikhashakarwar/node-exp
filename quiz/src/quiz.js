var express = require("express");
var router = express.Router();
const quizController = require("./controllers/quizController");
const routeUtils = require("./utils/routeUtils");

router.get("/questions", routeUtils.validateRoutes, quizController.getQuizQuestions);


module.exports = router;