import { Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Brush } from 'recharts';
import { useState, useEffect } from 'react';
import { CustomTooltip } from './CustomTooltip';

export function MainGraph({ relevantData, activeMeasurements, showTooltip, dataToCompare, compareActive, predictionActive, predictionData }) {

    // Do not render on the server
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }
    console.log('relevantData', relevantData)
    const comparisonLine = compareActive && activeMeasurements.map((type, index) => (
        <Line
            key={index}
            data={dataToCompare}
            type="monotone"
            dataKey={type}
            stroke={strokeColorsCompare[type]}
            dot={false}
            yAxisId={units[type]}
            xAxisId='compare'
            connectNulls
        />
    ));


    const graphLines = activeMeasurements.map((type, index) => (
        <Line
            key={type}
            data={relevantData}
            type="monotone"
            dataKey={type === 'weather' ? 'tempWeather' : type} //dataKey is used to set the data to the right type (weight, temperature or weather)
            stroke={strokeColors[type]}
            dot={false}
            yAxisId={units[type]}
            connectNulls
        />
    ));

    const predictionLine = predictionActive && (
        <Line
            data={predictionData}
            type="monotone"
            dataKey='weight'
            stroke={strokeColors.weight}
            strokeDasharray="5 5"
            dot={false}
            yAxisId={units.weight}
            connectNulls
        />
    );


    return (
        <>
            <LineChart
                id='detailed-graph'
                overflow='visible'
                data={relevantData}
                //the data prop gets the data from the dataWithDayAndHour array, which is filtered by date
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
                {comparisonLine}
                {predictionLine}
                {/* the right graph type is rendered based on the activeType state, which is set by the user */}
                <XAxis dataKey='timestamp' angle={-35} textAnchor="end" scale={'linear'} tick={<CustomTick />} domain={['dataMin', 'dataMax']} type='number' />
                <XAxis dataKey='timestamp' orientation='top' domain={['dataMin', 'dataMax']} type='number' xAxisId='compare' hide></XAxis>
                <YAxis yAxisId="kg" domain={['dataMin', 'dataMax']} />
                {/* yAxisId is used to set y-axis to the right values (kg or celsius) */}
                {/* domain is used to set the range of the y-axis */}
                <YAxis yAxisId="C" orientation="right" />
                {showTooltip && <Tooltip content={(props) => CustomTooltip({ ...props, activeType: activeMeasurements, units })} />}
                {/* if showTooltip is true, show tooltip */}
                <Legend />
                {/* <Brush dataKey='day' height={30} stroke="#8884d8"/> */}
                {/* Brush is used to set the range of the x-axis */}
            </LineChart>
            {/* {selectExtraGraphsType} */}
        </>
    )
}

const CustomTick = (props) => {
    const { x, y, payload } = props;
    const date = new Date(payload?.value);
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
    weight: '#7a76c2',
    temperature: '#75b58d',
    weather: '#ff7300'
};

const strokeColorsCompare = {
    weight: '#b7b5e7',
    temperature: '#b4dfc4'
};

const units = {
    weight: 'kg',
    temperature: 'C',
    weather: 'C'
};
