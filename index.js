'use strict'



let cartoon = require("lib/cartoon.js");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(bodyParser.urlencoded({extended: true}));

const handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");

// HOME - send static file as response
// app.get('/', (req,res) => {
//     console.log(req.query)
//     res.type('text/html');
//     res.sendFile(__dirname + '/public/home.html');
// });

app.get('/', (req,res) => {
    res.render('home', {name: req.query.name});
});

// ABOUT - send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About Page');
    //res.send('About ' + req.query.name + '\'s page');
});




// SEARCH - handle POST (post renders body)
app.post('/details', (req,res) => {
    console.log(req.body);
    let found = cartoon.get(req.body.show);
    res.render("details", {show: req.body.show, result: found});
});

// DELETE - handle GET (get renders query)
app.get('/delete', (req,res) => {
    let result = cartoon.delete(req.query.show); // delete cartoon object
    res.render('delete', {show: req.query.show, result: result});
});

// app.post('/add', (req,res) => {
//     let found = cartoon.add(req.body.show); // add cartoon object
//     res.render('add', {show: req.body.show, result: found});
// });

// define 404 handler
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started at ' + __dirname);
});

