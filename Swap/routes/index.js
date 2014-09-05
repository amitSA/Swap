var app = require("../app.js");
var azure = require("azure-storage");
var tableSvc = require("./RouteManager.js").tableSvc;


app.get("/", function (req, res, next) {

  if (req.session["email-sess"])
     res.render("./prod/userhome"); 
  res.render("./prod/index");
});

app.get("/login", function (req, res, next) {
    
  var email = req.query.email;
  
  tableSvc.retrieveEntity("usertable",email,"user-info", function (error, result, response) {
    if (error) {
      console.log("error in index.js : \"login\" get route");
      return; //INSTEAD DISPLAY(render) AN ERROR PAGE
    }
    console.log(result.entity);
    if (result.entity.email._ === email) {
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
    RowKey: { "_": "user-info" },
    email: { "_": b.email }, 
    name: { "_": b.name }
  };
  tableSvc.insertEntity('usertable', entry, function (error, result, response) {
    if (error)
      console.log("error in /newuser request :" + error);

    res.render("./prod/index"); //regardless if there was an error or not, render index.jade again
  });
});



/*var query = new azure.TableQuery()
      .select(["email"])
      .top(1)      // technically this is not necessary since every partition only has 1 entity, but this is included just for debugging purposes
      .where("PartitionKey eq ?", email);*/