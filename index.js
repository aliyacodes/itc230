'use strict'

let cartoon = require("lib/cartoon.js");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// HOME - send static file as response
app.get('/', function(req,res){
    res.type('text/html');
    res.sendFile(__dirname + '/public/home.html');
});

// ABOUT - send plain text response
app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
});

// SEARCH - handle POST
app.post('/get', function(req,res){
    console.log(req.body)
    var header = 'Searching for: ' + req.body.show + '<br>';
    var found = cartoon.get(req.body.show);
    res.render("details", {show: req.body.show, result: found});
});

// DELETE - handle GET
app.get('/delete', function(req,res){
    let result = cartoon.delete(req.query.show); // delete cartoon object
    res.render('delete', {show: req.query.show, result: result});
});


// define 404 handler
app.use(function(req,res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');
});

