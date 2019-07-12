'use strict'



let cartoon = require("lib/cartoon.js");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
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
    res.render('home', {cartoons: cartoon.getAll()});
});

// ABOUT - send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About Page');
    //res.send('About ' + req.query.name + '\'s page');
});

// ADD
app.get('/details', (req,res) => {
    console.log(req.query);
    let found = cartoon.get(req.query.show);
    res.render('details', {show: req.query.show, result: found});
});

// DELETE - handle GET (get renders query)
app.get('/delete', (req,res) => {
    console.log(req.query.show + ' deleted');
    let result = cartoon.delete(req.query.show); // delete cartoon object
    res.render('delete', {show: req.query.show, result: result});
});

// SEARCH - handle POST (post renders body)
app.post('/details', (req,res) => {
    console.log(req.body);
    let found = cartoon.get(req.body.show);
    res.render('details', {show: req.body.show, result: found, cartoons: cartoon.getAll()});
});


// define 404 handler
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started at ' + __dirname);
});
