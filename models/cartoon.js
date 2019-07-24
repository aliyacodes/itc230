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



