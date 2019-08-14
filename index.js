'use strict'


const Cartoon = require('./models/cartoon');

const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


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
            res.render('home2', {cartoons: JSON.stringify(cartoons)});
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

// ADD - API
app.post('/api/add/', (req,res, next) => {
    // find & update existing item, or add new
    if (!req.body._id) { // insert new document
        let cartoon = new Cartoon({show:req.body.show, network:req.body.network, airdate:req.body.airdate});
        cartoon.save((err,newCartoon) => {
            if (err) return next(err);
            console.log(newCartoon);
            res.json({updated: 0, _id: newCartoon._id});
        });
    } else { // update existing document
        Cartoon.updateOne({show: req.body.show}, {
            show: req.body.show,
            network: req.body.network,
            airdate: req.body.airdate }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, show: req.body.show});
            console.log(result);
        });
    }
});


// ADD - API
// app.get('/api/add/:show/:network/:airdate', (req,res, next) => {
//     // find & update existing item, or add new
//     let show = req.params.show;
//     Cartoon.update({show: show},{show: req.params.show, network: req.params.network, airdate: req.params.airdate },
//         {upsert: true }, (err, result) => {
//             if (err) return next(err);
//             // nModified = 0 for new item, = 1+ for updated item
//             res.json({updated: result.nModified});
//             console.log(result);
//         });
// });


// DELETE - API
app.get('/api/delete/:id', (req,res,next) => {
    Cartoon.deleteOne({ "_id": req.params.id }, (err, deleted) => {
        if (err) return next(err);
             res.json({"deleted": deleted});
            console.log(deleted);

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

// app.get('/api/details/:id', (req,res,next) => {
//     Cartoon.findOne({ "_id": req.params.id }, (err, cartoon) => {
//         if (err) return next(err);
//         res.json(cartoon);
//     });
// });


// CARTOON LIST
app.get('/details', (req,res,next) => {
    Cartoon.findOne({ "_id": req.query.id }, (err, cartoon) => {
        if (err) return next(err);
        res.render('details', {result: cartoon} );
    });
});

// app.get('/details', (req,res,next) => {
//     Cartoon.findOne({ show: req.query.show }, (err, cartoon) => {
//         if (err) return next(err);
//         res.render('details', {result: cartoon} );
//     });
// });



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

