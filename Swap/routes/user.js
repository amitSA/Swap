//this route file manages all routes dealing with users

var app = require("../app.js");
var azure = require("azure-storage");
var tableSvc = require("./RouteManager.js").tableSvc;

app.get("/user/:jj(he|hello)", function (req, res, next) {
  console.log("matched");
  res.send("<h1>Get request calledddd!!!</h1>");
});





