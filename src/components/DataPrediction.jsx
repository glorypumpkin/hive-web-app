'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { CustomTooltip } from './CustomTooltip';
import { TextInfo } from './TextInfo';

// fix data later (from main page to dashboard)

const fetcher = (url) => fetch(url).then((res) => res.json());

export function DataPrediction() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const { data: fetchedPrediction, error, isLoading } = useSWR('/api/prediction', fetcher);

    const predictionDataLoaded = fetchedPrediction ?? [];
    console.log('fetchedPrediction', fetchedPrediction);
    console.log('predictionDataLoaded', predictionDataLoaded);

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

    console.log('predictionData', predictionData);

    //sum of all weight differences
    let sum = 0;
    predictionData.forEach((data) => {
        console.log('data', data)
        sum += data.weightDiff;
    });

    if (!hydrated) {
        return null;
    }
    const activeType = ['weight'];
    const units = { weight: 'kg' }
    const text = 'This graph shows the predicted weight of the hive change over the next 7 days.';
    return (
        <div className="dashboard-element w-full max-w-2xl md:w-2/5 h-[340px] rounded-[50px] mx-auto md:mx-0">
            <div className='flex flex-row gap-2 items-center'>
                <h2 className='text-lg font-semibold'>Data Prediction
                </h2>
                <TextInfo text={text} />
            </div>
            <div className=' flex flex-row h-full pr-4'>
                <div className="w-full md:w-[30%] mb-4 md:mb-0 md:ml-5">
                    <p>
                        Expected weight change: {sum.toFixed(2)} kg
                    </p>
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
        </div>
    )
}
