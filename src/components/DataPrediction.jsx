'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { CustomTooltip } from './CustomTooltip';

// fix data later (from main page to dashboard)

const fetcher = (url) => fetch(url).then((res) => res.json());

export function DataPrediction() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const { data: fetchedPrediction, error, isLoading } = useSWR('/api/prediction', fetcher);

    const predictionDataLoaded = fetchedPrediction ?? [];

    // get date and hour from timestamp 
    const predictionData = predictionDataLoaded.map((data) => {
        const date = new Date(data.timestamp);
        const day = date.getDate() + '.' + (date.getMonth() + 1);
        const hour = date.getHours();
        const year = date.getFullYear();
        // round weight to 2 decimal places
        const weight = Math.round(data.weight * 100) / 100;
        return { day, hour, weight, timestamp: data.timestamp, year, weightDiff: data.weightDiff };
    });

    if (!hydrated) {
        return null;
    }
    const activeType = ['weight'];
    const units = { weight: 'kg' }
    return (
        <div className="dashboard-element w-full max-w-2xl md:w-2/5 h-[340px] rounded-[50px] md:flex-row justify-between mx-auto md:mx-0">
            <div className="w-full md:w-[30%] mb-4 md:mb-0 md:ml-5">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
            <div className=" h-[200px] md:h-full md:w-[80%]">
                {hydrated && (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart id="data-prediction-graph" data={predictionData}>
                            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                            <XAxis dataKey="day" angle={-35} textAnchor="end" tick={{ fontSize: 8 }} />
                            <YAxis tick={{ fontSize: 10 }} domain={['dataMin', 'dataMax']} />
                            <Tooltip content={(props) => CustomTooltip({ ...props, activeType, units })} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}
