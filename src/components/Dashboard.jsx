'use client'
import { Weather } from "./Weather"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    return (
        <div className="bg-[##1976d214] flex flex-col gap-16 w-full px-6 pt-16 pb-10">
            <div className="flex flex-row mr-1 gap-12 items-start">
                <Weather> </Weather>
                <DataPrediction> </DataPrediction>
            </div>
            <div className="flex flex-row mr-1 gap-12 items-start">
                <SmallWeightGraph> </SmallWeightGraph>
                <SmallTemperatureGraph> </SmallTemperatureGraph>
            </div>
        </div>
    )
}

const data = [
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
        <div className="shadow-[10px_10px_20px_5px_#4541332e] bg-[#e7ecff] w-2/5 h-[340px] rounded-[50px] flex flex-row justify-evenly items-center">
            <div className=" ml-5">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quo, pariatur optio culpa eligendi dignissimos perspiciatis, recusandae dolores earum sequi dolorum, sapiente error animi! Eius voluptatum quas nobis consectetur. Dolorem!</p>
            </div>
            <div className="">
                {hydrated && (

                    <LineChart id="data-prediction-graph" width={400} height={300} data={data}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                        <XAxis dataKey="month" angle={-35} textAnchor="end" tick={{ fontSize: 8 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                    </LineChart>
                )}
            </div>
        </div>
    )
}

export function SmallWeightGraph() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }
    return (
        <div className="dashboard-element w-1/2 h-[380px]" >
            <h2>Weight</h2>
            <div>
                {hydrated && (

                    <LineChart id="small-weight-graph" width={800} height={300} data={data}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                        <XAxis dataKey="month" angle={-35} textAnchor="end" tick={{ fontSize: 8 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                    </LineChart>
                )}
            </div>
            <Link href="/dashboard/detailed-graph">More info</Link>
        </div>
    )
}

export function SmallTemperatureGraph() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }
    return (
        <div className="dashboard-element w-1/2 h-[380px]" >
            <h2>Temperature</h2>
            <div>
                {hydrated && (

                    <LineChart id="small-temperature-graph" width={800} height={300} data={data}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                        <XAxis dataKey="month" angle={-35} textAnchor="end" tick={{ fontSize: 8 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                    </LineChart>
                )}

            </div>
            <Link href="/dashboard/detailed-graph">More info</Link>
        </div>
    )
}