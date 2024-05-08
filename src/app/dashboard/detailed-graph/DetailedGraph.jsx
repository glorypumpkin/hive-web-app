'use client'

import { useState, useEffect } from 'react';
import { Calendar } from './Calendar';
import { SelectGraphType } from './SelectGraphType';
import { HistoryLine } from './HistoryLine';
import { getRangeToDisplay, getDataWithDayAndHour, getDateInterval } from '@/lib/dateFiltering';
import { NoteAreaGraph } from './NoteAreaGraph';
import Link from 'next/link'
import { format } from 'date-fns';
import { dataComparison } from '@/lib/dataComparison';
import { MainGraph } from './MainGraph';
import { GraphExtra } from './GraphExtra';
import { useLoadHiveData, useLoadWeatherData, useLoadComparisonData, useLoadPredictionData } from '@/lib/dataLoaders';

export default function DetailedGraph() {
    const [activeType, setActiveType] = useState(['weight']);
    const [showTooltip, setShowTooltip] = useState(true);
    const [activePeriodButton, setActivePeriodButton] = useState("Rok");
    const [activeShowButton, setActiveShowButton] = useState(false);
    const [range, setRange] = useState(undefined);
    const [compareActive, setCompareActive] = useState(false);
    const [predictionActive, setPredictionActive] = useState(false);
    const [isNoteActive, setIsNoteActive] = useState(true);
    // deleteAllNotes();

    const dataRange = activeShowButton ? range : getDateInterval(activePeriodButton);

    console.log('dataRange', dataRange)

    let dataRangeFormatted;
    if (dataRange.from === undefined) {
        dataRangeFormatted = {
            from: format(dataRange.to, 'yyyy-LL-dd'),
            to: format(dataRange.to, 'yyyy-LL-dd')
        }
    } else if (dataRange.to === undefined) {
        dataRangeFormatted = {
            from: format(dataRange.from, 'yyyy-LL-dd'),
            to: format(dataRange.from, 'yyyy-LL-dd')
        }
    } else {
        dataRangeFormatted = {
            from: format(dataRange.from, 'yyyy-LL-dd'),
            to: format(dataRange.to, 'yyyy-LL-dd')
        }
    }

    const weightData = useLoadHiveData(dataRangeFormatted)

    // TODO: change to the right key
    const weatherDataNeeded = activeType.includes('weather');

    const dataFromWeather = useLoadWeatherData(dataRangeFormatted, weatherDataNeeded);

    console.log('weightData', weightData)

    let dateFrom = dataRange.from;
    let dateTo = dataRange.to;

    if (weightData.length !== 0) {
        const filtered = getRangeToDisplay(activePeriodButton, new Date(weightData[0].timestamp), new Date(weightData[weightData.length - 1].timestamp), activeShowButton ? range : undefined);

        dateFrom = filtered.dateFrom;
        dateTo = filtered.dateTo;
    }

    const weatherDataLoaded = dataFromWeather !== undefined

    const dataToCompare = useLoadComparisonData({ dateFrom, dateTo }, compareActive);
    const predictionData = useLoadPredictionData(predictionActive);
    const dataWithDayAndHour = getDataWithDayAndHour(weightData, dateFrom, dateTo);


    const mergedData = (weatherDataNeeded && weatherDataLoaded) ? dataComparison(dataWithDayAndHour, dataFromWeather) : dataWithDayAndHour;

    return (
        <div className="-bg--primary-color flex xl:flex-col-reverse min-h-screen gap-10">
            <NoteAreaGraph dateFrom={dateFrom} dateTo={dateTo} isNoteActive={isNoteActive} />
            <div className="flex flex-col gap-1 overflow-visible flex-grow pb-2">
                <GraphExtra setShowTooltip={setShowTooltip} setCompareActive={setCompareActive} showTooltip={showTooltip} compareActive={compareActive} predictionActive={predictionActive} setPredictionActive={setPredictionActive} isNoteActive={isNoteActive} setIsNoteActive={setIsNoteActive}></GraphExtra>
                <div
                    className='w-full flex-grow'

                >
                    <MainGraph relevantData={mergedData} activeMeasurements={activeType} showTooltip={showTooltip} dataToCompare={dataToCompare} compareActive={compareActive} predictionActive={predictionActive} predictionData={predictionData} />
                </div>
                <HistoryLine activePeriodButton={activePeriodButton} setActivePeriodButton={setActivePeriodButton} showTooltip={showTooltip} setActiveShowButton={setActiveShowButton} activeShowButton={activeShowButton}></HistoryLine>
            </div>
            <div className="flex flex-col gap-10 items-center pr-10">
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
                </div>
            </div>
        </div>
    )
}


