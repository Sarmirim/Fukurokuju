import {default as http} from 'http'
import {default as parserModule} from './parser.js'
import logger from './logger.js'

let arrayData = [];

//In case someone stumbles upon this in the future.. If you are running nginx in front of node.js you can also block favicon requests by adding this line:
//
// location = /favicon.ico { access_log off; log_not_found off; }

const port = 8085;

const server = http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const { headers, method, url } = request;
    let a = request.headers;
    console.log(request.headers);
    let requestedURL = url.toString();
    try {
        if(url.match(/\bwww.+/i)!=null) {
            let wwwMatches = url.match(/\bwww.+/i)[0].toString();
            requestedURL = "https://" + wwwMatches;
        }
        if (url.match(/\breddit.+/i) != null) {
            let wwwMatches = url.match(/\breddit.+/i)[0].toString();
            requestedURL = "https://www." + wwwMatches;
        }
    }catch (e) {
        console.log("Invalid link")
        console.log(e)
    }
    logger.info(`URL: ${requestedURL}`);
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
    });

    parserModule(requestedURL).then((tableArray)=>{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('X-Powered-By', 'Riftach');
        arrayData = tableArray
        let jsonArray = JSON.stringify(arrayData);
        response.end(jsonArray);
    });
}).listen(port);

// const hostname = '127.0.0.1';
// const port = 8080;
// console.log(`Server running at http://${hostname}:${port}/`);
console.log(`Server running ...... ${port}`);
logger.info('Server running ......');
////////////////////////Promise
let afterLink = "/r/all.json?limit=5&raw_json=1"
let jsonData;



