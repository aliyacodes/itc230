'use strict'


const credentials = require("../urmom/credentials");

const mongoose = require('mongoose');

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
// const connectionString = "mongodb+srv://<dbuser>:<dbpassword>@<cluster>.mongodb.net/test?retryWrites=true";


mongoose.connect(credentials.connectionString, { dbName: 'projects', useNewUrlParser: true });

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
});


const cartoonSchema = mongoose.Schema({
    show: { type: String, required: true },
    network: String,
    airdate: Number
});

module.exports = mongoose.model('Cartoon', cartoonSchema);



// FOR EASY REFERENCE

// let cartoons = [
//     {show: "south park", network: "comedy central", airdate: 1997},
//     {show: "family guy", network: "fox", airdate: 1998},
//     {show: "bob's burgers", network: "fox", airdate: 2011},
//     {show: "rick and morty", network: "adult swim", airdate: 2013},
//     {show: "american dad", network: "fox", airdate: 2005},
// ];


//
// Cartoon.countDocuments((err, result) => {
//     console.log(result);
// });
//

//
//
// // return a single record
// Cartoon.findOne({'show':'south park'}, (err, item) => {
//     if (err) return next(err);
//     console.log(item);
//
// });
//
// const newCartoon = {'show':'south park', 'network':'comedy central', 'airdate': 1997 }
// Cartoon.update({'show':'xxx'}, newCartoon, {upsert:true}, (err, result) => {
//   if (err) return next(err);
//   console.log(result);
//   // other code here
// });
//
// Cartoon.get = (show) => {
//     return Cartoon.find((item) => {
//         return item.show.toLowerCase() === show.toLowerCase();
//     });
// };
//
// Cartoon.delete = (show, cartoons) => {
//     const oldLength = cartoons.length;
//     cartoons = cartoons.filter((item) => {
//         return item.show !== show;
//     });
//     return {deleted: oldLength !== cartoons.length, total: cartoons.length };
// };
//
// Cartoon.add = (show) => {
//     const oldLength = cartoons.length;
//
//     let found = this.get(newCartoon.show); //?????
//     if (!found) {
//         cartoons.push(newCartoon);
//     }
//     return {added: oldLength !== cartoons.length, total: cartoons.length };
// };

//// insert or update a single record


