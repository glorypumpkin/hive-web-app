'use client'
import useSWR from 'swr';
import { format, sub } from 'date-fns';
import { getDataWithDayAndHour } from './dateFiltering';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useLoadHiveData(dataRangeFormatted) {
    const url = `/api/fetch-hive-data?from=${dataRangeFormatted.from}&to=${dataRangeFormatted.to}`;
    const { data: weightDataFetched, error: errorWeight, isLoading: isLoadingWeight, isValidating: isValidatingWeight } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        keepPreviousData: true
    });
    const weightData = weightDataFetched ?? [];
    return weightData;
}

export function useLoadWeatherData(dataRangeFormatted, weatherDataNeeded) {
    const url = weatherDataNeeded ? `/api/weather-history?&from=${dataRangeFormatted.from}&to=${dataRangeFormatted.to}` : null;
    const { data: dataFromWeatherFetched, error, isLoading: isLoadindWeather, isValidating: isValidatingWeather } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        keepPreviousData: true
    });
    const dataFromWeather = dataFromWeatherFetched ?? [];
    return dataFromWeather;
}

export function useLoadComparisonData({ dateFrom, dateTo }, compareActive) {
    const dateFromYearAgo = sub(new Date(dateFrom), { years: 1 });
    const dateToYearAgo = sub(new Date(dateTo), { years: 1 });
    const dateFromYearAgoFormatted = format(dateFromYearAgo, 'yyyy-LL-dd');
    const dateToYearAgoFormatted = format(dateToYearAgo, 'yyyy-LL-dd');
    const url = compareActive ? `/api/fetch-hive-data?&from=${dateFromYearAgoFormatted}&to=${dateToYearAgoFormatted}` : null;
    const { data: dataToCompareFetched, error: errorComparisom, isLoading: isLoadingCompare } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        keepPreviousData: true
    });
    const dataToCompare = getDataWithDayAndHour(dataToCompareFetched ?? [], dateFromYearAgo, dateToYearAgo);
    return dataToCompare;
}

export function useLoadPredictionData(predictionActive) {
    const url = predictionActive ? '/api/prediction' : null;
    const { data: fetchedPrediction, error, isLoading } = useSWR(url, fetcher);
    const predictionDataLoaded = fetchedPrediction ?? [];
    const predictionData = predictionDataLoaded.map((data) => {
        const date = new Date(data.timestamp);
        const day = date.getDate() + '.' + (date.getMonth() + 1);
        const hour = date.getHours();
        const year = date.getFullYear();
        const weight = Math.round(data.weight * 100) / 100;
        return { day, hour, weight, timestamp: data.timestamp, year, weightDiff: data.weightDiff };
    });
    return predictionData;

}

export function useLoadForecast() {
    const { data: forecast, error, isLoading } = useSWR('/api/weather-forecast', fetcher, {
        refreshInterval: 60 * 60 * 1000
    });
    return { forecast, error, isLoading };
}