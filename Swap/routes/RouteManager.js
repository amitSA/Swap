
/*
 * GET home page.
 */

var app = require("../app");
var express = require('express');


app.get(/\/(w*)/, function (req, res) {
    res.render("index", {title: req.params[0]});
});


/*
module.exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};*/

//  \/(users)\/:digit/