
const APIForecast = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Czechia/next7days?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`;

export async function GET(request) {
    let response = null;
    try {
        response = await fetch(APIForecast);
    }
    catch (error) {
        console.error("Fetch error", error);
        return new Response("Error fetching data from the API", { status: 500 });
    }
    const responseBody = await response.text();
    const data = JSON.parse(responseBody);
    const forecast = data.days;
    // get lenght of forecast
    const totalObjects = Object.keys(forecast).length;

    for (let i = 0; i < totalObjects; i++) {
        const current = forecast[i];
        const datetime = current.datetime;
        const timestamp = new Date(datetime).getTime();

        const filtered = {
            datatime: current.datetime,
            timestamp: timestamp,
            tempmax: current.tempmax,
            tempmin: current.tempmin,
            temp: current.temp,
            dew: current.dew,
            humidity: current.humidity,
            precipprob: current.precipprob,
            precipcover: current.precipcover,
            preciptype: current.preciptype,
            windspeed: current.windspeed,
            pressure: current.pressure,
            cloudcover: current.cloudcover,
            visibility: current.visibility,
            uvindex: current.uvindex,
            sunrise: current.sunrise,
            sunset: current.sunset,
            conditions: current.conditions
            // hours: current.hours
        }
        forecast[i] = filtered;
    }

    return new Response(JSON.stringify(forecast), { headers: { 'Content-Type': 'application/json' } });
}