import { getFeatures } from '@/lib/getPrediction';

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
    return new Response(result)
}

async function predict() {
    const features = await getFeatures(); // 2D array of floats
    const lookback = 4;

    const predictions = [];
    const session = await ort.InferenceSession.create("public/model.onnx");
    for (let i = lookback; i < features.length; i++) {
        const input2D = features.slice(i - lookback, i);
        // flat 2D array to 1D array
        const input = input2D.flat();
        const inputTensor = new ort.Tensor("float32", input, [1, lookback, 7]);
        console.log("inputTensor", inputTensor);
        const feeds = { input: inputTensor };
        const output = await session.run(feeds);
        const outputData = output.output.data;
        console.log("outputData", outputData);
        // return only last element of the output and round it to 2 decimal places
        const weightDiff = Math.round(outputData[outputData.length - 1] * 100) / 100;
        predictions.push(weightDiff);
        features[i][2] = features[i - 1][2] + weightDiff;
        console.log("features", features[i]);
    }

    return predictions;
}