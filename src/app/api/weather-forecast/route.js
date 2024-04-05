
const APIForecastDays = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Czechia%2C%20%C5%BDebnice/next7days?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json&lang=id`;

const APIForecastHours = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Czechia%2C%20%C5%BDebnice/2024-04-05/2024-04-11?unitGroup=metric&include=hours%2Cdays&key=${process.env.WEATHER_API_KEY}&contentType=json`

export async function GET(request) {
    let forecast = null;
    try {
        forecast = await getWeatherForecast('days');
    }
    catch (error) {
        console.error("Fetch error", error);
        return new Response("Error fetching data from the API", { status: 500 });
    }
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
            tempWeather: current.temp,
            dew: current.dew,
            humidity: current.humidity,
            precip: current.precip,
            pressure: current.pressure,
            cloudcover: current.cloudcover,
            visibility: current.visibility,
            uvindex: current.uvindex,
            solarenergy: current.solarenergy,
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

export async function getWeatherForecast(type) {
    let response = null;

    response = await fetch(type === 'hours' ? APIForecastHours : APIForecastDays, {
        next: {
            revalidate: 43200 // 12 hours
        },
        headers: {
            'Cache-Control': 'max-age=3600' // Cache for 1 hour
        }
    });
    const responseBody = await response.text();
    const data = JSON.parse(responseBody);
    const forecast = data.days;
    return forecast;
}