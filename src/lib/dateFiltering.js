
// This function will filter the data based on the start and end date
export function dateFiltering(data, startDate, endDate) {

    let filteredData = [];

    // Convert the start and end date to milliseconds
    const startDateInMs = startDate.getTime();
    const endDateInMs = endDate.getTime();

    // Loop through the data and filter it based on the start and end date
    for (let i = 0; i < data.length; i++) {
        if (data[i].timestamp >= startDateInMs && data[i].timestamp <= endDateInMs) {
            filteredData.push(data[i]);
        }
    }

    return filteredData;

}