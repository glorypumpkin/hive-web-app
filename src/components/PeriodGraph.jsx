'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { useState, useEffect } from 'react';
import { dateFiltering } from '@/lib/dateFiltering';
import { CustomTooltip } from '@/components/CustomTooltip';

// [{ "stan": "1221601", "timestamp": 1699182000000, "kg": 43.2, "rozdil": 0.2, "tepl": 11.4 },
// { "stan": "1221601", "timestamp": 1699160400000, "kg": 43, "rozdil": 0.2, "tepl": 7.4 },
// { "stan": "1221601", "timestamp": 1699138800000, "kg": 42.8, "rozdil": -0.2, "tepl": 6.2 },
// { "stan": "1221601", "timestamp": 1699117200000, "kg": 43, "rozdil": -0.4, "tepl": 7.2 },
// { "stan": "1221601", "timestamp": 1699095600000, "kg": 43.4, "rozdil": 0, "tepl": 8 },
//     { "stan": "1221601", "timestamp": 1699074000000, "kg": 43.4, "rozdil": 0, "tepl": 5.2 }
// ]

export default function PeriodGraph({ data }) {

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null;
    }
    // params: data, date from 21 days ago, date to today
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 21);
    const today = new Date();
    const filterData = dateFiltering(data, dateFrom, today);
    // map data to new array with day and hour
    const dataWithDayAndHour = filterData.map((item) => {
        const date = new Date(item.timestamp);
        const day = date.getDate() + '.' + (date.getMonth() + 1);
        const hour = date.getHours() + ':00';
        const year = date.getFullYear();
        return { ...item, day, hour, year };
    })
    const activeType = ['weight']
    const units = { weight: 'kg' }
    const renderLineChart = (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart id="period-graph" width={400} height={300} data={dataWithDayAndHour}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line stroke="#8884d8" xAxisId={data.hour} type="monotone" dataKey="weight" dot={false} />
                {/* <Line stroke="#82ca9d" xAxisId={data.hour} type="monotone" dataKey="temperature" /> */}
                <XAxis dataKey="day" angle={-30} textAnchor="end" tick={{ fontSize: 15 }} />
                <YAxis tick={{ fontSize: 10 }} domain={['dataMin', 'dataMax']} />
                <Tooltip content={(props) => CustomTooltip({ ...props, activeType, units })} />
            </LineChart>
        </ResponsiveContainer>
    )

    return (
        <div className='h-full'>
            {hydrated && renderLineChart}
        </div>
    )
}
