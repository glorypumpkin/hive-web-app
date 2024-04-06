import { predict } from '@/lib/getPrediction';

export async function GET(request) {
    // console.log("GET /api/prediction", wasmPath);
    // console.log("preparedData", preparedData.length);
    const result = await predict();
    // console.log("result", result);
    return new Response(JSON.stringify(result), {
        headers: {
            "content-type": "application/json",
        },
    });
}

