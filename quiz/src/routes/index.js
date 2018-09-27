const express = require("express");
const auth = require("../auth");
const quiz = require("../quiz");
const user = require("../user");
let router = express.Router();


router.use('/api/v1/auth', auth);
router.use('/api/v1/user', user);
router.use('/api/v1/quizData', quiz);
module.exports = router;