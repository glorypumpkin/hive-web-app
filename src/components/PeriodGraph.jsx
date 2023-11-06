'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { useState, useEffect } from 'react';
import { dateFiltering } from '@/lib/dateFiltering';

const testData = [
    { day: '1.10', hour: '00:00', weight: 2 },
    { day: '1.10', hour: '06:00', weight: 16 },
    { day: '1.10', hour: '12:00', weight: 10 },
    { day: '1.10', hour: '18:00', weight: 15 },
    { day: '2.10', hour: '00:00', weight: 3 },
    { day: '2.10', hour: '06:00', weight: 5 },
    { day: '2.10', hour: '12:00', weight: 20 },
    { day: '2.10', hour: '18:00', weight: 16 },
    { day: '3.10', hour: '00:00', weight: 12 },
    { day: '3.10', hour: '06:00', weight: 15 },
    { day: '3.10', hour: '12:00', weight: 18 },
    { day: '3.10', hour: '18:00', weight: 20 },
    { day: '4.10', hour: '00:00', weight: 2 },
    { day: '4.10', hour: '06:00', weight: 16 },
    { day: '4.10', hour: '12:00', weight: 10 },
    { day: '4.10', hour: '18:00', weight: 15 },
    { day: '5.10', hour: '00:00', weight: 3 },
    { day: '5.10', hour: '06:00', weight: 5 },
    { day: '5.10', hour: '12:00', weight: 20 },
    { day: '5.10', hour: '18:00', weight: 16 },
    { day: '6.10', hour: '00:00', weight: 12 },
    { day: '6.10', hour: '06:00', weight: 15 },
    { day: '6.10', hour: '12:00', weight: 18 },
    { day: '6.10', hour: '18:00', weight: 20 },
    { day: '7.10', hour: '00:00', weight: 2 },
    { day: '7.10', hour: '06:00', weight: 16 },
    { day: '7.10', hour: '12:00', weight: 10 },
    { day: '7.10', hour: '18:00', weight: 15 },
    { day: '8.10', hour: '00:00', weight: 3 },
    { day: '8.10', hour: '06:00', weight: 5 },
    { day: '8.10', hour: '12:00', weight: 20 },
    { day: '8.10', hour: '18:00', weight: 16 },
    { day: '9.10', hour: '00:00', weight: 12 },
    { day: '9.10', hour: '06:00', weight: 15 },
    { day: '9.10', hour: '12:00', weight: 18 },
    { day: '9.10', hour: '18:00', weight: 20 },
    { day: '10.10', hour: '00:00', weight: 2 },
    { day: '10.10', hour: '06:00', weight: 16 },
    { day: '10.10', hour: '12:00', weight: 10 },
    { day: '10.10', hour: '18:00', weight: 15 },
    { day: '11.10', hour: '00:00', weight: 3 },
    { day: '11.10', hour: '06:00', weight: 5 },
    { day: '11.10', hour: '12:00', weight: 20 },
    { day: '11.10', hour: '18:00', weight: 16 },
    { day: '12.10', hour: '00:00', weight: 12 },
    { day: '12.10', hour: '06:00', weight: 15 },
    { day: '12.10', hour: '12:00', weight: 18 },
    { day: '12.10', hour: '18:00', weight: 20 },
    { day: '13.10', hour: '00:00', weight: 2 },
    { day: '13.10', hour: '06:00', weight: 16 },
    { day: '13.10', hour: '12:00', weight: 10 },
    { day: '13.10', hour: '18:00', weight: 15 },
    { day: '14.10', hour: '00:00', weight: 3 },
    { day: '14.10', hour: '06:00', weight: 5 },
    { day: '14.10', hour: '12:00', weight: 20 },
    { day: '14.10', hour: '18:00', weight: 16 },
    { day: '15.10', hour: '00:00', weight: 12 },
    { day: '15.10', hour: '06:00', weight: 15 },
    { day: '15.10', hour: '12:00', weight: 18 },
    { day: '15.10', hour: '18:00', weight: 20 },
    { day: '16.10', hour: '00:00', weight: 2 },
    { day: '16.10', hour: '06:00', weight: 16 },
    { day: '16.10', hour: '12:00', weight: 10 },
    { day: '16.10', hour: '18:00', weight: 15 },
    { day: '17.10', hour: '00:00', weight: 3 },
    { day: '17.10', hour: '06:00', weight: 5 },
    { day: '17.10', hour: '12:00', weight: 20 },
    { day: '17.10', hour: '18:00', weight: 16 },
    { day: '18.10', hour: '00:00', weight: 12 },
    { day: '18.10', hour: '06:00', weight: 15 },
    { day: '18.10', hour: '12:00', weight: 18 },
    { day: '18.10', hour: '18:00', weight: 20 },
    { day: '19.10', hour: '00:00', weight: 2 },
    { day: '19.10', hour: '06:00', weight: 16 },
    { day: '19.10', hour: '12:00', weight: 10 },
    { day: '19.10', hour: '18:00', weight: 15 },
    { day: '20.10', hour: '00:00', weight: 3 },
    { day: '20.10', hour: '06:00', weight: 5 },
    { day: '20.10', hour: '12:00', weight: 20 },
    { day: '20.10', hour: '18:00', weight: 16 },
    { day: '21.10', hour: '00:00', weight: 12 },
    { day: '21.10', hour: '06:00', weight: 15 },
    { day: '21.10', hour: '12:00', weight: 18 },
    { day: '21.10', hour: '18:00', weight: 20 }
]

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
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip">
                    <p>{`${payload[0].payload.day}, ${payload[0].payload.hour}`}</p>
                    <p>{`Weight: ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };
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
        return { ...item, day, hour };
    })

    const renderLineChart = (
        <ResponsiveContainer width="70%" height="70%">
            <LineChart id="period-graph" width={400} height={300} data={dataWithDayAndHour}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="kg" stroke="#8884d8" xAxisId={data.hour} />
                <XAxis dataKey="day" angle={-30} textAnchor="end" tick={{ fontSize: 15 }} reversed />
                {/* <XAxis dataKey="hour" orientation="top" tick={{ fontSize: 10 }} xAxisId="hourAxis" angle={45} textAnchor="end" hide /> */}
                <YAxis tick={{ fontSize: 10 }} domain={['dataMin-0.5', 'dataMax +0.5']} />
                <Tooltip content={CustomTooltip} />
            </LineChart>
        </ResponsiveContainer>
    )

    return (
        <div className='main-page bg-[#fffae7]'>
            {renderLineChart}
        </div>
    )
}
