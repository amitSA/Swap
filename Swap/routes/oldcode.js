/*

tableSvc.listTablesSegmented

var tblsToDelete = ["mytable","testtable","testtable3","testtable4"];
tblsToDelete = [];
for (var i = 0; i < tblsToDelete.length; i++) {
    tableSvc.deleteTableIfExists(tblsToDelete[i], function (error, response) {
        if (error)
            console.log("There was an error in deleting table " + tblsToDelete[i]);
    });   
}




tableSvc.createTableIfNotExists('testtable4', function (error, result, response) {
    if (error) {
        console.log("There as an error in creating the table");
        return;
    }
    if (result)
        console.log("A table was created");
    else
        console.log("The table allready existed");
});



*/