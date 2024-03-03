'use client'
import { Brush, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart } from 'recharts';
import { useState, useEffect, useRef } from 'react';
import { Calendar } from './Calendar';
import { CustomDot } from './CustomDot';
import { SelectGraphType } from './SelectGraphType';
import { HistoryLine } from './HistoryLine';
import { dateFiltering, getDateInterval, getDataWithDayAndHour } from '@/lib/dateFiltering';
import { NoteAreaGraph } from './NoteAreaGraph';
import { getSortedData } from '@/lib/dataComparison';
import Link from 'next/link'
import useSWR from 'swr';
import { format } from 'date-fns';
import { dataComparison } from '@/lib/dataComparison';
import { da, is } from 'date-fns/locale';

const units = {
    weight: 'kg',
    temperature: 'celsius',
    weather: 'celsius'
};

const strokeColors = {
    weight: '#8884d8',
    temperature: '#82ca9d',
    weather: '#ff7300'
};

const fetcher = (url) => fetch(url).then((res) => res.json());

function useUserNotes() {
    const [allNotes, setAllNotes] = useState([]);
    // Fetch notes from the server
    useEffect(() => {
        // This function is used for async/await syntax
        async function fetchNotes() {
            const response = await fetch('/api/notes');
            const data = await response.json();
            setAllNotes(data);
        }
        fetchNotes();
    }, []);

    const setNotesAndPersist = (notes) => {
        setAllNotes(notes);
        fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notes)
        });
    }

    const deleteAllNotes = () => {
        setAllNotes([]);
        fetch('/api/notes', {
            method: 'DELETE'
        });
    }

    return { allNotes, setAllNotes: setNotesAndPersist, deleteAllNotes };
}

export default function DetailedGraph({ data }) {


    const [showDots, setShowDots] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [activeType, setActiveType] = useState(['weight']);
    const { allNotes, setAllNotes, deleteAllNotes } = useUserNotes();
    const [showTooltip, setShowTooltip] = useState(true);
    const [showDot, setShowDot] = useState(false);
    const [activePeriodButton, setActivePeriodButton] = useState("Year");
    const [activeShowButton, setActiveShowButton] = useState(false);
    const [range, setRange] = useState();
    // deleteAllNotes();

    useEffect(() => {
        setHydrated(true);
    }, []);



    const dateInterval = getDateInterval(activePeriodButton);

    // Clamp dateInterval to data
    const oldestDataDate = new Date(data[0].timestamp);
    const mostRecentDataDate = new Date(data[data.length - 1].timestamp);
    if (dateInterval.startDate < oldestDataDate) {
        dateInterval.startDate = oldestDataDate;
    }
    if (dateInterval.endDate > mostRecentDataDate) {
        dateInterval.endDate = mostRecentDataDate;
    }

    let dateFrom;
    let dateTo;
    if (activeShowButton) {
        dateTo = range.to !== undefined ? new Date(range.to) : range.from;
        dateFrom = range.from;
    } else {
        dateFrom = dateInterval.startDate;
        dateTo = dateInterval.endDate;
    }

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

    if (!hydrated) {
        return null;
    }
    const dataWithDayAndHour = getDataWithDayAndHour(data, dateFrom, dateTo);
    const mergedData = (weatherDataNeeded && weatherDataLoaded) ? dataComparison(dataWithDayAndHour, dataFromWeather) : dataWithDayAndHour;

    const customTooltip = ({ active, payload, label }) => {
        if (active) {
            // if showDots is false, hide tooltip
            if (!showDots && !showTooltip) {
                return null;
            }
            else {
                return (
                    <div className="custom-tooltip">
                        <p>{`${payload[0].payload.day}, ${payload[0].payload.hour}, ${payload[0].payload.year}`}</p>
                        {activeType.map((type, index) => (
                            <p key={index}>{`${type}: ${payload[0].payload[type]} ${units[type]}`}</p>
                        ))}
                    </div>
                );
            }
        }
    }

    const graphType = activeType.map((type, index) => (
        <Line
            key={index}
            type="monotone"
            dataKey={type} //dataKey is used to set the data to the right type (weight, temperature or weather)
            stroke={strokeColors[type]}
            dot={showDot ? <CustomDot showDots={showDots} setShowDots={setShowDots} type={type} /> : false}
            // if showDot is true, show dot
            yAxisId={units[type]}
            connectNulls
        />
    ));

    //TODO: find a problem with graph going out of bounds
    const renderLineChart = (
        <LineChart
            id='detailed-graph'
            data={mergedData} //the data prop gets the data from the dataWithDayAndHour array, which is filtered by date
            margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5
            }}
            width={1300} height={800}
        >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            {graphType}
            {/* the right graph type is rendered based on the activeType state, which is set by the user */}
            <XAxis dataKey='timestamp' angle={-35} textAnchor="end" scale={'linear'} tick={<CustomTick />} />
            <YAxis yAxisId="kg" domain={['dataMin-1', 'dataMax+1']} />
            {/* yAxisId is used to set y-axis to the right values (kg or celsius) */}
            {/* domain is used to set the range of the y-axis */}
            <YAxis yAxisId="celsius" orientation="right" domain={['dataMin-1', 'dataMax+1']} />
            {showTooltip && <Tooltip content={customTooltip} />}
            {/* if showTooltip is true, show tooltip */}
            <Legend />
        </LineChart>

    );

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
                {hydrated && renderLineChart}
                <HistoryLine activePeriodButton={activePeriodButton} setActivePeriodButton={setActivePeriodButton}></HistoryLine>
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

const CustomTick = (props) => {
    const { x, y, payload } = props;
    const date = new Date(payload.value);
    const d = `${date.getDate()}.${date.getMonth() + 1}`
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={10} textAnchor="end" fill="#666" transform="rotate(-25)">
                {d}
            </text>
        </g>
    );
}

