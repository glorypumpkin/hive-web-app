import { Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart } from 'recharts';
import { useState, useEffect } from 'react';
import { CustomTooltip } from './CustomTooltip';
import { CustomDot } from './CustomDot';

export function MainGraph({ relevantData, activeMeasurements, showDot, showDots, setShowDots, showTooltip }) {

    // Do not render on the server
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }

    const graphLines = activeMeasurements.map((type, index) => (
        <Line
            key={type}
            type="monotone"
            dataKey={type} //dataKey is used to set the data to the right type (weight, temperature or weather)
            stroke={strokeColors[type]}
            dot={showDot ? <CustomDot showDots={showDots} setShowDots={setShowDots} type={type} /> : false}
            // if showDot is true, show dot
            yAxisId={units[type]}
            connectNulls
        />
    ));

    return (
        <LineChart
            id='detailed-graph'
            data={relevantData} //the data prop gets the data from the dataWithDayAndHour array, which is filtered by date
            margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5
            }}
            width={1300} height={800}
        >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            {graphLines}
            {/* the right graph type is rendered based on the activeType state, which is set by the user */}
            <XAxis dataKey='timestamp' angle={-35} textAnchor="end" scale={'linear'} tick={<CustomTick />} />
            <YAxis yAxisId="kg" domain={['dataMin-1', 'dataMax+1']} />
            {/* yAxisId is used to set y-axis to the right values (kg or celsius) */}
            {/* domain is used to set the range of the y-axis */}
            <YAxis yAxisId="celsius" orientation="right" domain={['dataMin-1', 'dataMax+1']} />
            {showTooltip && !showDots && <Tooltip content={(props) => CustomTooltip({ ...props, activeType: activeMeasurements, units })} />}
            {/* if showTooltip is true, show tooltip */}
            <Legend />
        </LineChart>
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

const strokeColors = {
    weight: '#8884d8',
    temperature: '#82ca9d',
    weather: '#ff7300'
};

const units = {
    weight: 'kg',
    temperature: 'celsius',
    weather: 'celsius'
};
