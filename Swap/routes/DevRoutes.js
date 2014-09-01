var app = require("../app.js");

var azure = require("azure-storage");
var tableSvc = azure.createTableService("swaptable", "8UDip3NaZvG7QgPKrPrRR/D/78kgnrf7GG89Jo5omrPAhEr/eFRV41W790Q/R4XhgcMVFIcl885HLX3pSuXD0g==");


app.get("/dev", function (req, res, error) {  
  tableSvc.listTablesSegmented(null, function (error, result, response) {
    if (error) {
      console.log("error in DevRoutes: get \"/dev\" method");
      return;
    }
    res.render("dev.jade", { tables : result.entries });
  });
});
  

app.post("/dev/newtable", function (req, res, error) {
  var b = req.body;
  var message = "";
  var status = "";
  tableSvc.createTableIfNotExists(b.tbName, function (error, result,response){
      if (error | !result) {
        message += "There was an error in creating this table";
        status += "failed";
      } else {
        message += "Table created succesfully";
        status += "Success";
      }
    res.render("dev-response", {message : message, status : status});
  });
});

app.delete("/dev/deletetbl", function (req, res, error) {
  var b = req.body;
  var length = Object.keys(b).length;
  //console.log(length);
  for (var i = 0; i < length; i++) {
    tableSvc.deleteTable(b[i+""], function (error, response) {});
  }
  var message = "Tables deleted succesfully";   //since the user is selected from a list of available tables, its impossible for them to select a invalid table name
  var status = "Success"
  res.render("dev-response", { message : message , status : status });
});

