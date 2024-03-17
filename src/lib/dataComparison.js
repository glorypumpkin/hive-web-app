
// dataFromWeight: Array<{timestamp: number, ..}>
// dataFromWeather: Array<{timestamp: number, ...}>

// Source: https://stackoverflow.com/questions/18691627/how-to-merge-sorted-arrays-in-javascript
export function dataComparison(weights, weather) {
    // two objects are already sorted by date
    // find the same dates
    // if the date is the same, merge the objects
    var answer = [], i = 0, j = 0;
    while (i < weights.length || j < weather.length) {
        const iStamp = weights[i]?.timestamp;
        const jStamp = weather[j]?.timestamp;
        if (iStamp !== undefined && jStamp !== undefined) {
            if (iStamp === jStamp) {
                console.log('same date')

                answer.push({ ...weights[i], ...weather[j] });
                i++;
                j++;

            } else if (iStamp < jStamp) {
                answer.push({ ...weights[i] });
                i++;
            } else {
                answer.push({ ...weather[j] });
                j++;
            }
            continue;
        }

        if (iStamp !== undefined) {
            answer.push({ ...weights[i] });
            i++;
        }

        if (jStamp !== undefined) {
            answer.push({ ...weather[j] });
            j++;
        }
    }

    console.log('after merge', answer)
    return answer;
}