//this route file manages all routes dealing with users
var app = require("../app.js");
var azure = require("azure-storage");
var tableSvc = require("./RouteManager.js").tableSvc;

var isLoggedIn = function (req, res, next) {
  if (req.session["email-sess"])
    next();
  else
    res.redirect("/");
}

app.get(/^\/home/,isLoggedIn,function (req, res, next) {
  
 //this part of the method is called if the user is logged in  
  var name = req.session.username;
  res.send("<h1>Welcome " + name + "</h1>");  //IS THERE A FORMAT SPECIFIER FUNCTION FOR JAVASCRIPT
  
});





