
export function getDateInterval(period) {
    // const periods = ['This day', '7 days', '21 days', 'Month', '1 cvartal', '2 cvartal', '3 cvartal', '4 cvartal', 'Year'];
    const now = new Date();
    const endDate = new Date();
    const firstOfJanuary = new Date(now.getFullYear(), 0, 1);
    // const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const lastYear = new Date(now.getFullYear() - 1, 0, 1);
    const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 0, 0, 0);
    switch (period) {
        case 'This day':
            // TODO: fix this
            return {
                startDate: new Date(endDate.setDate(now.getDate() - 1, 0, 0, 0)),
                endDate: now
            };
        case '7 days':
            // console.log("weekAgo", weekAgo);
            return {
                startDate: weekAgo,
                endDate: now
            };
        case '21 days':
            return {
                startDate: new Date(endDate.setDate(now.getDate() - 21, 0, 0, 0)),
                endDate: now
            };
        case 'Month':
            return {
                startDate: new Date(endDate.setDate(now.getDate() - 30, 0, 0, 0)),
                endDate: now
            };
        case '1 kvartal':
            // return first 3 months of the year
            return {
                startDate: new Date(firstOfJanuary.setMonth(0)),
                endDate: new Date(firstOfJanuary.setMonth(3))
            };
        case '2 kvartal':
            // return second 3 months of the year
            // TODO: if there is no data for the second 3 months of the year, return first 3 months of the year
            if (now.getMonth() < 3) {
                return {
                    startDate: new Date(lastYear.setMonth(3)),
                    endDate: new Date(lastYear.setMonth(6))
                }
            } else {
                return {
                    startDate: new Date(firstOfJanuary.setMonth(3)),
                    endDate: new Date(firstOfJanuary.setMonth(6))
                }
            }

        case '3 kvartal':
            // return third 3 months of the year
            if (now.getMonth() < 6) {
                return {
                    startDate: new Date(lastYear.setMonth(6)),
                    endDate: new Date(lastYear.setMonth(9))
                }
            } else {
                return {
                    startDate: new Date(firstOfJanuary.setMonth(6)),
                    endDate: new Date(firstOfJanuary.setMonth(9))
                }
            }
        case '4 kvartal':
            // return fourth 3 months of the year
            if (now.getMonth() < 9) {
                return {
                    startDate: new Date(lastYear.setMonth(9)),
                    endDate: new Date(lastYear.setMonth(12))
                }
            } else {
                return {
                    startDate: new Date(firstOfJanuary.setMonth(9)),
                    endDate: new Date(firstOfJanuary.setMonth(12))
                }
            }
        case 'Year':
            // console.log(now.getFullYear());
            // console.log(now.getFullYear() - 1);
            // console.log(new Date(endDate.setFullYear(now.getFullYear() - 1)));
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
    const now = new Date();

    // Loop through the data and filter it based on the start and end date
    // If the date is between the start and end date, add it to the filteredData array
    for (let i = 0; i < data.length; i++) {
        if (data[i].timestamp >= startDateInMs && data[i].timestamp <= endDateInMs) {
            filteredData.push(data[i]);
        } // if there is no data for today yet, add last 4 entries to the filteredData array
        // else if (data[i].timestamp >= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime()) {
        //     filteredData.push(data[i]);
        // }
    }

    return filteredData;

}


export function getDataWithDayAndHour(data, dateFrom, dateTo) {
    const filterData = dateFiltering(data, dateFrom, dateTo);

    for (let dataPoint of filterData) {
        const date = new Date(dataPoint.timestamp);
        dataPoint.day = date.getDate() + '.' + (date.getMonth() + 1);
        dataPoint.hour = date.getHours() + ':00';
        dataPoint.year = date.getFullYear();
    }

    return filterData;
}

// oldestTimestamp: Date
// newestTimestamp: Date
// range: {from, to} or undefined
export function getRangeToDisplay(period, oldestTimestamp, newestTimestamp, range) {
    const dateInterval = getDateInterval(period);
    // Clamp dateInterval to data
    // Compare the first and last timestamp of the data to the dateInterval
    if (dateInterval.startDate < oldestTimestamp) {
        dateInterval.startDate = oldestTimestamp;
    }
    if (dateInterval.endDate > newestTimestamp) {
        dateInterval.endDate = newestTimestamp;
    }

    let dateFrom;
    let dateTo;
    if (range) {
        dateTo = range.to !== undefined ? new Date(range.to) : range.from;
        dateFrom = range.from;
    } else {
        dateFrom = dateInterval.startDate;
        dateTo = dateInterval.endDate;
    }

    return { dateFrom, dateTo };
}