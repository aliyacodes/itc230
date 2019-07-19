// define connection to the db
const Cartoon = require("../models/cartoon");

// insert a new document into the database
// new Cartoon ({show:"xx", network: "xx", airdate: xxxx});

// countDocuments --> mongodb method
Cartoon.countDocuments((err, result) => {
    console.log(result);
});

// find all documents
// Cartoon.find{} will return everything in collection
// json object goes in {}
// findOne will return array
Cartoon.find({}, (err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {

        // otherwise output the array of documents
        console.log(result);
    }
});

/*
.find --> callback, async
 */