'use client'

import { useState } from 'react';
import { Calendar } from './Calendar';
import { SelectGraphType } from './SelectGraphType';
import { HistoryLine } from './HistoryLine';
import { getRangeToDisplay, getDataWithDayAndHour, getDateInterval } from '@/lib/dateFiltering';
import { NoteAreaGraph } from './NoteAreaGraph';
import Link from 'next/link'
import useSWR from 'swr';
import { format, sub } from 'date-fns';
import { dataComparison } from '@/lib/dataComparison';
import { MainGraph } from './MainGraph';
import { GraphExtra } from './GraphExtra';
// import { ExtraGraphs } from './ExtraGraphs';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DetailedGraph() {
    const [activeType, setActiveType] = useState(['weight']);
    const [showTooltip, setShowTooltip] = useState(true);
    const [activePeriodButton, setActivePeriodButton] = useState("Year");
    const [activeShowButton, setActiveShowButton] = useState(false);
    const [range, setRange] = useState(undefined);
    const [compareActive, setCompareActive] = useState(false);
    // const [extraGraphs, setExtraGraphs] = useState(false);
    // deleteAllNotes();

    const dataRange = activeShowButton ? range : getDateInterval(activePeriodButton);
    console.log('dataRange', dataRange)

    const dataRangeFormatted = {
        from: format(dataRange.from, 'yyyy-LL-dd'),
        to: format(dataRange.to, 'yyyy-LL-dd')
    }

    console.log('dataRangeFormatted', dataRangeFormatted)
    const url = `/api/fetch-hive-data?from=${dataRangeFormatted.from}&to=${dataRangeFormatted.to}`;
    console.log('url', url)

    const { data: weightDataFetched, error: errorWeight, isLoading: isLoadingWeight, isValidating: isValidatingWeight } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        keepPreviousData: true
    });
    // TODO: change to the right key
    const weatherDataNeeded = activeType.includes('weather');

    const { data: dataFromWeatherFetched, error, isLoading: isLoadindWeather, isValidating: isValidatingWeather } = useSWR(weatherDataNeeded ? `/api/weather-history?&from=${dataRangeFormatted.from}&to=${dataRangeFormatted.to}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        keepPreviousData: true
    });

    const weightData = weightDataFetched ?? [];
    const dataFromWeather = dataFromWeatherFetched ?? [];

    console.log('weightData', weightData)

    let dateFrom = dataRange.from;
    let dateTo = dataRange.to;

    if (weightData.length !== 0) {
        const filtered = getRangeToDisplay(activePeriodButton, new Date(weightData[0].timestamp), new Date(weightData[weightData.length - 1].timestamp), activeShowButton ? range : undefined);

        dateFrom = filtered.dateFrom;
        dateTo = filtered.dateTo;
    }

    const weatherDataLoaded = dataFromWeather !== undefined

    //TODO: isLoadind and error handling
    const dataWithDayAndHour = getDataWithDayAndHour(weightData, dateFrom, dateTo);

    const dateFromYearAgo = sub(new Date(dateFrom), { years: 1 });
    const dateToYearAgo = sub(new Date(dateTo), { years: 1 });
    const dateFromYearAgoFormatted = format(dateFromYearAgo, 'yyyy-LL-dd');
    const dateToYearAgoFormatted = format(dateToYearAgo, 'yyyy-LL-dd');

    const { data: dataToCompareFetched, error: errorComparisom, isLoading: isLoadingCompare } = useSWR(compareActive ? `/api/fetch-hive-data?&from=${dateFromYearAgoFormatted}&to=${dateToYearAgoFormatted}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        keepPreviousData: true
    });

    const dataToCompare = getDataWithDayAndHour(dataToCompareFetched ?? [], dateFromYearAgo, dateToYearAgo);
    // console.log('dataToCompare', dataToCompare)

    const mergedData = (weatherDataNeeded && weatherDataLoaded) ? dataComparison(dataWithDayAndHour, dataFromWeather) : dataWithDayAndHour;

    return (
        <div className="-bg--primary-color flex w-[100vw] h-[100vh]">
            <NoteAreaGraph dateFrom={dateFrom} dateTo={dateTo} />
            <div className="flex flex-col gap-1 overflow-visible">
                <GraphExtra setShowTooltip={setShowTooltip} setCompareActive={setCompareActive} showTooltip={showTooltip} compareActive={compareActive}></GraphExtra>
                <div style={{
                    width: '1300px',
                    height: '800px',
                }}>
                    <MainGraph relevantData={mergedData} activeMeasurements={activeType} showTooltip={showTooltip} dataToCompare={dataToCompare} compareActive={compareActive} />
                </div>
                <HistoryLine activePeriodButton={activePeriodButton} setActivePeriodButton={setActivePeriodButton} showTooltip={showTooltip} setActiveShowButton={setActiveShowButton} activeShowButton={activeShowButton}></HistoryLine>
            </div>
            <div className="flex flex-col gap-16 w-full items-center">
                <div className='flex flex-row w-full justify-end pt-1'>
                    <Link href="/dashboard" className=' bg-transparent h-12 rounded-[50px] common-button flex px-3'>
                        <img src="/dashboard-icon.png"
                            className='w-8 h-8 shrink-0'
                        />
                        {/* <a target="_blank" href="https://icons8.com/icon/sUJRwjfnGwbJ/dashboard-layout">Dashboard</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
                    </Link>
                    <Link href='/' className=' bg-transparent h-12 rounded-[50px] common-button  flex px-3'>
                        <img src="/home-icon.svg" className=' w-9 h-9 shrink-0' />
                    </Link>
                </div>
                <SelectGraphType activeType={activeType} setActiveType={setActiveType} ></SelectGraphType>
                <div className=" flex flex-col items-center gap-6">
                    <Calendar activeShowButton={activeShowButton} setActiveShowButton={setActiveShowButton} range={range} setRange={setRange}
                    ></Calendar>
                    {/* <ExtraGraphs setExtraGraphs={setExtraGraphs} extraGraphs={extraGraphs}></ExtraGraphs> */}
                </div>
            </div>
        </div>
    )
}
