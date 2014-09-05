//this route file manages all routes dealing with users
var app = require("../app.js");
var azure = require("azure-storage");
var tableSvc = require("./RouteManager.js").tableSvc;
var func = require("./functions.js");

//A DUPLICATE OF THIS FUNCTION IN FUNCTIONS.JS
var isLoggedIn = function (req, res, next) {
  if (req.session["email-sess"])
    next();
  else
    res.redirect("/");
}

app.get(/^\/home/, func.markLoginStatus,function (req, res, next) {
  
  if (!req.isLoggedIn)
    res.redirect("/");
                      
  var email = req.session["email-sess"];
  tableSvc.retrieveEntity("usertable", email, "userinfo", function (error, result, response) {
    console.log(result);
    res.send("<h1>Welcome " + result.name + "</h1>");  //IS THERE A FORMAT SPECIFIER FUNCTION FOR JAVASCRIPT
  });                                                                                                                                            
});





