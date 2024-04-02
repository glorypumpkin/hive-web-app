import { prepareData } from '@/lib/getPrediction';

// import ort, { InferenceSession, Tensor } from "onnxruntime-web";
const ort = require('onnxruntime-web');

// construct path based on cwd
const wasmPath = process.cwd() + "/public/wasm/";

ort.env.wasm.wasmPaths = wasmPath;
ort.env.logLevel = 'verbose';
ort.env.wasm.numThreads = 1;

export async function GET(request) {
    console.log("GET /api/prediction", wasmPath);
    console.log('ort', ort);
    const session = await ort.InferenceSession.create("public/model.onnx");
    console.log("session created")
    const preparedData = await prepareData();
    console.log("preparedData", preparedData);
    const inputTensor = new ort.Tensor("float32", preparedData, [1, 4, 7]);
    console.log("inputTensor", inputTensor);
    const feeds = { input: inputTensor };
    const output = await session.run(feeds);
    console.log("output", output);
    return new Response(JSON.stringify(output), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}