import {default as http} from 'http'
import {Parser} from './resources/index.js'
import Logger from './resources/logger.js'

let arrayData = [];

//In case someone stumbles upon this in the future.. If you are running nginx in front of node.js you can also block favicon requests by adding this line:
//
// location = /favicon.ico { access_log off; log_not_found off; }

const port = 8085;

const server = http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const { headers, method, url } = request;
    console.log(headers);
    Logger.info(`Headers: ${JSON.stringify(headers)}`);
    let requestedURL = url.toString();
    try {
        if (url.match(/reddit.+/g) != null) {
            requestedURL = "https://www." + url.match(/reddit.+/g)[0].toString();
        }
    }catch (e) {
        console.log("Invalid link")
        console.log(e)
    }
    Logger.info(`URL: ${requestedURL}`);
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
    });

    Parser(requestedURL).then((tableArray)=>{
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
Logger.info(`Server running ...... ${port}`);
////////////////////////Promise
let afterLink = "/r/all.json?limit=5&raw_json=1"
let jsonData;



