/*
This file manages all the routes for the website's server
*/


var azure = require("azure-storage");
var tableSvc = azure.createTableService("swaptable", "8UDip3NaZvG7QgPKrPrRR/D/78kgnrf7GG89Jo5omrPAhEr/eFRV41W790Q/R4XhgcMVFIcl885HLX3pSuXD0g==");


module.exports.tableSvc = tableSvc;
require("./dev.js");
require("./index.js");
require("./user.js");




/*
app.get("/test", function (req, res) {
  var ses = req.session.name;
  res.send("<h3>The session is : " + ses + "</h3>");
});*/