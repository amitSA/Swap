
module.exports = function (obj) {
   var app = obj.app; var azure = obj.azure; var tableSvc = obj.tableSvc; var cont = obj.cont;
   var userTable = cont.userTable;
   
   /*Any get route with "/home" will go through this, and this route handles the authentification 
    So future get and post routes dont have to check for authentification */ 
   app.get(/^\/user.*/, cont.markLoginStatus, function (req, res, next) {
      if (!req.isLoggedIn) {
         res.redirect("/");
         return;
      }
      next();
   });
   app.post(/^\/user.*/, cont.markLoginStatus, function (req, res, next) {
      if (!req.isLoggedIn) {
         res.send("Error: Client has not been authentificated yet");
         return;
      }
      next();
   });

   app.get("/user/home", function (req, res, next) {
      var email = req.session["email-sess"];
      tableSvc.retrieveEntity(userTable, email, "userinfo", function (error, result, response) {
         res.render("./prod/user/userhome", { insData : { name : result.name._ , userEmail : result.email._ } });
      });
   });
  
   app.post("/user/newres", function (req, res, next) {
      var b = req.body;
      /*Querying the table to find the num elements inside a partition.  Length of response object
        is the new RowKey*/
      var query = new azure.TableQuery()
                  .where('PartitionKey eq ?', b.postalCode)
                  .select(["RowKey"]);
      
      tableSvc.queryEntities('Market', query, null, function (error, result, response) {
         if (!error){
            var length = result.entries.length;
            var entry = {
               "PartitionKey" : { "_" : b.postalCode },
               "RowKey" : { "_" : length + ""},  //IS THE "" NECESSARY
               "restName" : {"_" : b.restName},
               "dateEnd" : { "_" : b.dateEnd },
               "guestNum" : { "_" : b.guestNum },
               "time" : { "_" : b.time },
               "makerID" : { "_" : b.makerID },
               "takerID" : {} //empty takerID object means no-body has taken it yet!!!
               //dateAdded - this is automatically created timestamp
            }
            insertEntries(entry);
         } else {
            res.send("Error : error in the initial querying");
         }
      });
      var insertEntries = function (entry) {
         tableSvc.insertEntity('Market', entry, function (error, result, response) {
            if (!error) {
               console.log("Sucess!!, entry has been inserted");
               res.send("Sucess!!, entry has been inserted");
            } else
               res.send("Error in inserting entry");
         });
      }
   });
   
   /*the name of fields stored in the database should be the same names as what the 
   datatables was intialized with in clientside user.js*/ 
   app.get("/querydata", function (req, res, next) {
      var query = new azure.TableQuery().
         where("email == ?", "sharvind@gmail.com");
      tableSvc.queryEntities('UserTable', query, null, function (error, result, response) {
         if (!error) { // query was successful
            res.send("<pre>" + JSON.stringify(result.entries,null,"  ") + "</pre>");
         }
      });

   });
   

}


