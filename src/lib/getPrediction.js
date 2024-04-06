import { getDataWithDayAndHour } from './dateFiltering';
import { getHiveData } from '@/app/api/fetch-hive-data/route';
import { getWeatherHistory } from '@/app/api/weather-history/route';
import { getWeatherForecast } from '@/app/api/weather-forecast/route';
import { parse } from 'date-fns';

// import ort, { InferenceSession, Tensor } from "onnxruntime-web";
const ort = require('onnxruntime-web');

// construct path based on cwd
const wasmPath = process.cwd() + "/public/wasm/";

ort.env.wasm.wasmPaths = wasmPath;
ort.env.logLevel = 'verbose';
ort.env.wasm.numThreads = 1;

// get data from past day and prepare it for prediction
// return [{..}, {..}, {..}, {..}]
export async function getYesterdayData() {

    //get yesterday's date range
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    //get hive data for yesterday GET 
    const hiveData = await getHiveData(yesterday, today);
    // Add fields like hour, month, day, year to hiveData
    const hiveDataWithHour = getDataWithDayAndHour(hiveData, yesterday, today);

    //get weather data for yesterday (array of one object)
    //filter weather to only have month, day, year, tempWeather, precipitation, solarenergy keys
    const weatherData = await getWeatherHistory(yesterday, today);
    const yesterdayWeather = filterWeather(weatherData);

    //combine hiveData and weatherData for yesterday (check the days are the same)
    const combinedData = combineData(hiveDataWithHour, yesterdayWeather);

    // keep only last 4 elements of the array
    combinedData.splice(0, combineData.length - 4);

    //return data ready for prediction
    return combinedData
}

// get data from forecast for the next 7 days
// return 4 objects * 8 days = 32 objects (today + 7 days)
// params: array hours (for ex.) = [8, 12, 16, 20] - hours of the day to get forecast for
export async function getForecastData(hours) {
    //get weather data for the next 7 days
    const { forecast, address } = await getWeatherForecast('hours');
    const next7Days = filterForecast(forecast, hours);
    return next7Days;
}

function filterForecast(forecast, hours) {
    let filteredForecast = [];
    for (let i = 0; i < forecast.length; i++) {
        const current = forecast[i];
        const month = parseInt(current.datetime.split('-')[1]);
        const day = parseInt(current.datetime.split('-')[2]);
        const year = parseInt(current.datetime.split('-')[0]);
        for (let j = 0; j < current.hours.length; j++) {
            const currentHour = current.hours[j];
            const hour = parseInt(currentHour.datetime.split(':')[0]);
            if (hours.includes(hour)) {
                const temp = current.temp;
                const precip = current.precip;
                const solarenergy = current.solarenergy;
                const datetime = current.datetime + ' ' + currentHour.datetime;
                const parsedDate = parse(datetime, 'yyyy-MM-dd HH:mm:ss', new Date());
                const timestamp = parsedDate.getTime();
                filteredForecast.push({
                    hour: hour,
                    month: month,
                    day: day,
                    year: year,
                    tempWeather: temp,
                    precipitation: precip,
                    solarenergy: solarenergy,
                    timestamp: timestamp
                });
            }
        }
    }
    return filteredForecast;
}

function filterWeather(weather) {
    let filteredWeather = [];

    for (let i = 0; i < weather.length; i++) {
        const current = weather[i];
        const datetime = current.datetime;
        const datetime_split = datetime.split('-');
        const month = parseInt(datetime_split[1]);
        const day = parseInt(datetime_split[2]);
        const year = parseInt(datetime_split[0]);
        const temp = current.temp;
        const precip = current.precip;
        const solarenergy = current.solarenergy;
        filteredWeather.push({
            month: month,
            day: day,
            year: year,
            tempWeather: temp,
            precipitation: precip,
            solarenergy: solarenergy
        });
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

export async function getFeatures(yesterdayData, forecastData) {
    // return 2D array of floats (inputTensor)
    // row count is 4 (yesterdayData) + 4 * 8 (forecastData) = 36
    // column count is 7 (features)
    const features = [];
    for (const dataPoint of yesterdayData) {
        const objectFeatures = featurePreparation(dataPoint);
        features.push(objectFeatures);
    }

    for (const dataPoint of forecastData) {
        const objectFeatures = featurePreparation(dataPoint);
        features.push(objectFeatures);
    }

    return features;
}

// input: dataPoint object
// output: array of floats (7)
function featurePreparation(dataPoint) {
    const features = [];
    // console.log('dataPoint', dataPoint);
    features.push(
        dataPoint.month, dataPoint.hour, dataPoint.weight ?? 0, dataPoint.tempWeigth ?? dataPoint.tempWeather, dataPoint.tempWeather, dataPoint.precipitation, dataPoint.solarenergy
    )
    // console.log('features', features);
    return features;
}

export async function predict() {
    // console.log("GET /api/prediction", wasmPath);
    const yesterdayData = await getYesterdayData();
    const hours = []
    for (const dataPoint of yesterdayData) {
        const hour = dataPoint.hour;
        hours.push(hour);
    }

    const forecastData = await getForecastData(hours);
    // console.log("forecastData", forecastData)
    const features = await getFeatures(yesterdayData, forecastData); // 2D array of floats
    const lookback = 4;
    console.log("features", features.length, 'forecastData', forecastData.length);
    const predictions = [];
    const session = await ort.InferenceSession.create("public/model.onnx");
    for (let i = lookback; i < features.length; i++) {
        const input2D = features.slice(i - lookback, i);
        // flat 2D array to 1D array
        const input = input2D.flat();
        const inputTensor = new ort.Tensor("float32", input, [1, lookback, 7]);
        // console.log("inputTensor", inputTensor);
        const feeds = { input: inputTensor };
        const output = await session.run(feeds);
        const outputData = output.output.data;
        // console.log("outputData", outputData);
        // return only last element of the output and round it to 2 decimal places
        const weightDiff = Math.round(outputData[outputData.length - 1] * 100) / 100;
        features[i][2] = features[i - 1][2] + weightDiff;
        predictions.push({
            timestamp: forecastData[i - lookback].timestamp,
            weightDiff: weightDiff,
            weight: features[i][2]
        });

    }

    return predictions;
}