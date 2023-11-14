
export function getDateInterval(period) {
    // const periods = ['This day', '7 days', '21 days', 'Month', '1 cvartal', '2 cvartal', '3 cvartal', '4 cvartal', 'Year'];
    const now = new Date();
    const endDate = new Date();
    const firstOfJanuary = new Date(now.getFullYear(), 0, 1);
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    switch (period) {
        case 'This day':
            console.log(midnight);
            console.log(now);
            return {
                startDate: midnight,
                endDate: now
            };
        case '7 days':
            return {
                startDate: new Date(endDate.setDate(now.getDate() - 7)),
                endDate: now
            };
        case '21 days':
            return {
                startDate: new Date(endDate.setDate(now.getDate() - 21)),
                endDate: now
            };
        case 'Month':
            return {
                startDate: new Date(endDate.setDate(now.getDate() - 30)),
                endDate: now
            };
        case '1 cvartal':
            // return first 3 months of the year
            return {
                startDate: new Date(firstOfJanuary.setMonth(0)),
                endDate: new Date(firstOfJanuary.setMonth(3))
            };
        case '2 cvartal':
            // return second 3 months of the year
            return {
                startDate: new Date(firstOfJanuary.setMonth(3)),
                endDate: new Date(firstOfJanuary.setMonth(6))
            };
        case '3 cvartal':
            // return third 3 months of the year
            return {
                startDate: new Date(firstOfJanuary.setMonth(6)),
                endDate: new Date(firstOfJanuary.setMonth(9))
            };
        case '4 cvartal':
            // return fourth 3 months of the year
            return {
                startDate: new Date(firstOfJanuary.setMonth(9)),
                endDate: new Date(firstOfJanuary.setMonth(12))
            };
        case 'Year':
            console.log(now.getFullYear());
            console.log(now.getFullYear() - 1);
            console.log(new Date(endDate.setFullYear(now.getFullYear() - 1)));
            return {
                startDate: new Date(endDate.setFullYear(now.getFullYear() - 1)),
                endDate: now
            };
    }
}



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