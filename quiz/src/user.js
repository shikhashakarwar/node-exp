var express = require('express');
var router = express.Router();
const routeUtils = require("./utils/routeUtils");
var userController = require('./controllers/userController');

router.get('/info', routeUtils.validateRoutes , userController.getUserInfo);

module.exports = router;