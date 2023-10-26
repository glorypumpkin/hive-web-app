'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { useState, useEffect } from 'react';

const data = [
    { day: '1.10', weight: 2 },
    { day: '2.10', weight: 16 },
    { day: '3.10', weight: 10 },
    { day: '4.10', weight: 15 },
    { day: '5.10', weight: 3 },
    { day: '6.10', weight: 5 },
    { day: '7.10', weight: 20 },
    { day: '8.10', weight: 16 },
    { day: '9.10', weight: 12 },
    { day: '10.10', weight: 15 },
    { day: '11.10', weight: 18 },
    { day: '12.10', weight: 20 },
    { day: '13.10', weight: 2 },
    { day: '14.10', weight: 16 },
    { day: '15.10', weight: 10 },
    { day: '16.10', weight: 15 },
    { day: '17.10', weight: 3 },
    { day: '18.10', weight: 5 },
    { day: '19.10', weight: 20 },
    { day: '20.10', weight: 16 },
    { day: '21.10', weight: 12 }
]

export default function PeriodGraph() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }

    const renderLineChart = (
        <ResponsiveContainer width="60%" height="70%">
            <LineChart id="period-graph" width={400} height={300} data={data}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                <XAxis dataKey="day" angle={-35} textAnchor="end" tick={{ fontSize: 8 }} />
                <YAxis tick={{ fontSize: 10 }} />
            </LineChart>
        </ResponsiveContainer>
    )

    return (
        <div className='main-page bg-[#fffae7]'>
            {renderLineChart}
        </div>
    )
}
