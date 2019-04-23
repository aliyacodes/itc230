

const http = require("http");
http.createServer((req,res) => {
    console.log("Create server");
    const path = req.url.toLowerCase();
    switch(path) {
        case '/':
            var fs = require("fs");
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
            var fs = require("fs");
            fs.readFile("lib/cartoon.js", (err, data) =>{
                if (err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(data.toString());
            });
            break;

        case '/delete':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('delete');
            break;

        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }

}).listen(process.env.PORT || 3000);
console.log("Server created");