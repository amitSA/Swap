/*
This file manages all the routes for the website's server
*/

var app = require("../app");
var azure = require("azure-storage");
var tableSvc = azure.createTableService("swaptest", "ehvVsFMeJjcr4AaLEWH7Fp2fLOvcdFySI8LVXCqZo4YLJ53R5jrEZOll/RzPv1MX1RWi7e+xsu8gQTNmpO1Bpw==");
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




/*
app.get("/test", function (req, res) {
  var ses = req.session.name;
  res.send("<h3>The session is : " + ses + "</h3>");
});*/