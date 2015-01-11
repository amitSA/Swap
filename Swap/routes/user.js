
module.exports = function (obj) {
  var app = obj.app; var azure = obj.azure; var tableSvc = obj.tableSvc; var cont = obj.cont;
  var userTable = cont.userTable;

  app.get(/^\/home/, cont.markLoginStatus, function (req, res, next) {
    
    if (!req.isLoggedIn) {
      res.redirect("/");
      return;
    }
    
    var email = req.session["email-sess"];
    tableSvc.retrieveEntity(userTable, email, "userinfo", function (error, result, response) {
      console.log(result);
      //res.send("<h1>Welcome " + result.name._ + "</h1>");  //IS THERE A FORMAT SPECIFIER FUNCTION FOR JAVASCRIPT
      res.render("./prod/user/userhome", { name : result.name._ });
    });
  });

}

