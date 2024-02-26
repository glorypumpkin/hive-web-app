import { getWeatherData, saveWeatherData, deleteWeatherData } from "@/lib/weatherStore";

export const dynamic = 'force-dynamic';

export async function GET(request) {
    // today format yyyy-mm-dd
    const querryParams = new URLSearchParams(request.url);
    const from = querryParams.get('from');
    const to = querryParams.get('to');

    // convert to date objects
    const fromDate = new Date(from);
    const toDate = new Date(to);

    console.log('from', from);
    console.log('to', to);

    const today = new Date();
    console.log('today', today);
    try {
        const test = await getWeatherData(fromDate, toDate);
        console.log('test', test);
        return new Response(JSON.stringify(test), { headers: { 'Content-Type': 'application/json' } });
    } catch (fetchError) {
        console.error("Fetch error", fetchError);
        return new Response("Error fetching data from the API", { status: 500 });
    }
}