const express = require("express");
var router = express.Router();
var connection = require("../db/connection");

router.post("/", function (req, res) {
	connection.query("SELECT * from  register", function(error, results) {
		if(error) {
			console.log("Some issues");
			console.log(error);
		}
		var found = false;
		if (results.length) {
			var userData = null;
			for (var i = 0; i < results.length; i++) {
				var user = results[i];
				console.log(req.body);
				if(user.email == req.body.email && user.password == req.body.password) {
					console.log("comming");
					found = true;
					userData = user;
					break;
				}
			}
			if(found) {
				console.log("Authorised user");
				res.send(userData);
			} else {
				res.send("Not registered person");
			}
		} else {
			res.send("Not registered person");
		}
	});
});

module.exports = router;
