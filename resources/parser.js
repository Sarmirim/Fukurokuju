import {default as dataFromParser} from './dataParser.js'
import axios from'axios'

const key = '.json?limit=25&raw_json=1';

function parse(linkToParse){
    return new Promise(function(resolve, reject){
        axios.get(linkToParse + key)
        .then(res => {
            resolve(res.data)
            reject(new Error('Error'))  
        })
    });
}

let jsonData;

export default async function f(redditLink){
    console.log(redditLink);
    let arr = [];
    jsonData = await parse(redditLink).then((val) => {
        return val;
    }).catch(function(err) {
        console.error(err);
        return "ERROR";
    });
    arr = dataFromParser(redditLink, JSON.stringify(jsonData));
    return arr;
}