'use strict'

var http = require("http"), fs = require("fs"), qs = require("querystring");
let cartoon = require("lib/cartoon.js");

http.createServer((req,res) => {
    console.log("refreshed");
    let url = req.url.split("?");  // separate route from query string
    let query = qs.parse(url[1]); // convert query string to object
    let path = url[0].toLowerCase();


    switch(path) {
        case '/':

            fs.readFile("public/home.html", (err, data) =>{
                if (err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
            });
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page');
            break;

        case '/get':

            let found = cartoon.get(query.show);
                res.writeHead(200, {'Content-Type': 'text/plain'});
                let results = (found) ? JSON.stringify(found) : "Not found";
                res.end('Results for ' + query.show + "\n" + results);
            break;


        case '/delete':
            let removed = cartoon.delete(query.show);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let deleted = (removed) ? JSON.stringify(removed) : "Not found";
            res.end(query.show  + ' removed');
            break;

        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }

}).listen(process.env.PORT || 3000);
console.log("Server created");

/*
'use strict'

var http = require("http"), fs = require('fs'), qs = require("querystring");
const cartoon = require("lib/cartoon.js");

function serveStatic(res, path, contentType, responseCode){
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data){
        if(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
        }
        else{
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    });
}

http.createServer((req,res) => {
    let url = req.url.split("?");
    let query = qs.parse(url[1]);
    let path = url[0].toLowerCase();

    switch(path) {
        case '/':
            serveStatic(res, 'public/home.html', 'text/html');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About');
            break;
        case '/get':
            let found = cartoon.get(query.show);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let results = (found) ? JSON.stringify(found) : "Not found";
            res.end('Results for ' + query.show + "\n" + results);
            break;
        case '/delete':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('delete');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404:Page not found.');
    }

}).listen(process.env.PORT || 3000);
*/