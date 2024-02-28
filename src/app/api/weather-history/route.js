import { getWeatherData, saveWeatherData, deleteWeatherData } from "@/lib/weatherStore";

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
        const timestamp = new Date(current.datetime).getTime();
        const localTimestamp = timestamp + 1 * 60 * 60 * 1000;
        const localDateObject = new Date(localTimestamp).getTime();
        // console.log('localDateObject', localDateObject);
        const filtered = {
            datatime: current.datetime,
            timestamp: localDateObject,
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