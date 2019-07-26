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


// const routes = require('./routes.js');
// app.use('/routes', routes);
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route


/* NOTES */
// GET renders query
// POST renders BODY



// FIND ALL DOCUMENTS
app.get('/', (req,res) => {

    Cartoon.find({}, (err, cartoons) => {
        if (err) {
            console.log(err);
        } else {
            res.render('home', {cartoons: cartoons});
        }
    });
});

// ABOUT
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About Page');
});

// DELETE
app.get('/delete', (req,res) => {
    Cartoon.deleteOne({ show: req.query.show }, (err, deleted) => {
        if (err) return next(err);
        Cartoon.countDocuments((err, total) => {
            res.render('delete', {show: req.query.show, total: total, deleted: deleted} );
        });
    });
});

// CARTOON LIST LINK TO INFO
app.get('/details', (req,res,next) => {
    Cartoon.findOne({ show: req.query.show }, (err, cartoon) => {
        if (err) return next(err);
        res.render('details', {result: cartoon} );
    });
});

// ADD
app.post('/add', (req,res,next) => {
    const newCartoon = { show: req.body.show, network: req.body.network, airdate: req.body.airdate };
    Cartoon.updateOne({ show: req.body.show }, newCartoon, {upsert: true}, (err, added) => {
        if (err) return next(err);
        Cartoon.countDocuments((err, total) => {
            res.render('add', {show: req.body.show, result: newCartoon, total: total, added: added} );

        });
    });
});

// SEARCH BAR
app.post('/details', (req,res,next) => {
    Cartoon.findOne({ show: req.body.show }, (err, cartoon) => {
        if (err) return next(err);
        res.render('details', {result: cartoon} );
    });
});



/* API ROUTES */

// FIND ALL DOCUMENTS - API
app.get('/api/details', (req,res,next) => {
    Cartoon.find({}, (err, cartoons) => {
        if (err) return next(err);
        res.json(cartoons);
    });
});

// DELETE - API
app.get('/api/delete/:show', (req,res,next) => {
    Cartoon.deleteOne({ show: req.params.show }, (err, deleted) => {
        if (err) return next(err);
        Cartoon.countDocuments((err, total) => {
            res.json(deleted);
        });
    });
});

// CARTOON LIST LINK TO INFO - API
app.get('/api/details/:show', (req,res,next) => {
    Cartoon.findOne({ show: req.params.show }, (err, cartoon) => {
        if (err) return next(err);
        res.json(cartoon);
    });
});

// ADD - API
app.post('/api/add/:show/:network/:airdate', (req,res,next) => {
    const newCartoon = { show: req.params.show, network: req.params.network, airdate: req.params.airdate };
    Cartoon.updateOne({ show: req.params.show }, newCartoon, {upsert: true}, (err, result) => {
        if (err) return next(err);
        res.json(result);

    });
});

// SEARCH BAR - API
app.post('/api/details/:show', (req,res,next) => {
    Cartoon.findOne({ show: req.params.show }, (err, cartoon) => {
        if (err) return next(err);
        res.json(cartoon);
    });
});

/* END API ROUTES */



// define 404 handler
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

// START APP
app.listen(app.get('port'), () => {
    console.log('Express started at ' + __dirname);
});

