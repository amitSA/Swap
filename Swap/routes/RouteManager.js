/*
This file manages all the routes for the website's server
*/

var app = require("../app");
var azure = require("azure-storage");
var tableSvc = azure.createTableService("swaptable", "8UDip3NaZvG7QgPKrPrRR/D/78kgnrf7GG89Jo5omrPAhEr/eFRV41W790Q/R4XhgcMVFIcl885HLX3pSuXD0g==");

require("./DevRoutes.js");

/*We want every user to have their own paritition key, so partition keys will
always be a users email since all emails are unique*/
app.post("/newuser", function (req, res, next) {
    var b = req.body;
    console.log("the name is : " + b.userName);
    var entry = {
        PartitionKey: {"_": b.email}, 
        RowKey: {"_": "1"},
        email: {"_":b.email}, 
        name: {"_":b.userName}
    };
    tableSvc.insertEntity('usertable', entry, function (error, result, response) {
        if (error)
            console.log("error in /newuser request");
        res.render("index"); //regardless if there was an error or not, render index.jade again
    }); 
});

app.get("/users", function (req, res, next) {
    var query = new azure.TableQuery();
    tableSvc.queryEntities("usertable", query, null, function (error, result, response) {
        if (error) {
            console.log("error in /users request");
            return;
        }
        res.render("./dev/all-users", { entries : result.entries });
    });
});


app.get("/", function (req, res) {
    res.render("./prod/home");
});


/*
app.get("/test", function (req, res) {
  var ses = req.session.name;
  res.send("<h3>The session is : " + ses + "</h3>");
});*/