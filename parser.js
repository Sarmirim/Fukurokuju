import request from 'request'
import {default as dataFromParser} from './dataParser.js'

const link = '';
const key = '.json?limit=5&raw_json=1';

function parse(linkToParse){
    return new Promise(function(resolve, reject){
        request(linkToParse + key,
            function (error, response, body) {
            resolve(body);
            reject(new Error('Error'));
        });
    });
}

let jsonData;
let arrayData = [];

export default async function f(redditLink){
    console.log(redditLink);

    let arr = [];
    jsonData = await parse(redditLink).then(function(val) {
        return val;
    }).catch(function(err) {
        console.err(err);
        return "ERROR";
    });
    arr = dataFromParser(redditLink, jsonData);

    return arr;
}

/////Example
/*f().then((massiv)=>{
        arrayData = massiv
        console.table(arrayData)
    });*/