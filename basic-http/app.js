const bodyParser = require("body-parser");
var register = require("./register/register");
var login = require("./login/login");
var express = require("express");
var app = express();

app.use(bodyParser.json());

app.use("/register", register);
app.use("/login", login);

app.get("/", function(req, res) {
	res.send("This is your default route.");
});

app.get("/contact", function(req, res) {
	console.log(req);
	res.send({"name": "shikha", "age": 24 });
});

app.post("/user", function(req, res) {
	console.log(req.body);
	res.send("request is successfully recieved.");
});

app.listen(3000);
