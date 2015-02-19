
module.exports = function (obj) {
   var app = obj.app; var azure = obj.azure; var tableSvc = obj.tableSvc; var cont = obj.cont;
   var userTable = cont.userTable;
   
   /*Any get route with "/home" will go through this, and this route handles the authentification 
    So future routes dont have to check for it(authentification) */ 
   app.get(/^\/user.*/, cont.markLoginStatus, function (req, res, next) {
    
      if (!req.isLoggedIn) {
         res.redirect("/");
         return;
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
      var b = req.body;
      var length = -1;
      /*RIGHTNOW, I AM QUERYING THE TABLE TO FIND HOW MANY ELEMENTS ARE CURRENTLY INSIDE IT, and 
      then query.length can be the RowKey for the new reservation*/
      var query = new azure.TableQuery()
                  .where('PartitionKey eq ?', b.postalcode)
                  .select(["RowKey"]);
      tableSvc.queryEntities('Market', query, null, function (error, result, response) {
         if (!error){  // query was successful
            length = result.entries.length+"";
            console.log("querying worked, length: " + length);
         }
      });
      //IF THERE WAS AN ASYNCHRONOUS queryEntities() method, I wouldnt have to do this!!!
      while (length == -1) {
         setTimeout(function () { }, 100);
      }

      var entry = {
         "PartitionKey" : { "_" : b.postalcode },
         "RowKey" : { "_" : length },
         "date" : { "_" : b.date },
         "guestNum" : { "_" : b.guestNum },
         "time" : { "_" : b.time },
         "makerID" : { "_" : b.makerEmail },
         "takerID" : {} //empty object means no-body has taken it yet!!!
      };
      console.log(entry.RowKey._);
      /*tableSvc.insertEntity('Market', entry, function (error, result, response) {
         if (!error)
            console.log("Sucess!!!!, entry has been inserted");         
      });*/
   });
   

   //HOW TO CHECK IF A USER IS ALWAYS LOGGED IN...right onw

}

