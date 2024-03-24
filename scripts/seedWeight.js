import { convertor } from '../src/lib/convertor.js';
import fs from 'fs';
import { getRedisClient } from "../src/lib/redis.js";

const weight_set = 'weight_set';

export function convertFromFile() {
    const fileContents = fs.readFileSync("public/hivedata.txt", 'utf8')
    // console.log(fileContents);
    const data = convertor(fileContents);
    return data;
}


// apiObjects: Array<{datum: string, weight: num,...}>
export async function saveWeightData(apiObjects) {
    // convert to score, member
    const toInsert = [];
    for (let i = 0; i < apiObjects.length; i++) {
        const current = apiObjects[i];
        const timestamp = current.timestamp;
        toInsert.push({ score: timestamp, value: JSON.stringify(current) });
    }
    // save to KV
    // console.log('storing data', toInsert);
    const kv = getRedisClient();
    // stringify the items
    const res = await kv.zAdd(weight_set, toInsert);
    console.log('res', res);
}
export async function main() {
    const weightData = convertFromFile();
    await saveWeightData(weightData);
    console.log('done');
}

main();