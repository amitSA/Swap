
/*
 * GET home page.
 */

var app = require("../app");
var express = require('express');


app.get("/", function (req, res) {
    res.render("index");
});


/*
module.exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};*/

//  \/(users)\/:digit/