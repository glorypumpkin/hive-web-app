import { getWeatherData, saveWeatherData, deleteWeatherData } from "@/lib/weatherStore";

const APIForecast = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Czechia/next7days?unitGroup=metric&key=EH8QCN7D4JL5QY29BLLSEEGVA&contentType=json'
const APIHistory = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Czechia/2022-01-1/today?unitGroup=metric&include=days&key=EH8QCN7D4JL5QY29BLLSEEGVA&contentType=json'

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const test = await getWeatherData(new Date('2022-01-01'), new Date('2022-01-05'));
        console.log('test', test);
        // try {
        //     const data = JSON.parse(responseBody);
        //     // console.log("data", data);

        //     return new Response(JSON.stringify(data), {
        //         headers: { "Content-Type": "application/json" }
        //     });
        // } catch (jsonError) {
        //     console.error("JSON parsing error", jsonError);
        //     return new Response("Invalid JSON in the response", { status: 500 });
        // }
        return new Response("OK")
    } catch (fetchError) {
        console.error("Fetch error", fetchError);
        return new Response("Error fetching data from the API", { status: 500 });
    }
}