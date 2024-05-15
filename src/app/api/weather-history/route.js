import { getWeatherOn, genericGetData } from "@/lib/dataStore";
import { assertCorrectDateRange } from '@/lib/dataFetching';
import { differenceInDays, addDays, subDays, format } from "date-fns";
import { startOfDay, addHours, differenceInYears } from "date-fns";

// export const dynamic = 'force-dynamic';
const weatherStrategy = {
    set: 'weather',
    getAndFetchMissing: async ({ set, from, to, data }) => {
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
        const fetchedData = [];
        if (missingDates.length !== 0) {
            for (let i = 0; i < missingDates.length; i++) {
                const date = missingDates[i];
                const fetched = await getWeatherOn(date);
                if (fetched !== null) {
                    fetchedData.push(fetched);
                }
                // if (fetched === null) {
                //     throw new Error('Error fetching data from the API');
                // }
            }
        }
        return fetchedData;
    },
    extractTimestamp: (item) => {
        const datetime = item.datetime;
        const timestamp = new Date(datetime).getTime();
        return timestamp;
    }
}

export async function GET(request) {
    console.log('weather history GET');
    // today format yyyy-mm-dd
    const url = new URL(request.url);
    // console.log('url', url);
    const queryParams = url.searchParams;
    const fromQuery = queryParams.get('from');
    const toQuery = queryParams.get('to');

    // convert to date objects
    const from = new Date(fromQuery);
    const to = new Date(toQuery);

    console.log(`Weather history data GET from ${from} (${fromQuery}) to ${to} (${toQuery})`);
    assertCorrectDateRange(from, to);

    let weatherData = null;
    try {
        weatherData = await genericGetData({ ...weatherStrategy, from, to });
    } catch (fetchError) {
        console.error("Fetch error", fetchError);
        return new Response("Error fetching data from the API", { status: 500 });
    }

    if (weatherData === null) {
        return new Response("No data found", { status: 404 });
    }

    for (let i = 0; i < weatherData.length; i++) {
        const current = weatherData[i];
        const date = new Date(current.datetime);
        const midnight = startOfDay(date);
        const localDateObject = addHours(midnight, -midnight.getTimezoneOffset() / 60);
        const timestamp = localDateObject.getTime();

        const filtered = {
            datetime: current.datetime,
            timestamp: timestamp,
            tempWeather: current.temp,
            dew: current.dew,
            humidity: current.humidity,
            pressure: current.pressure,
            windSpeed: current.windspeed,
            tempmin: current.tempmin,
            tempmax: current.tempmax,
            uvindex: current.uvindex,
            solarenergy: current.solarenergy,
            precip: current.precip,
        }
        weatherData[i] = filtered;
    }

    return new Response(JSON.stringify(weatherData), { headers: { 'Content-Type': 'application/json' } });
}

export async function getWeatherHistory(from, to) {
    const weatherData = await genericGetData({ ...weatherStrategy, from, to });
    return weatherData;
}