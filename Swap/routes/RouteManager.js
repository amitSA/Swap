/*
This file manages all the routes for the website's server
*/

var app = require("../app");
var azure = require("azure-storage");
var tableSvc = azure.createTableService("swaptest", "G6krSLr6kRDZXlwqiD1OVYtls8bwd7gq/AwdksiZiAkeq0fxh0yIRIOJhTNlZoNXZpZRAdi+Xrhw6TSCHOlrvw==");
var cont = require("./container.js");

var obj = {
  app : app, 
  azure : azure, 
  tableSvc : tableSvc, 
  cont : cont
};

require("./dev.js")(obj);
require("./index.js")(obj);
require("./user.js")(obj);

/*app.get(/\/(k{2}$)/, function (req, res, next) {
   console.log("sdffsddfsdf");
   res.send("YEAHHHHH");
});

app.get("/hello", function (req, res, next) {
   console.log("i just helloed");
});*/




/*
app.get("/test", function (req, res) {
  var ses = req.session.name;
  res.send("<h3>The session is : " + ses + "</h3>");
});*/