
module.exports = function (obj) {
  var app = obj.app; var azure = obj.azure; var tableSvc = obj.tableSvc;

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
    var tableName = req.params.tableName;
    tableSvc.queryEntities(tableName, query, null, function (error, result, response) {
      if (error) {
        console.log("error in /users request");
        return;
      }
      res.render("./dev/table-contents", { insData : {entries: result.entries, tableName : tableName}});
    });
  });

 
   app.post("/dev/:tableName/delete-elements", function (req, res, next) {
      var tableName = req.params.tableName;
      var aoEntities = req.body.entities;

      //Used recursion to force table calls to execute linearly.  Did not work, table calls still happend synchronously
      function recursion(index) {
         if (index > aoEntities.length - 1) return;
         console.log("index: " + index);
         tableSvc.deleteEntity(tableName, aoEntities[index], function (error, response) {
            if (error)
               res.send("Error Encountered");
            else {
               //console.log("index : " + index);
               recursion(index+1);
            }
         });
      }
      recursion(0);
      res.send("Entries Deleted Succesfully");
   });


   
   //testing with arvind
   app.post("/createReservation", function (req, res, next) {
      res.send("Hello world!");
   });
   
   app.post("/getStringTest", function (req, res, next) {
      console.log(req.body.text);
      res.send("Success");
   });

}
/*getting another instance of the tableSvc might cause extra overhead
var azure = require("azure-storage");
var tableSvc = azure.createTableService("swaptable", "8UDip3NaZvG7QgPKrPrRR/D/78kgnrf7GG89Jo5omrPAhEr/eFRV41W790Q/R4XhgcMVFIcl885HLX3pSuXD0g==");
//SEE ABOVE COMMENT*/