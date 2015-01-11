
module.exports = function (obj) {
  var app = obj.app; var azure = obj.azure; var tableSvc = obj.tableSvc; var func = obj.func;

  app.get("/dev", function (req, res, error) {
    tableSvc.listTablesSegmented(null, function (error, result, response) {
      if (error) {
        console.log("error in DevRoutes: get \"/dev\" method");
        return;
      }
      res.render("./dev/dev.jade", { tables : result.entries });
    });
  });
  
  
  app.post("/dev/newtable", function (req, res, error) {
    var b = req.body;
    var message = "";
    var status = "";
    tableSvc.createTableIfNotExists(b.tbName, function (error, result, response) {
      if (error | !result) {
        message += "There was an error in creating this table";
        status += "failed";
      } else {
        message += "Table created succesfully";
        status += "Success";
      }
      res.render("./dev/dev-response", { message : message, status : status });
    });
  });
  
  app.delete("/dev/deletetbl", function (req, res, error) {
    var b = req.body;
    var keyArray = Object.keys(b);
    for (var i = 0; i < keyArray.length; i++) {
      tableSvc.deleteTable(b[keyArray[i]], function (error, response) { });
    }
    var message = "Tables deleted succesfully";   //since the user is selected from a list of available tables, its impossible for them to select a invalid table name
    var status = "Success"
    res.render("./dev/dev-response", { message : message , status : status });
  });
  
  app.get("/dev/:tableName", function (req, res, next) {
    var query = new azure.TableQuery();
    
    tableSvc.queryEntities(req.params.tableName, query, null, function (error, result, response) {
      if (error) {
        console.log("error in /users request");
        return;
      }
      res.render("./dev/all-users", { entries: result.entries });
    });
  });

}
/*getting another instance of the tableSvc might cause extra overhead
var azure = require("azure-storage");
var tableSvc = azure.createTableService("swaptable", "8UDip3NaZvG7QgPKrPrRR/D/78kgnrf7GG89Jo5omrPAhEr/eFRV41W790Q/R4XhgcMVFIcl885HLX3pSuXD0g==");
//SEE ABOVE COMMENT*/