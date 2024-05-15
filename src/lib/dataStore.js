import { getRedisClient } from "./redis";

//TODO: rename everything

// yyyy-mm-dd
function getRequestURL(date) {
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Czechia%2C%20%C5%BDebnice/${date}?unitGroup=metric&include=days&key=${process.env.WEATHER_API_KEY}&contentType=json`
}

export async function getDataFromDB(set, fromTimestamp, toTimestamp) {
    // get from KV
    const kv = getRedisClient();
    // https://github.com/redis/node-redis/blob/dbf8f59/packages/client/lib/commands/ZRANGE.ts#L17
    const data = await kv.zRange(set, fromTimestamp, toTimestamp, {
        BY: 'SCORE'
    });
    // console.log('data from DB', data);
    // map to objects
    for (let i = 0; i < data.length; i++) {
        data[i] = JSON.parse(data[i]);
    }
    return data;
}

// apiObjects: Array<{datetime: string, ...}>
export async function saveData(set, apiObjects, extractTimestamp) {
    // convert to score, member
    const toInsert = [];
    for (let i = 0; i < apiObjects.length; i++) {
        const current = apiObjects[i];
        const timestamp = extractTimestamp(current);
        toInsert.push({ score: timestamp, value: JSON.stringify(current) });
    }
    // save to KV
    // console.log('storing data', toInsert);
    const kv = getRedisClient();
    // stringify the items
    const res = await kv.zAdd(set, toInsert);
    // console.log('res', res);
}

export async function genericGetData({ set, from, to, extractTimestamp, getAndFetchMissing }) {
    // convert to timestamp
    const fromTimestamp = from.getTime();
    const toTimestamp = to.getTime();
    // get from KV
    const data = await getDataFromDB(set, fromTimestamp, toTimestamp);

    // find and get missing data
    const newData = await getAndFetchMissing({ set, from, to, data });
    // console.log('newData', newData);

    // add to existing data in db
    if (newData.length !== 0) {
        await saveData(set, newData, extractTimestamp);
    }
    const allData = await getDataFromDB(set, fromTimestamp, toTimestamp);
    // console.log('allData', allData);
    // return all data
    return await getDataFromDB(set, fromTimestamp, toTimestamp);
}


// format yyyy-mm-dd
export async function getWeatherOn(date) {

    console.info('external API call for ', date);
    let responseBody = null;
    try {
        const response = await fetch(getRequestURL(date), {
            method: "GET",
            headers: {}
        });
        responseBody = await response.text();
        const data = JSON.parse(responseBody);
        const days = data.days;
        return days[0];
    } catch (jsonError) {
        console.error("could not parse JSON: ", responseBody);
        return null;
    }
}