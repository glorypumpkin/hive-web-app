'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { useState, useEffect } from 'react';
import Calendar from './Calendar';

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

export default function DetailedGraph() {

    const periods = ['This day', '7 days', '21 days', 'Month', '1 cvartal', '2 cvartal', '3 cvartal', '4 cvartal', 'Year'];
    const [showDots, setShowDots] = useState(true);
    const [dataKeyXA, setDataKeyXA] = useState('month');
    const [dataKeyYA, setDataKeyYA] = useState('weight');
    const [hydrated, setHydrated] = useState(false);
    const [data, setData] = useState(dataYear);
    const [activeType, setActiveType] = useState([]);


    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }


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
            <Line type="monotone" dataKey={dataKeyYA} stroke="#8884d8" dot={<CustomDot showDots={showDots} setShowDots={setShowDots} />} /> {/*TODO: add more smooth line animation when changing types*/}
            {console.log('i work')}
            <XAxis dataKey={dataKeyXA} angle={-35} textAnchor="end" tick={{ fontSize: 14 }} />
            <YAxis />
            <Legend />
        </LineChart>

    );


    function OnPeriodClicked(period) {

        if (period === 'This day') {
            setData(dataDay);
            setDataKeyXA('hour');
        }
        else if (period === '7 days') {
            setData(dataWeek);
            setDataKeyXA('day');
            console.log('clicked');
        }
        else if (period === 'Year') {
            setData(dataYear);
            setDataKeyXA('month');
        }
        // else if (period === '21 days') {
        //     setData(dataWeek);
        //     setDataKeyXA('day');
        // }
        // else if (period === 'Month') {
        //     setData(dataWeek);
        //     setDataKeyXA('day');
        // }
        // else if (period === '1 cvartal') {
        //     setData(dataWeek);
        //     setDataKeyXA('day');
        //     setDataKeyYA('weight');
        // }

    }

    const historyLine = (
        <div className="shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)] overflow-hidden flex flex-row mx-2 rounded-[50px] h-16">
            {periods.map((period, index) => (
                <div key={index} className="history-container">
                    <button className="font-sans font-light"
                        onClick={() => OnPeriodClicked(period)}
                    >{period}</button>
                </div>
            ))}
        </div>
    )

    function TypeButton({ type, onTypeClicked }) {

        return (
            <div className="graph-checkbox">
                <button className={"type-button " + (activeType.includes(type) ? 'bg-black' : '')} //TODO: default the weight button is active
                    onClick={() => { onTypeClicked(type) }
                    }
                ></button>
                <div className="font-sans font-light">{type}</div>
            </div>
        )
    }

    function onTypeClicked(type) {
        if (activeType.includes(type)) {
            // If the clicked button is already active, deactivate it
            setActiveType(activeType.filter((active) => active !== type));
        } else {
            // Otherwise, activate the button
            setActiveType([...activeType, type]);
        }
        console.log(activeType);
        // Handle other logic based on the selected type here
        if (type === 'Weight') {
            setDataKeyYA('weight');
        } else if (type === 'Temperature') {
            setDataKeyYA('temperature');
        } else if (type === 'Weather') {
            console.log('clicked Weather');
        }

    }

    return (
        <div className=" bg-[rgba(25,_118,_210,_0.08)] flex pt-10">
            <div className="flex flex-col gap-5 mt-3">
                {hydrated && renderLineChart}
                {historyLine}
            </div>
            <div className="flex flex-col gap-16 w-full items-center">
                <div className="flex flex-col gap-6 w-[250px]">
                    <div className="text-center text-xl font-sans font-semibold">
                        Select graph type
                    </div>
                    <div className="graph-type-container shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)]">
                        {['Weight', 'Temperature', 'Weather'].map((type, index) => (
                            <TypeButton key={index} type={type} onTypeClicked={onTypeClicked} />
                        ))}
                    </div>
                </div>
                <div className=" flex flex-col gap-12 w-[377px] items-center">
                    <div className="self-stretch flex flex-col gap-4 items-center">
                        <div className="text-center text-xl font-sans font-semibold">
                            Select needed date or interval
                        </div>
                        <Calendar></Calendar>
                    </div>
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

export function CustomDot(props) {

    const { cx, cy, payload, width: graphWidth, height: graphHeight, showDots, setShowDots } = props;
    const { month, weight } = payload;
    const tooltipWidth = 160;
    const tooltipHeight = 100;

    const renderLeft = cx + tooltipWidth > graphWidth; //add padding later
    const renderBottom = cy + tooltipHeight > graphHeight; //add padding later

    const [insideRect, setInsideRect] = useState(false);
    const [insideTooltip, setInsideTooltip] = useState(false);
    const [note, setNote] = useState('');

    const showTooltip = insideRect || insideTooltip;
    const showDot = showDots || showTooltip;

    const handleDotEnter = () => {
        setShowDots(false);
        setInsideRect(true);
        console.log(payload);
        for (let i = 0; i < payload.weight; i++) {
            console.log('a');
        } // TODO: add arrows to show weight change
    }

    const handleDotLeave = () => {
        setShowDots(true);
        setInsideRect(false);
    }

    const dotDesign = (
        <g onMouseEnter={handleDotEnter}
            onMouseLeave={handleDotLeave}>
            <rect width="32" height="32" x={cx - 16} y={cy - 16} fillOpacity={0} />

            <circle cx={cx} cy={cy} r={5} fill="#8884d8"
                // fillOpacity={showDot ? 1 : 0}
                className={'duration-200 ease-in-out transition-opacity ' + (showDot ? 'opacity-100' : 'opacity-0')}
            />

        </g>
    )



    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    let tooltipPosition;

    if (renderLeft && renderBottom) {
        tooltipPosition = { x: cx - tooltipWidth, y: cy - tooltipHeight }
    } else if (renderLeft) {
        tooltipPosition = { x: cx - tooltipWidth, y: cy }
    } else if (renderBottom) {
        tooltipPosition = { x: cx, y: cy - tooltipHeight }
    } else {
        tooltipPosition = { x: cx, y: cy }
    }

    const handleTooltipEnter = () => {
        setShowDots(false);
        setInsideTooltip(true);
    }

    const handleTooltipLeave = () => {
        setShowDots(true);
        setInsideTooltip(false);
    }

    return (
        <g>

            {
                showTooltip &&
                <foreignObject x={tooltipPosition.x} y={tooltipPosition.y} width={tooltipWidth} height={tooltipHeight}>
                    <div className="bg-[#1976d214] rounded-[15px] flex flex-col items-center font-sans font-light" onMouseEnter={handleTooltipEnter}
                        onMouseLeave={handleTooltipLeave}
                    >
                        <p className="label">
                            {month} {weight} kg {/*fix how label shows data */}
                        </p>

                        <textarea
                            value={note}
                            placeholder='Add a note...'
                            onChange={handleNoteChange}
                            className="w-full"
                        ></textarea>
                        <button>Save</button>

                    </div>
                </foreignObject>
            }
            {dotDesign}
        </g>

    )
}

