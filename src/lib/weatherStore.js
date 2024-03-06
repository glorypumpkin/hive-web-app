import { createClient, kv } from "@vercel/kv";
import { differenceInDays, addDays, subDays, format } from "date-fns";

const weater_set = 'weather';


// yyyy-mm-dd
function getRequestURL(date) {
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Czechia/${date}?unitGroup=metric&include=days&key=${process.env.WEATHER_API_KEY}&contentType=json`
}

export async function getAllData() {
    // get from KV
    const dateFrom = await kv.zrange(weater_set, 0, -1);
    // console.log('dateFrom', dateFrom);
    // if not in KV, fetch from API
}
export async function getWeatherFromDB(fromTimestamp, toTimestamp) {
    // get from KV
    const data = await kv.zrange(weater_set, fromTimestamp, toTimestamp, { byScore: true });
    return data;
}

export async function deleteWeatherData() {
    // delete from KV
    await kv.del(weater_set);
}

// apiObjects: Array<{datetime: string, ...}>
export async function saveWeatherData(apiObjects) {
    // convert to score, member
    const toInsert = [];
    for (let i = 0; i < apiObjects.length; i++) {
        const current = apiObjects[i];
        const datetime = current.datetime;
        const timestamp = new Date(datetime).getTime();
        toInsert.push({ score: timestamp, member: JSON.stringify(current) });
    }
    // save to KV
    console.log('storing data', toInsert);
    const res = await kv.zadd(weater_set, ...toInsert);
    console.log('res', res);
}
// date objects
export async function getWeatherData(from, to) {
    // convert to timestamp
    const fromTimestamp = from.getTime();
    const toTimestamp = to.getTime();

    // load from KV
    const data = await getWeatherFromDB(fromTimestamp, toTimestamp);
    // data: Array<{datetime: string, datetimeepoch: number, ...}>
    // datetime: "2022-01-01"
    // console.log('data from DB', data);

    // find missing dates
    const knownDates = [];
    for (let i = 0; i < data.length; i++) {
        const current = data[i];
        const currentDate = new Date(current.datetime);
        knownDates.push(currentDate);
    }

    // add new object at the beginning of the array
    knownDates.unshift(subDays(from, 1));
    knownDates.push(addDays(to, 1));
    // console.log('knownDates', knownDates);

    // invariant: db returns sorted data
    const missingDates = [];
    for (let i = 0; i < knownDates.length - 1; i++) {
        const current = knownDates[i];
        const next = knownDates[i + 1];
        const diff = differenceInDays(next, current);
        if (diff > 1) {
            for (let j = 1; j < diff; j++) {
                const missingDate = addDays(current, j);
                const missingDateFormated = format(missingDate, 'yyyy-LL-dd')
                missingDates.push(missingDateFormated);
            }
        }
    }
    // console.log('missingDates', missingDates);
    // fetch missing dates from API 
    if (missingDates.length !== 0) {

        const fetchedData = [];
        for (let i = 0; i < missingDates.length; i++) {
            const date = missingDates[i];
            const fetched = await getWeatherOn(date);
            if (fetched !== null) {
                fetchedData.push(fetched);
            }
        }
        console.log('fetchedData', fetchedData);

        // save to KV 
        if (fetchedData.length !== 0) {
            await saveWeatherData(fetchedData);
        }
    }

    // return all data
    return await getWeatherFromDB(fromTimestamp, toTimestamp);
}

// format yyyy-mm-dd
export async function getWeatherOn(date) {

    console.info('external API call for ', date);
    try {
        const response = await fetch(getRequestURL(date), {
            method: "GET",
            headers: {}
        });
        const responseBody = await response.text();
        const data = JSON.parse(responseBody);
        const days = data.days;
        return days[0];
    } catch (jsonError) {
        console.error("JSON parsing error", jsonError);
        return null;
    }
}