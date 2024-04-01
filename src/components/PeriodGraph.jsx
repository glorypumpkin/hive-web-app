'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { useState, useEffect } from 'react';
import { getDataWithDayAndHour } from '@/lib/dateFiltering';
import { CustomTooltip } from '@/components/CustomTooltip';
import { format } from 'date-fns';
import useSWR from 'swr';

// [{ "stan": "1221601", "timestamp": 1699182000000, "kg": 43.2, "rozdil": 0.2, "tepl": 11.4 },
// { "stan": "1221601", "timestamp": 1699160400000, "kg": 43, "rozdil": 0.2, "tepl": 7.4 },
// { "stan": "1221601", "timestamp": 1699138800000, "kg": 42.8, "rozdil": -0.2, "tepl": 6.2 },
// { "stan": "1221601", "timestamp": 1699117200000, "kg": 43, "rozdil": -0.4, "tepl": 7.2 },
// { "stan": "1221601", "timestamp": 1699095600000, "kg": 43.4, "rozdil": 0, "tepl": 8 },
//     { "stan": "1221601", "timestamp": 1699074000000, "kg": 43.4, "rozdil": 0, "tepl": 5.2 }
// ]
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PeriodGraph() {

    const [hydrated, setHydrated] = useState(false);

    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 21);
    const today = new Date();

    const dataRangeFormatted = {
        from: format(dateFrom, 'yyyy-LL-dd'),
        to: format(today, 'yyyy-LL-dd')
    }
    console.log('dataRangeFormatted', dataRangeFormatted)

    const url = `/api/fetch-hive-data?from=${dataRangeFormatted.from}&to=${dataRangeFormatted.to}`;

    const { data: weightDataFetched, error: errorWeight, isLoading: isLoadingWeight, isValidating: isValidatingWeight } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        keepPreviousData: true
    });

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }

    const weightData = weightDataFetched ?? [];

    const dataWithDayAndHour = getDataWithDayAndHour(weightData, dateFrom, today);
    const activeType = ['weight']
    const units = { weight: 'kg' }
    const renderLineChart = (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart id="period-graph" width={400} height={300} data={dataWithDayAndHour}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line stroke="#8884d8" xAxisId={dataWithDayAndHour.hour} type="monotone" dataKey="weight" dot={false} />
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
