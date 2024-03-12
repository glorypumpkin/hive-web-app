'use client'

import { useState } from 'react';
import { Calendar } from './Calendar';
import { SelectGraphType } from './SelectGraphType';
import { HistoryLine } from './HistoryLine';
import { getRangeToDisplay, getDataWithDayAndHour } from '@/lib/dateFiltering';
import { NoteAreaGraph } from './NoteAreaGraph';
import Link from 'next/link'
import useSWR from 'swr';
import { format, sub } from 'date-fns';
import { dataComparison } from '@/lib/dataComparison';
import { useUserNotes } from '@/lib/useUserNotes';
import { MainGraph } from './MainGraph';
import { GraphExtra } from './GraphExtra';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DetailedGraph({ data }) {
    const [showDots, setShowDots] = useState(false);
    const [activeType, setActiveType] = useState(['weight']);
    const { allNotes, setAllNotes, deleteAllNotes } = useUserNotes();
    const [showTooltip, setShowTooltip] = useState(true);
    const [showDot, setShowDot] = useState(false);
    const [activePeriodButton, setActivePeriodButton] = useState("Year");
    const [activeShowButton, setActiveShowButton] = useState(false);
    const [range, setRange] = useState(undefined);
    const [compareActive, setCompareActive] = useState(false);
    // deleteAllNotes();

    const { dateFrom, dateTo } = getRangeToDisplay(activePeriodButton, new Date(data[0].timestamp), new Date(data[data.length - 1].timestamp), activeShowButton ? range : undefined);

    const dateFromFormatted = format(dateFrom, 'yyyy-LL-dd');
    const dateToFormatted = format(dateTo, 'yyyy-LL-dd');

    const weatherDataNeeded = activeType.includes('weather');

    const { data: dataFromWeather, error, isLoading } = useSWR(weatherDataNeeded ? `/api/weather-history?&from=${dateFromFormatted}&to=${dateToFormatted}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
    const weatherDataLoaded = dataFromWeather !== undefined

    //TODO: isLoadind and error handling
    const dataWithDayAndHour = getDataWithDayAndHour(data, dateFrom, dateTo);

    const dateFromYearAgo = sub(new Date(dateFrom), { years: 1 });
    const dateToYearAgo = sub(new Date(dateTo), { years: 1 });

    const dataToCompare = getDataWithDayAndHour(data, dateFromYearAgo, dateToYearAgo);
    console.log('dataToCompare', dataToCompare)

    const mergedData = (weatherDataNeeded && weatherDataLoaded) ? dataComparison(dataWithDayAndHour, dataFromWeather) : dataWithDayAndHour;

    return (
        <div className="-bg--primary-color flex w-[100vw] h-[100vh]">
            <NoteAreaGraph dateFrom={dateFrom} dateTo={dateTo} allNotes={allNotes} />
            <div className="flex flex-col gap-1">
                <GraphExtra setShowTooltip={setShowTooltip} setCompareActive={setCompareActive}></GraphExtra>
                <div style={{
                    width: '1300px',
                    height: '800px',
                }}>
                    <MainGraph relevantData={mergedData} activeMeasurements={activeType} showTooltip={showTooltip} showDot={showDot} showDots={showDots} setShowDots={setShowDots} dataToCompare={dataToCompare} compareActive={compareActive} />
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
                    <Calendar allNotes={allNotes} setAllNotes={setAllNotes} activeShowButton={activeShowButton} setActiveShowButton={setActiveShowButton} range={range} setRange={setRange}
                    ></Calendar>
                    <button className="shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)] flex flex-row gap-3 w-3/5 h-12 rounded-[50px] common-button">
                        <img
                            src="https://file.rendit.io/n/tCph0baGyDvCMUzNZVzt.svg"
                            className="w-6 shrink-0"
                        />
                        <div className="text-center text-xl font-sans font-semibold">
                            Add extra graph
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
