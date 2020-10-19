import {default as http} from 'http'
import {Parser} from './resources/index.js'
import Logger from './resources/logger.js'


const port = process.env.PORT || 8085;

const server = http.createServer((request, response) => {
    const { headers, method, url } = request;
	Logger.info(`Headers: ${JSON.stringify(headers)}`);
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.statusCode = 200;
	response.setHeader('Content-Type', 'application/json');

    if (url=='/') {
        response.setHeader('Content-Type', 'text/html');
		response.end("Fukurokuju server");
	}

	if (method === 'GET' && url === '/api') {
		let body = {};
		request.on('data', (chunk) => {
			body = (JSON.parse(chunk).url);
		}).on('end', () => {
			if (body == undefined) {
				console.log("asd");
				response.writeHead(404, {"Content-Type": "text/plain"});
				response.write(`add to your GET body {"url":"link to reddit sub or post"}`);
				response.end();
			} 
			else
				Parser(body).then((data)=>{
					response.end(JSON.stringify(data));
				}); 	
		});
	}
})

server.listen(port);

console.log(`Server running ...... ${port}`);
Logger.info(`Server running ...... ${port}`);