
// dataFromWeight: Array<{timestamp: number, ..}>
// dataFromWeather: Array<{timestamp: number, ...}>
export function dataComparison(dataFromWeight, dataFromWeather) {
    // two objects are already sorted by date
    // find the same dates
    // if the date is the same, merge the objects
    const merged = mergeSorted(dataFromWeight, dataFromWeather);
    console.log('dataFromWeight', dataFromWeight);
    console.log('dataFromWeather', dataFromWeather);
    // console.log('merged', merged);
    return merged;
}

// Source: https://stackoverflow.com/questions/18691627/how-to-merge-sorted-arrays-in-javascript
function mergeSorted(weights, weather) {
    var answer = [], i = 0, j = 0;
    while (i < weights.length && j < weather.length) {
        if (weights[i].timestamp === weather[j].timestamp) {
            console.log('same date')
            answer.push({ ...weights[i], ...weather[j] });
            i++;
            j++;
        } else if (weights[i].timestamp < weather[j].timestamp) {
            answer.push({ ...weights[i] });
            i++;
        } else {
            j++;
        }
    }

    return answer;
}