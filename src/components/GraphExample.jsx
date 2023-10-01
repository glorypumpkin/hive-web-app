'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


export default function GraphExample() {

    const data = [
        { mounth: 'January', weight: 12 },
        { mounth: 'Februrary', weight: 16 },
        { mounth: 'March', weight: 10 },
        { mounth: 'April', weight: 15 },
        { mounth: 'May', weight: 8 },
        { mounth: 'June', weight: 14 },
        { mounth: 'July', weight: 20 },
        { mounth: 'August', weight: 16 },
        { mounth: 'September', weight: 12 },
        { mounth: 'October', weight: 15 },
        { mounth: 'November', weight: 18 },
        { mounth: 'December', weight: 20 }];

    const renderLineChart = (
        <LineChart width={800} height={500} data={data} margin={{ top: 20, right: 100, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="mounth" />
            <YAxis dataKey="weight" />
            <Tooltip />
        </LineChart>
    );

    return (
        <div>

            {renderLineChart}
        </div>
    )
}