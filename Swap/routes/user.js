
module.exports = function (obj) {
  var app = obj.app; var azure = obj.azure; var tableSvc = obj.tableSvc; var func = obj.func;

  app.get(/^\/home/, func.markLoginStatus, function (req, res, next) {
    
    if (!req.isLoggedIn) {
      res.redirect("/");
      return;
    }
    
    var email = req.session["email-sess"];
    tableSvc.retrieveEntity("UserTable", email, "userinfo", function (error, result, response) {
      console.log(result);
      //res.send("<h1>Welcome " + result.name._ + "</h1>");  //IS THERE A FORMAT SPECIFIER FUNCTION FOR JAVASCRIPT
      res.render("./prod/userhome", { name : result.name._ });
    });
  });

}

