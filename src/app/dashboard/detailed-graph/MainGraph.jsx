import { Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Brush, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { CustomTooltip } from '../../../components/CustomTooltip';

export function MainGraph({ relevantData, activeMeasurements, showTooltip, dataToCompare, compareActive, predictionActive, predictionData, forecast, showForecast }) {

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
            name={type === 'weight' ? 'hmotnost před rokem' : type === 'temperature' ? 'teplota před rokem' : ''}
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
            name={type === 'precip' ? 'srážky' : type === 'weight' ? 'hmotnost' : 'teplota'}
            key={type}
            data={relevantData}
            type="monotone"
            dataKey={type} //dataKey is used to set the data to the right type (weight, temperature or weather)
            stroke={strokeColors[type]}
            dot={false}
            yAxisId={units[type]}
            connectNulls
        />
    ));

    const predictionLine = predictionActive && (
        <Line
            name='predikce hmotnosti'
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

    const forecastLine = showForecast && (
        <Line
            name='předpověď teploty'
            data={forecast}
            type="monotone"
            dataKey='tempWeather'
            stroke={strokeColors.weather}
            strokeDasharray="5 5"
            dot={false}
            yAxisId={units.weather}
            connectNulls
        />
    );

    return (
        <ResponsiveContainer minHeight={430}>
            <LineChart
                id='detailed-graph'
                overflow='visible'
                data={relevantData}
            //the data prop gets the data from the dataWithDayAndHour array, which is filtered by date

            >
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                {graphLines}
                {comparisonLine}
                {predictionLine}
                {forecastLine}
                {/* the right graph type is rendered based on the activeType state, which is set by the user */}
                <XAxis dataKey='timestamp' angle={-35} textAnchor="end" scale={'linear'} tick={<CustomTick />} domain={['dataMin', 'dataMax']} type='number' />
                <XAxis dataKey='timestamp' orientation='top' domain={['dataMin', 'dataMax']} type='number' xAxisId='compare' hide></XAxis>
                <YAxis yAxisId="kg" unit='kg' domain={['dataMin', 'dataMax']} />
                {/* yAxisId is used to set y-axis to the right values (kg or celsius) */}
                {/* domain is used to set the range of the y-axis */}
                <YAxis yAxisId="C" unit='°C' orientation="right" />
                {showTooltip && <Tooltip content={(props) => CustomTooltip({ ...props, activeType: activeMeasurements, units })} />}
                {activeMeasurements.includes('precip') && <YAxis yAxisId='mm' unit='mm' orientation='right' type='number' ></YAxis>}
                {/* if showTooltip is true, show tooltip */}
                <Legend />
                {/* <Brush dataKey='day' height={30} stroke="#8884d8"/> */}
                {/* Brush is used to set the range of the x-axis */}
            </LineChart>
            {/* {selectExtraGraphsType} */}
        </ResponsiveContainer>
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
    weather: '#ff7300',
    precip: '#f5554a'
};

const strokeColorsCompare = {
    weight: '#b7b5e7',
    temperature: '#b4dfc4'
};

const units = {
    weight: 'kg',
    temperature: 'C',
    weather: 'C',
    precip: 'mm'
};
