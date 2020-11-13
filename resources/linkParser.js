import {DataParser} from './index.js'
import axios from'axios'

const key = '.json?raw_json=1';

function parse(link){
    return new Promise(function(resolve, reject){
        axios.get(link.split('/?')[0] + key).then(res => {
            resolve(res.data)
            reject(new Error('Error'))
        })
    });
}

export default async function LinkParser(link){
    const jsonData = await parse(link).then((data) => {
        return data;
    }).catch(function(err) {
        console.error(err);
        return "ERROR";
    }); 
    return DataParser(link, JSON.stringify(jsonData));
}