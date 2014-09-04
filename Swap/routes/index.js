var app = require("../app.js");
var azure = require("azure-storage");
var tableSvc = require("./RouteManager.js").tableSvc;


app.get("/", function (req, res, next) {
  
  // IF THEY ARE ALLREADY LOGGED IN, THEN REDIRECT THEM TO THE USER VIEW
  if (req.session.username)
     res.redirect("./prod/userhome"); 
  res.render("./prod/index");
});

app.get("/login", function (req, res, next) {
    
  var email = req.query.email;
  var query = new azure.TableQuery()
      .select(["email"])
      .top(1)      // technically this is not necessary since every partition only has 1 entity, but this is included just for debugging purposes
      .where("PartitionKey eq ?", email);
  tableSvc.queryEntities("usertable", query, null, function (error, result, resonse) {
    if (error) {
      console.log("error in index.js : \"login\" get route");
      return; //INSTEAD DISPLAY(render) AN ERROR PAGE
    }
    var entries = result.entries;
    if (entries[0].email._ === email) {
      req.session.username = email;
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
    RowKey: { "_": "1" },
    email: { "_": b.email }, 
    name: { "_": b.userName }
  };
  tableSvc.insertEntity('usertable', entry, function (error, result, response) {
    if (error)
      console.log("error in /newuser request");

    res.render("./prod/index"); //regardless if there was an error or not, render index.jade again
  });
});

