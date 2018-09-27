const mysql = require('mysql');
// setting db
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "testNodeJs"
});

connection.connect(function(err) {
    if(err) console.log(err);
});

module.exports = connection;  