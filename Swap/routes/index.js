var app = require("../app.js");
var azure = require("azure-storage");
var tableSvc = require("./RouteManager.js").tableSvc;
var func = require("./functions.js");
//this requiring is becoming tedious, find a way to fix that

app.get("/", func.markLoginStatus, function (req, res, next) {
  if (req.isLoggedIn)
    res.redirect("/home");
  res.render("./prod/index");
});

app.get("/login", function (req, res, next) {
    
  var email = req.query.email;
  
  tableSvc.retrieveEntity("UserTable",email,"userinfo", function (error, result, response) {
    if (error) {
      console.log("error in index.js : \"login\" get route");
      return; //INSTEAD RENDER AN ERROR PAGE
    }
    if (result.email._ === email) {
      req.session["email-sess"] = email;
      res.redirect("/home");
    } else {
       //DISPLAY ERROR MESSAGE IN INDEX.JADE (a red error box ontop of the login tabs saying that a user w/ that email doesnt exist)
         //THIS CAN BE DONE BY INJECTING A JS OBJECT INTO A JADE FILE(it can be a boolean representing whether login was succesful or not)
    }
  });
});

/*We want every user to have their own paritition key, so partition keys will
always be a users email since all emails are unique*/
app.post("/newuser", function (req, res, next) {
  var b = req.body;
  console.log("the name is : " + b.userName);
  var entry = {
    PartitionKey: { "_": b.email }, 
    RowKey: { "_": "userinfo" },
    email: { "_": b.email }, 
    name: { "_": b.userName }
  };
  tableSvc.insertEntity('UserTable', entry, function (error, result, response) {
    if (error)
      console.log("error in /newuser request :" + error);

    res.render("./prod/index"); //regardless if there was an error or not, render index.jade again
  });
});

app.get("/logout", func.markLoginStatus ,function (req, res, next) {
  if (req.isLoggedIn)
    req.session.destroy()
  res.redirect("/");          
});



/*var query = new azure.TableQuery()
      .select(["email"])
      .top(1)      // technically this is not necessary since every partition only has 1 entity, but this is included just for debugging purposes
      .where("PartitionKey eq ?", email);*/



