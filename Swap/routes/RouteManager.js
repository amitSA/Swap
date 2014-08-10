
/*
 * GET home page.
 */

var app = require("../app");

app.get("/", function (req, res) {
    res.render("index", {title: "Swap"});
});


/*
module.exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};*/