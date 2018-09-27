const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.post('/', function (req, res) {
    connection.query("SELECT * from  register", function(error, results, fields) {
        if(error) {
            console.log(error);
            var createQuery = "CREATE TABLE register1 (userId INT NOT NULL, firstName VARCHAR(255), lastName VARCHAR(255), password VARCHAR(255), email VARCHAR(255), PRIMARY KEY (userId))";
            connection.query(createQuery, function(error, createResults, fields) {
                if(error) {
                    console.log(error);
                }
                res.send("OK");
            });
        }
        var found = false;
        if (results.length) {
            for (let i = 0; i < results.length; i++) {
                let user = results[i];
                if(user.email == req.body.email) {
                    found = true;
                }
            }
            if(!found) {
                console.log("Not found in db inserting...");
                insertIntoDB(req.body);
                res.send("OK")
            } else {
                res.send("User already exists");
            }
        } else {
            insertIntoDB(req.body);
            res.send("OK")
        }
    });
});

var insertIntoDB = function (userData) {
    var insertQuery = "INSERT INTO register SET ?";
    connection.query(insertQuery, userData, function(error, results, fields) {
        if (error) {
            console.log("error while inserting into db");
            console.log(error);
            return;
        }
        console.log("successfully inserted into db");
    });
};

module.exports = router;
