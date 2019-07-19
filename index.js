'use strict'


const Cartoon = require('./models/cartoon');

const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(bodyParser.urlencoded({extended: true}));


const handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");


// find all documents
app.get('/', (req,res) => {

    Cartoon.find({}, (err, cartoons) => {
        if (err) {
            console.log(err);
        } else {
            res.render('home', {cartoons: cartoons });
        }
    });
});




// ABOUT    -    send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About Page');
});

// DELETE    -    (get renders query)
app.get('/delete', (req,res) => {
    Cartoon.deleteOne({ show: req.query.show }, (err, deleted) => {
        if (err) return next(err);
        Cartoon.countDocuments((err, total) => {
            res.render('delete', {show: req.query.show, total: total, deleted: deleted } );
        });
    });
});


// ADD    -    (get renders query)
app.get('/details', (req,res,next) => {
    Cartoon.findOne({ show: req.query.show }, (err, cartoon) => {
        if (err) return next(err);
        res.render('details', {result: cartoon} );
    });
});


// SEARCH
app.post('/details', (req,res,next) => {
    Cartoon.findOne({ show: req.body.show }, (err, cartoon) => {
        if (err) return next(err);
        res.render('details', {result: cartoon} );
    });
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




// - findOne -> returns object
// - find -> returns array
