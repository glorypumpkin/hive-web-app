
const APIForecast = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Czechia/next7days?unitGroup=metric&key=EH8QCN7D4JL5QY29BLLSEEGVA&contentType=json'
const APIHistory = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Czechia/2022-01-1/today?unitGroup=metric&include=days&key=EH8QCN7D4JL5QY29BLLSEEGVA&contentType=json'


export async function GET(request) {
    try {
        const response = await fetch(APIHistory, {
            method: "GET",
            headers: {}
        });

        const responseBody = await response.text();
        // console.log("responseBody", responseBody);

        try {
            const data = JSON.parse(responseBody);
            console.log("data", data);

            return new Response(JSON.stringify(data), {
                headers: { "Content-Type": "application/json" }
            });
        } catch (jsonError) {
            console.error("JSON parsing error", jsonError);
            return new Response("Invalid JSON in the response", { status: 500 });
        }
    } catch (fetchError) {
        console.error("Fetch error", fetchError);
        return new Response("Error fetching data from the API", { status: 500 });
    }
}