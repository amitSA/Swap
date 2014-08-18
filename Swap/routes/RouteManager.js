
/*
 * GET home page.
 */

var app = require("../app");
var express = require("express");


var azure = require("azure-storage");
var tableSvc = azure.createTableService("swaptable","8UDip3NaZvG7QgPKrPrRR/D/78kgnrf7GG89Jo5omrPAhEr/eFRV41W790Q/R4XhgcMVFIcl885HLX3pSuXD0g==");



tableSvc.createTableIfNotExists('mytable', function (error, result, response) {
    if (error) {
        console.log("There as an error in creating the table");
        return;
    }
    if (result)
        console.log("A was created");
    else
        console.log("The table allready existed");
});


/*We want every user to have their own paritition key, so partition keys will
always be a users email since all emails are unique*/
app.post("/newuser", function (req, res, next) {
    var b = req.body;
    var entry = {
        PartitionKey: {"_": b.email }, 
        RowKey: {"_": "1"},
        email: {"_":b.email}, 
        name : {"_":b.name}
    };
    tableSvc.insertEntity('mytable', entry, function (error, result, response) {
        if (error) {
            console.log("error in /newuser request");
            return;
        }
        res.render("index");
    });
    

});

app.get("/users", function (req, res, next) {
    var query = new azure.TableQuery();
    tableSvc.queryEntities("mytable", query, null, function (error, result, response) {
        if (error) {
            console.log("error in /users request");
            return;
        }
        console.log("the name is : " + result.entries[0].email._);
        res.render("all-users", { entries : result.entries });
    });
});


app.get("/", function (req, res) {
    res.render("index");
});

