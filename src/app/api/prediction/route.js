import { getFeatures, getForecastData, getYesterdayData } from '@/lib/getPrediction';

// import ort, { InferenceSession, Tensor } from "onnxruntime-web";
const ort = require('onnxruntime-web');

// construct path based on cwd
const wasmPath = process.cwd() + "/public/wasm/";

ort.env.wasm.wasmPaths = wasmPath;
ort.env.logLevel = 'verbose';
ort.env.wasm.numThreads = 1;

export async function GET(request) {
    console.log("GET /api/prediction", wasmPath);
    // console.log("preparedData", preparedData.length);
    const result = await predict();
    // console.log("result", result);
    return new Response(JSON.stringify(result), {
        headers: {
            "content-type": "application/json",
        },
    });
}

async function predict() {
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