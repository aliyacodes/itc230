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


app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route



// // FIND ALL DOCUMENTS
app.get('/', (req,res) => {
    Cartoon.find({}, (err, cartoons) => {
        if (err) {
            console.log(err);
        }
            console.log(cartoons);
            res.render('home_demo', {cartoons: JSON.stringify(cartoons)});
            //res.render('home', {cartoons: cartoons});

    });
});

// FIND ALL DOCUMENTS - API
app.get('/api/details', (req,res,next) => {
    Cartoon.find({}, (err, cartoons) => {
        if (err) return next(err);
        res.json(cartoons);
    });
});


// ABOUT
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About Page');
});

// ADD
app.post('/api/add/', (req,res, next) => {
    // find & update existing item, or add new
    if (!req.body.show) { // insert new document
        let cartoon = new Cartoon({show:req.body.show, network:req.body.network, airdate:req.body.airdate});
        cartoon.save((err,newCartoon) => {
            if (err) return next(err);
            //console.log(newCartoon)
            res.json({updated: 0, show: newCartoon.show});
        });
    } else { // update existing document
        Cartoon.updateOne({show: req.body.show}, {
            show:req.body.show,
            network: req.body.network,
            airdate: req.body.airdate }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, show: req.body.show});
        });
    }
});


// ADD API
app.get('/api/add/:show/:network/:airdate', (req,res, next) => {
    // find & update existing item, or add new
    let show = req.params.show;
    Cartoon.update({ show: show}, {show: show, network: req.params.network, airdate: req.params.airdate },
        {upsert: true }, (err, result) => {
            if (err) return next(err);
            // nModified = 0 for new item, = 1+ for updated item
            res.json({updated: result.nModified});
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

// SEARCH
app.post('/details', (req,res,next) => {
    Cartoon.findOne({ show: req.body.show }, (err, cartoon) => {
        if (err) return next(err);
        res.json(cartoon);
    });
});

// SEARCH - API
app.get('/api/details/:show', (req,res,next) => {
    Cartoon.findOne({ show: req.params.show }, (err, cartoon) => {
        if (err) return next(err);
        res.json(cartoon);
    });
});


// CARTOON LIST LINK TO INFO
app.get('/details', (req,res,next) => {
    Cartoon.findOne({ show: req.query.show }, (err, cartoon) => {
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

// START APP
app.listen(app.get('port'), () => {
    console.log('Express started at ' + __dirname);
});

