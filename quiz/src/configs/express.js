const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../routes/index");
let app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))

app.use(function(req, res, next) {
    console.log("Common req handler");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

app.use("/", routes);

module.exports = app;