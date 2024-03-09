
const APIForecast = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Czechia%2C%20Brno/next7days?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json&lang=id`;

export async function GET(request) {
    let response = null;
    try {
        response = await fetch(APIForecast, {
            next: {
                revalidate: 43200 // 12 hours
            }
        });
    }
    catch (error) {
        console.error("Fetch error", error);
        return new Response("Error fetching data from the API", { status: 500 });
    }
    const responseBody = await response.text();
    const data = JSON.parse(responseBody);
    const forecast = data.days;
    // console.log('forecast', forecast);
    // get lenght of forecast
    const totalObjects = Object.keys(forecast).length;

    for (let i = 0; i < totalObjects; i++) {
        const current = forecast[i];
        const datetime = current.datetime;
        const timestamp = new Date(datetime).getTime();

        const filtered = {
            datetime: current.datetime,
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
            conditions: current.conditions,
            // icon: current.icon
            // hours: current.hours
        }
        forecast[i] = filtered;
    }

    // console.log('forecast', forecast);

    return new Response(JSON.stringify(forecast), { headers: { 'Content-Type': 'application/json' } });
}