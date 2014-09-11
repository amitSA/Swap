//this route file manages all routes dealing with users
var app = require("../app.js");
var azure = require("azure-storage");
var tableSvc = require("./RouteManager.js").tableSvc;
var func = require("./functions.js");



app.get(/^\/home/, func.markLoginStatus,function (req, res, next) {
  
  if (!req.isLoggedIn) {
    res.redirect("/");
    return;
  }
                      
  var email = req.session["email-sess"];
  tableSvc.retrieveEntity("usertable", email, "userinfo", function (error, result, response) {
    console.log(result);
    res.send("<h1>Welcome " + result.name._ + "</h1>");  //IS THERE A FORMAT SPECIFIER FUNCTION FOR JAVASCRIPT
  });                                                                                                                                            
});





