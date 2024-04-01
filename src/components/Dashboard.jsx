'use client'
import { Weather } from "./Weather"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { SmallGraph } from './SmallGraph'

export default function Dashboard() {
    return (
        <div className=" flex flex-col gap-16 w-full px-6 pt-16 pb-10 h-[94vh]">
            <div className="flex flex-row mr-1 gap-12 items-start">
                <Weather> </Weather>
                <DataPrediction> </DataPrediction>
            </div>
            <div className="flex flex-row mr-1 gap-12 items-start">
                <SmallGraph graphType="weight"> </SmallGraph>
                <SmallGraph graphType="temperature"> </SmallGraph>
            </div>
        </div>
    )
}

const exampleData = [
    { month: 'January', weight: 2 },
    { month: 'Februrary', weight: 16 },
    { month: 'March', weight: 10 },
    { month: 'April', weight: 15 },
    { month: 'May', weight: 3 },
    { month: 'June', weight: 5 },
    { month: 'July', weight: 20 },
    { month: 'August', weight: 16 },
    { month: 'September', weight: 12 },
    { month: 'October', weight: 15 },
    { month: 'November', weight: 18 },
    { month: 'December', weight: 20 }];
// fix data later (from main page to dashboard)

export function DataPrediction() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }
    return (
        <div className="dashboard-element w-full max-w-2xl md:w-2/5 h-[340px] rounded-[50px] md:flex-row justify-between mx-auto md:mx-0">
            <div className="w-full md:w-[30%] mb-4 md:mb-0 md:ml-5">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
            <div className=" h-[200px] md:h-full md:w-[80%]">
                {hydrated && (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart id="data-prediction-graph" data={exampleData}>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                            <XAxis dataKey="month" angle={-35} textAnchor="end" tick={{ fontSize: 8 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}