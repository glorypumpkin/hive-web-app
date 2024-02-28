import { getWeatherData, saveWeatherData, deleteWeatherData } from "@/lib/weatherStore";
import { parseISO, startOfDay, addHours } from "date-fns";

// export const dynamic = 'force-dynamic';

export async function GET(request) {
    console.log('weather history GET');
    // today format yyyy-mm-dd
    const querryParams = new URLSearchParams(request.url);
    const from = querryParams.get('from');
    const to = querryParams.get('to');

    // convert to date objects
    const fromDate = new Date(from);
    const toDate = new Date(to);

    let test = null;
    try {
        test = await getWeatherData(fromDate, toDate);
    } catch (fetchError) {
        console.error("Fetch error", fetchError);
        return new Response("Error fetching data from the API", { status: 500 });
    }

    if (test === null) {
        return new Response("No data found", { status: 404 });
    }

    for (let i = 0; i < test.length; i++) {
        const current = test[i];
        const date = new Date(current.datetime);
        const midnight = startOfDay(date);
        const localDateObject = addHours(midnight, -midnight.getTimezoneOffset() / 60);
        const timestamp = localDateObject.getTime();
        // console.log('timestamp: ', timestamp);
        const filtered = {
            datatime: current.datetime,
            timestamp: timestamp,
            weather: current.temp,
            dew: current.dew,
            humidity: current.humidity,
            pressure: current.pressure,
            windSpeed: current.windspeed,
            tempmin: current.tempmin,
            tempmax: current.tempmax,
            uvindex: current.uvindex
        }
        test[i] = filtered;
    }

    return new Response(JSON.stringify(test), { headers: { 'Content-Type': 'application/json' } });
}