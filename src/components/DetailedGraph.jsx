'use client'

import { useState } from 'react';
import { Calendar } from './Calendar';
import { SelectGraphType } from './SelectGraphType';
import { HistoryLine } from './HistoryLine';
import { getRangeToDisplay, getDataWithDayAndHour } from '@/lib/dateFiltering';
import { NoteAreaGraph } from './NoteAreaGraph';
import Link from 'next/link'
import useSWR from 'swr';
import { format } from 'date-fns';
import { dataComparison } from '@/lib/dataComparison';
import { useUserNotes } from '@/lib/useUserNotes';
import { MainGraph } from './MainGraph';

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
    const mergedData = (weatherDataNeeded && weatherDataLoaded) ? dataComparison(dataWithDayAndHour, dataFromWeather) : dataWithDayAndHour;

    const onTooltipButtonClick = () => {
        setShowTooltip(true);
        setShowDot(false);
    }

    const onDotButtonClick = () => {
        setShowTooltip(false);
        setShowDot(true);
    }

    return (
        <div className="-bg--primary-color flex pt-2 w-[100vw] h-[100vh]">
            <NoteAreaGraph dateFrom={dateFrom} dateTo={dateTo} allNotes={allNotes} />
            <div className="flex flex-col gap-5">
                <div className='flex flex-row gap-2 pl-3 items-center pt-1'>
                    <button className=' bg-orange-200' onClick={onTooltipButtonClick}>Tooltip</button>
                    <button className=' bg-orange-200' onClick={onDotButtonClick}>Dot</button>
                    <button className='bg-orange-200'>Statistic</button>
                    <button className='bg-orange-200'>Normal</button>
                    <button className='bg-orange-200'>Notes ON/OFF</button>
                    <button className='bg-orange-200'>Comparison</button>
                </div>
                <div style={{
                    width: '1300px',
                    height: '800px',
                }}>
                    <MainGraph relevantData={mergedData} activeMeasurements={activeType} showTooltip={showTooltip} showDot={showDot} showDots={showDots} setShowDots={setShowDots} />
                </div>
                <HistoryLine activePeriodButton={activePeriodButton} setActivePeriodButton={setActivePeriodButton} showTooltip={showTooltip}></HistoryLine>
            </div>
            <div className="flex flex-col gap-16 w-full items-center">
                <div className='flex flex-row w-full justify-end'>
                    <Link href="/dashboard" className=' bg-transparent h-12 rounded-[50px] common-button flex px-3'>
                        <img src="/dashboard-icon.png"
                            className='w-8 shrink-0'
                        />
                        {/* <a target="_blank" href="https://icons8.com/icon/sUJRwjfnGwbJ/dashboard-layout">Dashboard</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
                    </Link>
                    <Link href='/' className=' bg-transparent h-12 rounded-[50px] common-button  flex px-3'>
                        <img src="/home-icon.svg" className=' w-9 shrink-0' />
                    </Link>
                </div>
                <SelectGraphType activeType={activeType} setActiveType={setActiveType} ></SelectGraphType>
                <div className=" flex flex-col gap-12 items-center">
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
