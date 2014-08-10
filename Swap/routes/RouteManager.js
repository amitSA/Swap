
/*
 * GET home page.
 */

var app = require("../app");

app.get(/\/?(users)?\/(\d+)/, function (req, res) {
    res.render("index", {title: "Swap"});
});


/*
module.exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};*/