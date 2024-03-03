'use client'

import { useState, useEffect } from 'react';
import { dateFiltering } from '@/lib/dateFiltering';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

export function SmallGraph({ data, graphType }) {
    const [hydrated, setHydrated] = useState(false);

    // convert graphType to upper case
    const graphTypeName = graphType.charAt(0).toUpperCase() + graphType.slice(1);

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }

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
    return (
        <div className="dashboard-element w-1/2 h-[380px] " >
            <h2>{graphTypeName}</h2>
            <div className="flex flex-row w-full h-full">
                {hydrated && (
                    <ResponsiveContainer width="100%" height="100%" >
                        <LineChart id="small-weight-graph" width={800} height={300} data={dataWithDayAndHour}>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Line type="monotone" dataKey={graphType} stroke="#8884d8" />
                            <XAxis dataKey="day" angle={-35} textAnchor="end" tick={{ fontSize: 8 }} />
                            <YAxis tick={{ fontSize: 10 }} domain={['dataMin-0.5', 'dataMax +0.5']} />
                            <Tooltip></Tooltip>
                        </LineChart>
                    </ResponsiveContainer>
                )}
                <div className="flex items-end pb-4">
                    <Link href="/dashboard/detailed-graph" className="h-6 w-6">
                        <img src="/maximize.png" />
                    </Link>
                </div>
            </div>
        </div>
    )
}