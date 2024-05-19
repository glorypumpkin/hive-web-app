// TODO: probably no need, delete later
import { useState, useEffect } from 'react';

const units = {
    weight: 'kg',
    temperature: 'celsius'
};

export function CustomDot(props) {

    const { cx, cy, payload, width: graphWidth, height: graphHeight, showDots, setShowDots, type } = props;
    const { day, hour, year, weight, temperature } = payload;
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
        // setShowDots(true);
        setInsideRect(false);
    }

    const dotDesign = (
        <g onMouseEnter={handleDotEnter}
            onMouseLeave={handleDotLeave}>
            <rect width="32" height="32" x={cx - 16} y={cy - 16} fillOpacity={0} />

            <circle cx={cx} cy={cy} r={5} fill={type === 'weight' ? '#8884d8' : '#82ca9d'}
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
        // setShowDots(true);
        setInsideTooltip(false);
    }

    const labelText = () => {
        if (type === 'weight') {
            return `${day} ${hour}, ${year}: ${weight} kg`
        } else if (type === 'temperature') {
            return `${day} ${hour}, ${year}: ${temperature} °C`
        }
    }

    return (
        <g>

            {
                showTooltip &&
                <foreignObject x={tooltipPosition.x} y={tooltipPosition.y} width={tooltipWidth} height={tooltipHeight}>
                    <div className="bg-[#1976d214] rounded-[15px] flex flex-col items-center font-sans" onMouseEnter={handleTooltipEnter}
                        onMouseLeave={handleTooltipLeave}
                    >
                        <p className="label text-sm">
                            {labelText()}
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