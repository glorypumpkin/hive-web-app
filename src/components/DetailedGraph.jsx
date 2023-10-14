'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { useState } from 'react';
import Calendar from './Calendar';

export default function DetailedGraph() {

    const periods = ['This day', '7 days', '21 days', 'Month', '1 cvartal', '2 cvartal', '3 cvartal', '4 cvartal', 'Year'];
    const [showDots, setShowDots] = useState(true);

    const data = [
        { month: 'January', weight: 2 },
        { month: 'Februrary', weight: 16 },
        { month: 'March', weight: 10 },
        { month: 'April', weight: 15 },
        { month: 'May', weight: 3 },
        { month: 'June', weight: 5 },
        { month: 'July', weight: 20 },
        { month: 'August', weight: 16 },
        { month: 'September', weight: 12 },
        { month: 'October', weight: 15 },
        { month: 'November', weight: 18 },
        { month: 'December', weight: 20 }];

    const renderLineChart = (
        <ResponsiveContainer width={1200} height={750}>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: 5
                }}
            >
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" dot={<CustomDot showDots={showDots} setShowDots={setShowDots} />} />
                <XAxis dataKey="month" angle={-35} textAnchor="end" tick={{ fontSize: 14 }} />
                <YAxis dataKey="weight" />
                <Legend />
                {/* <Tooltip content={<CustomTooltip />} /> */}
            </LineChart>
        </ResponsiveContainer>
    );



    return (
        <div className=" bg-[rgba(25,_118,_210,_0.08)] flex pt-10">
            <div className="flex flex-col gap-5 mt-6">
                {renderLineChart}
                <div className="shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)] overflow-hidden flex flex-row mx-2 rounded-[50px] h-16">
                    {periods.map((period, index) => (
                        <div key={index} className="history-container">
                            <button className="font-sans font-light">{period}</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-16 w-full items-center">
                <div className="flex flex-col gap-6 w-[250px]">
                    <div className="text-center text-xl font-sans font-semibold">
                        Select graph type
                    </div>
                    <div className="graph-type-container shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)]">
                        {['Weight', 'Temperature', 'Weather'].map((type, index) => (
                            <div key={index} className="graph-checkbox">
                                <button className="type-button"></button>
                                <div className="font-sans font-light">{type}</div>
                            </div>
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
    console.log(props);
    const { cx, cy, value, label, payload, width: graphWidth, height: graphHeight, showDots, setShowDots } = props;
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
                    <div className="bg-gray-400 rounded-lg" onMouseEnter={handleTooltipEnter}
                        onMouseLeave={handleTooltipLeave}
                    >
                        <p className="label">{`${month} : ${weight}kg`}</p>
                        <div>
                            <textarea
                                value={note}
                                placeholder='Add a note...'
                                onChange={handleNoteChange}
                                className="w-full"
                            ></textarea>
                            <button>Save</button>
                        </div>
                    </div>
                </foreignObject>
            }
            {dotDesign}
        </g>

    )
}

