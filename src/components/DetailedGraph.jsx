'use client'
import { Brush, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Calendar } from './Calendar';
import { CustomDot } from './CustomDot';
import { SelectGraphType } from './SelectGraphType';
import { HistoryLine } from './HistoryLine';
import { dateFiltering, getDateInterval } from '@/lib/dateFiltering';
import { NoteAreaGraph } from './NoteAreaGraph';

const units = {
    weight: 'kg',
    temperature: 'celsius'
};

export default function DetailedGraph({ data }) {
    const [line, setLine] = useState(null);
    const [noteCoordinates, setNoteCoordinates] = useState({});
    const [showDots, setShowDots] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [activeType, setActiveType] = useState(['weight']);
    const [allNotes, setAllNotes] = useState([]);
    const [showTooltip, setShowTooltip] = useState(true);
    const [showDot, setShowDot] = useState(false);
    const [activePeriodButton, setActivePeriodButton] = useState("Year");


    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        const selectedLine = document.querySelector('.recharts-cartesian-grid-horizontal line:first-child')
        if (selectedLine != line) {
            setLine(selectedLine);
        }
    });


    if (!hydrated) {
        return null;
    }

    console.log('line');
    console.dir(line);
    let notesParent = null;
    if (line) {
        const x1 = line.getAttribute('x1');
        const y1 = line.getAttribute('y1');
        const x2 = line.getAttribute('x2');
        const y2 = line.getAttribute('y2');
        const coordinates = { x1, y1, x2, y2 };
        console.log('coordinates', coordinates);
        if (coordinates.x1 !== noteCoordinates.x1 || coordinates.y1 !== noteCoordinates.y1 || coordinates.x2 !== noteCoordinates.x2 || coordinates.y2 !== noteCoordinates.y2) {
            setNoteCoordinates(coordinates);
        }
        notesParent = line.parentElement;
    }

    const dateInterval = getDateInterval(activePeriodButton);

    // Clamp dateInterval to data
    const mostRecentDataDate = new Date(data[0].timestamp);
    const oldestDataDate = new Date(data[data.length - 1].timestamp);
    if (dateInterval.startDate < oldestDataDate) {
        dateInterval.startDate = oldestDataDate;
    }
    if (dateInterval.endDate > mostRecentDataDate) {
        dateInterval.endDate = mostRecentDataDate;
    }

    const dateFrom = dateInterval.startDate;
    const dateTo = dateInterval.endDate;
    const filterData = dateFiltering(data, dateFrom, dateTo);
    console.log('dateFrom', dateFrom);
    console.log('dateTo', dateTo);
    const dataWithDayAndHour = filterData.map((item) => {
        const date = new Date(item.timestamp);
        const day = date.getDate() + '.' + (date.getMonth() + 1);
        const hour = date.getHours() + ':00';
        const year = date.getFullYear();
        return { ...item, day, hour, year };
    })

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
        type === 'weight' || type === 'temperature' || type === 'weather' ? (
            <Line
                key={index}
                type="monotone"
                dataKey={type} //dataKey is used to set the data to the right type (weight, temperature or weather)
                stroke={type === 'weight' ? '#8884d8' : '#82ca9d'}
                dot={showDot ? <CustomDot showDots={showDots} setShowDots={setShowDots} type={type} /> : false}
                // if showDot is true, show dot
                yAxisId={units[type]}
            />
        ) : console.log('type', type)

    ));


    const renderLineChart = (
        <ComposedChart
            id='detailed-graph'
            data={dataWithDayAndHour} //the data prop gets the data from the dataWithDayAndHour array, which is filtered by date
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
            <XAxis dataKey='timestamp' angle={-35} textAnchor="end" reversed scale={'linear'} tick={<CustomTick />} />
            <YAxis yAxisId="kg" domain={['dataMin-1', 'dataMax+1']} />
            {/* yAxisId is used to set y-axis to the right values (kg or celsius) */}
            {/* domain is used to set the range of the y-axis */}
            <YAxis yAxisId="celsius" orientation="right" domain={['dataMin-1', 'dataMax+1']} />
            {showTooltip && <Tooltip content={customTooltip} />}
            {/* if showTooltip is true, show tooltip */}
            <Legend />
        </ComposedChart>

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
        <div className=" bg-[rgba(25,118,210,0.08)] flex pt-2">
            <div className="flex flex-col gap-5">
                <div className='flex flex-row gap-2 pl-3 items-center pt-1'>
                    <button className=' bg-orange-200' onClick={onTooltipButtonClick}>Tooltip</button>
                    <button className=' bg-orange-200' onClick={onDotButtonClick}>Dot</button>
                    <button className='bg-orange-200'>Statistic</button>
                    <button className='bg-orange-200'>Normal</button>
                </div>
                {hydrated && renderLineChart}
                {notesParent && createPortal(<NoteAreaGraph noteCoordinates={noteCoordinates} dateFrom={dateFrom} dateTo={dateTo} allNotes={allNotes} />, notesParent)}
                <HistoryLine activePeriodButton={activePeriodButton} setActivePeriodButton={setActivePeriodButton}></HistoryLine>
            </div>
            <div className="flex flex-col gap-16 w-full items-center pt-10">
                <SelectGraphType activeType={activeType} setActiveType={setActiveType} ></SelectGraphType>
                <div className=" flex flex-col gap-12 w-[377px] items-center">
                    <Calendar allNotes={allNotes} setAllNotes={setAllNotes}
                    ></Calendar>
                    <button className="shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)] overflow-hidden bg-[rgba(25,_118,_210,_0.08)] flex flex-row justify-center gap-3 w-3/5 h-12 shrink-0 items-center rounded-[50px] hover:bg-[#3877b53b] cursor-pointer">
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
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                {d}
            </text>
        </g>
    );
}

