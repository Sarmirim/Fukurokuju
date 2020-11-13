import {DataParser, Logger} from './index.js'
import axios from'axios'

const key = '.json?raw_json=1';

function parse(link){
    return new Promise(function(resolve, reject){
        axios.get(link.split('/?')[0] + key).then(res => {
            resolve(res.data)
            reject(new Error('Error'))
        }).catch(err=>{
            Logger.error(err)
            console.log('\x1b[41m', err.message ,'\x1b[0m');
            reject(err)
        })
    });
}

export default async function LinkParser(link){
    const jsonData = await parse(link).then((data) => {
        return data;
    }).catch(function(err) {
        Logger.error(err);
        // console.error(err);
        return "ERROR";
    }); 
    return DataParser(link, JSON.stringify(jsonData));
}