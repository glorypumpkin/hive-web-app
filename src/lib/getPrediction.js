import { getDataWithDayAndHour } from './dateFiltering';
import { getHiveData } from '@/app/api/fetch-hive-data/route';
import { getWeatherHistory } from '@/app/api/weather-history/route';
import { getWeatherForecast } from '@/app/api/weather-forecast/route';

export async function prepareData() {

    //get yesterday's date
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    //get hive data for yesterday GET 
    const hiveData = await getHiveData(yesterday, today);
    // console.log('hiveData', hiveData);
    const hiveDataWithHour = getDataWithDayAndHour(hiveData, yesterday, today);
    // console.log('hiveDataWithHour', hiveDataWithHour);

    //get weather data for yesterday
    const weatherData = await getWeatherHistory(yesterday, today);

    //get weather data for the next 7 days
    const forecast = await getWeatherForecast();

    // const weatherData = weatherDataFetched ?? [];

    //filter weather to only have month, day, year, tempWeather, precipitation, solarenergy keys
    const next7Days = filterWeather(forecast);
    const yesterdayWeather = filterWeather(weatherData);
    // console.log('next7Days', next7Days);
    // console.log('yesterdayWeather', yesterdayWeather);

    //combine hiveData and weatherData for yesterday (check the days are the same)
    const combinedData = combineData(hiveDataWithHour, yesterdayWeather);
    // console.log('combinedData', combinedData);

    let preparedData = [];
    for (let i = 0; i < combinedData.length; i++) {
        const current = combinedData[i];
        preparedData.push(
            current.month, current.hour, current.weight, current.tempWeight, current.tempWeather, current.precipitation, current.solarenergy
        )
    }

    //return data ready for prediction
    return preparedData
}

function filterWeather(weather) {
    let filteredWeather = [];
    if (weather) {
        for (let i = 0; i < weather.length; i++) {
            const current = weather[i];
            const datetime = current.datetime;
            const datetime_split = datetime.split('-');
            const month = parseInt(datetime_split[1]);
            const day = parseInt(datetime_split[2]);
            const year = parseInt(datetime_split[0]);
            filteredWeather.push({
                month: month,
                day: day,
                year: year,
                tempWeather: current.temp,
                precipitation: current.precip,
                solarenergy: current.solarenergy
            });
        }
    }
    return filteredWeather;
}

function combineData(hiveData, weatherData) {
    // console.log('hiveData', hiveData);
    // console.log('weatherData', weatherData);
    let combinedData = [];
    if (hiveData && weatherData) {
        for (let i = 0; i < hiveData.length; i++) {
            const current = hiveData[i];
            const date = current.day;
            const date_split = date.split('.');
            const day = parseInt(date_split[0]);
            const month = parseInt(date_split[1]);
            const year = current.year;
            const hour = parseInt(current.hour.split(':')[0]);
            // console.log('day month year', day, month, year)
            for (let j = 0; j < weatherData.length; j++) {
                const currentWeather = weatherData[j];
                if (currentWeather.month === month && currentWeather.day === day && currentWeather.year === year) {
                    combinedData.push({
                        month: month,
                        hour: hour,
                        tempWeather: currentWeather.tempWeather,
                        tempWeight: current.temperature,
                        precipitation: currentWeather.precipitation,
                        solarenergy: currentWeather.solarenergy,
                        weight: current.weight,
                        weightDiff: current.rozdil
                    });
                }
            }
        }
        return combinedData;
    }
}