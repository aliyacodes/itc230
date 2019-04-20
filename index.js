const http = require('http'); 

http.createServer((req,res) => {
    
    const path = req.url.toLowerCase();
    //const path = require('path');
    

    
    
    switch(path) {
        case '/':   
            
            const fs = require('fs');
            //const jsonData = JSON.parse('/Users/aliyaasken/Desktop/SCH00L/ITC230-SP19/itc230/public/home.html');
            
            
            fs.readFile(require('/Users/aliyaasken/Desktop/SCH00L/ITC230-SP19/itc230/public/home.html', (err, html) => {
                if (err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);  
                res.end();  
                //res.end(data.toString());
 
            }));

        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page');
            break;

        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
	}
                             
}).listen(process.env.PORT || 3000);





/*

***SERVING FILES***

 case '/':   
   const fs = require("fs");
   fs.readFile("home.html", (err, data) => {
     if (err) return console.error(err);
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.end(data.toString());
  });


------
***BASIC ROUTES***

const http = require("http"); 
http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Home page');
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);
-------

const http = require("http");  
http.createServer((req,res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Aloha world');
}).listen(process.env.PORT || 3000);



-------

//const config = require('public');
            //fs.accessSync('/Users/aliyaasken/Desktop/SCH00L/ITC230-SP19/itc230/public/home.html', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);


*/