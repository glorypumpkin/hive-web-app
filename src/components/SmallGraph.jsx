'use client'

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getDataWithDayAndHour } from '@/lib/dateFiltering';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { CustomTooltip } from './CustomTooltip';
import { format } from 'date-fns';
import { TextInfo } from './TextInfo';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function SmallGraph({ graphType }) {
    const [hydrated, setHydrated] = useState(false);

    // convert graphType to upper case
    const graphTypeName = graphType.charAt(0).toUpperCase() + graphType.slice(1);

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

    const lineColors = {
        weight: '#8884d8',
        temperature: '#82ca9d'
    }

    const activeType = [graphType]
    const units = { weight: 'kg', temperature: '°C' }
    const text = `This graph shows the ${graphType} of the hive over the last 21 days.`;
    return (
        <div className="dashboard-element w-1/2 h-[380px] " >
            <div className='flex flex-row gap-2 items-center'>
                <h2 className=' text-lg font-semibold'>{graphTypeName}</h2>
                <TextInfo text={text} />
            </div>
            <div className="flex flex-row w-full h-full">
                {hydrated && (
                    <ResponsiveContainer width="95%" height="100%" >
                        <LineChart id="small-weight-graph" width={800} height={300} data={dataWithDayAndHour}>
                            <Line type="monotone" dataKey={graphType} stroke={lineColors[graphType]} dot={false} />
                            <XAxis dataKey="day" angle={-35} textAnchor="end" tick={{ fontSize: 8 }} />
                            <YAxis tick={{ fontSize: 10 }} domain={['dataMin', 'dataMax']} />
                            <Tooltip content={(props) => CustomTooltip({ ...props, activeType, units })}></Tooltip>
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