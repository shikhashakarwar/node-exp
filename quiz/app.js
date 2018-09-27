const app = require("./src/configs/express");

app.listen(3000, function () {
    console.log("Your app is listening to this " + 3000);
    
});

module.exports = app;