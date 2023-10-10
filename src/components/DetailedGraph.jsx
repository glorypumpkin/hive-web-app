'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { useState } from 'react';


export default function DetailedGraph() {

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
        <ResponsiveContainer width={850} height={600}>
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
        <div className="bg-[rgba(224,_187,_55,_0.1)]">
            {renderLineChart}
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

