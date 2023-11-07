'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { useState, useEffect } from 'react';
import { Calendar } from './Calendar';
import { CustomDot } from './CustomDot';
import { SelectGraphType } from './SelectGraphType';
import { HistoryLine } from './HistoryLine';
import { set } from 'date-fns';

const dataYear = [
    { month: 'January', weight: 2, temperature: 10 },
    { month: 'Februrary', weight: 16, temperature: 15 },
    { month: 'March', weight: 10, temperature: 20 },
    { month: 'April', weight: 15, temperature: 25 },
    { month: 'May', weight: 3, temperature: 30 },
    { month: 'June', weight: 5, temperature: 35 },
    { month: 'July', weight: 20, temperature: 40 },
    { month: 'August', weight: 16, temperature: 15 },
    { month: 'September', weight: 12, temperature: 20 },
    { month: 'October', weight: 15, temperature: 25 },
    { month: 'November', weight: 18, temperature: 30 },
    { month: 'December', weight: 20, temperature: 35 }];
// fix data!!!!

const dataWeek = [
    { day: 'Monday', weight: 2, temperature: 10 },
    { day: 'Tuesday', weight: 16, temperature: 15 },
    { day: 'Wednesday', weight: 10, temperature: 20 },
    { day: 'Thursday', weight: 15, temperature: 25 },
    { day: 'Friday', weight: 3, temperature: 30 },
    { day: 'Saturday', weight: 5, temperature: 35 },
    { day: 'Sunday', weight: 20, temperature: 40 }
];

const dataDay = [
    { hour: '00:00', weight: 2 },
    { hour: '06:00', weight: 16 },
    { hour: '12:00', weight: 10 },
    { hour: '18:00', weight: 15 }
];

const allNotesDefault = [
    { dateFrom: '2023-10-01', dateTo: '2023-10-04', color: 'red', noteText: 'note1' },
    { dateFrom: '2023-10-05', dateTo: '2023-10-07', color: 'green', noteText: 'note2' },
    { dateFrom: '2023-10-11', dateTo: '2023-10-13', color: 'blue', noteText: 'note4' }
]

const units = {
    weight: 'kg',
    temperature: 'celsius'
};

export default function DetailedGraph() {

    const [showDots, setShowDots] = useState(true);
    const [dataKeyXA, setDataKeyXA] = useState('month');
    const [hydrated, setHydrated] = useState(false);
    const [activeType, setActiveType] = useState(['weight']);
    const [allNotes, setAllNotes] = useState(allNotesDefault);
    const [showTooltip, setShowTooltip] = useState(true);
    const [showDot, setShowDot] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }

    let data;
    if (dataKeyXA === "month") {
        data = dataYear;
    } else if (dataKeyXA === "day") {
        data = dataWeek;
    } else if (dataKeyXA === "hour") {
        data = dataDay;
    }
    const customTooltip = ({ active, payload, label }) => {
        if (active) {
            // if showDots is false, hide tooltip
            if (!showDots) {
                return null;
            }
            else {
                return (
                    <div className="custom-tooltip">
                        <p>{`${label}`}</p>
                        {activeType.map((type, index) => (
                            <p key={index}>{`${type}: ${payload[0].payload[type]} ${units[type]}`}</p>
                        ))}
                    </div>
                );
            }
        }
    }

    const renderLineChart = (
        <LineChart
            id='detailed-graph'
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5
            }}
            width={1200} height={800}
        >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            {
                activeType.map((type, index) => (
                    <Line key={index} type="monotone" dataKey={type}
                        stroke={type === 'weight' ? '#8884d8' : '#82ca9d'}
                        dot={showDot ? <CustomDot showDots={showDots} setShowDots={setShowDots} type={type} /> : true} //TODO: change dot to the same style
                        yAxisId={units[type]} />
                ))
            }
            <XAxis dataKey={dataKeyXA} angle={-35} textAnchor="end" tick={{ fontSize: 14 }} />
            <YAxis yAxisId="kg" />
            <YAxis yAxisId="celsius" orientation="right" />
            {showTooltip && <Tooltip content={customTooltip} />}
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
        <div className=" bg-[rgba(25,118,210,0.08)] flex pt-10">
            <div className="flex flex-col gap-5 mt-3">
                {hydrated && renderLineChart}

                <HistoryLine setDataKeyXA={setDataKeyXA}></HistoryLine>
            </div>
            <div className='flex-col'>
                {/* <input type="checkbox" />
                <input type="checkbox" /> */}
                <button className=' bg-orange-200' onClick={onTooltipButtonClick}>Tooltip</button>
                <button className=' bg-orange-200' onClick={onDotButtonClick}>Dot</button>
            </div>
            <div className="flex flex-col gap-16 w-full items-center">
                <SelectGraphType activeType={activeType} setActiveType={setActiveType}></SelectGraphType>
                <div className=" flex flex-col gap-12 w-[377px] items-center">
                    <Calendar allNotes={allNotes} setAllNotes={setAllNotes}></Calendar>
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



