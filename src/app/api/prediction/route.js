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
    const inputTensor = new ort.Tensor("float32", new Float32Array(5 * 4), [5, 4]);
    const feeds = { input: inputTensor };
    const output = await session.run(feeds);
    console.log("output", output);
    return new Response(JSON.stringify(output), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}