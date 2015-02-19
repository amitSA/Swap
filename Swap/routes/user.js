
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
      }
      next();
   });

   app.get("/user/home", function (req, res, next) {
      var email = req.session["email-sess"];
      tableSvc.retrieveEntity(userTable, email, "userinfo", function (error, result, response) {
         res.render("./prod/user/userhome", { name : result.name._ });
      });
   });
  
   app.post("/user/newres", function (req, res, next) {
      console.log("reached top");
      var b = req.body;
      var length = -1;
      /*Querying the table to find the num elements inside a partition.  Length of response object
        is the new RowKey*/
      var query = new azure.TableQuery()
                  .where('PartitionKey eq ?', b.postalcode)
                  .select(["RowKey"]);
      
      tableSvc.queryEntities('Market', query, null, function (error, result, response) {
         if (!error){
            length = result.entries.length;
            var entry = {
               "PartitionKey" : { "_" : b.postalcode },
               "RowKey" : { "_" : length+"" },
               "date" : { "_" : b.date },
               "guestNum" : { "_" : b.guestNum },
               "time" : { "_" : b.time },
               "makerID" : { "_" : b.makerEmail },
               "takerID" : {} //empty object means no-body has taken it yet!!!
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
   

   //HOW TO CHECK IF A USER IS ALWAYS LOGGED IN...right onw

}


/*
  var hold = -1;
      setTimeout(function () { console.log("ehh"); }, 100);
      //while (hold === -1) { }
*/