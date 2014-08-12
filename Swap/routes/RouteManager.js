
/*
 * GET home page.
 */

var app = require("../app");
var express = require('express');


app.get("/", function (req, res) {
    res.render("index");
});

