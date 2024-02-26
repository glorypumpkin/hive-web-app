

export async function getSortedData(from, to) {

    try {
        const response = await fetch(`/api/weather-history?&from=${from}&to=${to}`);

        console.log('response', response);
        if (response.ok) {
            const data = await response.json();
            // console.log('data', data);
            return data;
        } else {
            throw new Error("Error fetching data from the API");
        }
    } catch (fetchError) {
        console.error("Fetch error", fetchError);
    }
}



export function dataComparison({ dataFromWeight, dataFromWeather }) {
    // two objects are already sorted by date
    // find the same dates
    // if the date is the same, merge the objects
}