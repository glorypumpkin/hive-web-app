'use client'
import { Weather } from "./Weather"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import Link from 'next/link';

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

    return (
        <div className="dashboard-shadow bg-[#e7ecff] w-2/5 h-[340px] rounded-[50px] flex flex-row justify-evenly items-center">
            <div className=" ml-5">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quo, pariatur optio culpa eligendi dignissimos perspiciatis, recusandae dolores earum sequi dolorum, sapiente error animi! Eius voluptatum quas nobis consectetur. Dolorem!</p>
            </div>
            <div className="">
                <LineChart width={400} height={300} data={data}>
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="month" angle={-35} textAnchor="end" tick={{ fontSize: 8 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                </LineChart>
            </div>
        </div>
    )
}

export function SmallWeightGraph() {
    return (
        <div className="dashboard-shadow bg-[#e7ecff] w-1/2 h-[380px] rounded-[50px] items-center justify-center" >
            <h2>Weight</h2>
            <div>
                <LineChart width={800} height={300} data={data}>
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="month" angle={-35} textAnchor="end" tick={{ fontSize: 8 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                </LineChart>
            </div>
            <Link href="/dashboard/detailed-graph">More info</Link>
        </div>
    )
}

export function SmallTemperatureGraph() {
    return (
        <div className="dashboard-shadow bg-[#e7ecff] w-1/2 h-[380px] rounded-[50px] items-center justify-center" >
            <h2>Temperature</h2>
            <div>
                <LineChart width={800} height={300} data={data}>
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="month" angle={-35} textAnchor="end" tick={{ fontSize: 8 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                </LineChart>
            </div>
            <Link href="/dashboard/detailed-graph">More info</Link>
        </div>
    )
}