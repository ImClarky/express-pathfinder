var express = require('express');
var http = require('http');

var app = express();


app.get("/test", function(req, res, next) {

});

app.post("/test", function(req, res, next) {

});

var admin = require('./routes/admin');

app.use("/admin", admin);

module.exports = app;
