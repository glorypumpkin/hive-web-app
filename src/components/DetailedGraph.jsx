'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { useState, useEffect } from 'react';
import { Calendar } from './Calendar';
import { CustomDot } from './CustomDot';

const dataYear = [
    { month: 'January', weight: 2, temperature: 10 },
    { month: 'Februrary', weight: 16, temperature: 15 },
    { month: 'March', weight: 10, temperature: 20 },
    { month: 'April', weight: 15, temperature: 25 },
    { month: 'May', weight: 3, temperature: 30 },
    { month: 'June', weight: 5, temperature: 35 },
    { month: 'July', weight: 20, temperature: 40 },
    { month: 'August', weight: 16, temperature: 15 },
    { month: 'September', weight: 12, temperature: 20 },
    { month: 'October', weight: 15, temperature: 25 },
    { month: 'November', weight: 18, temperature: 30 },
    { month: 'December', weight: 20, temperature: 35 }];
// fix data!!!!

const dataWeek = [
    { day: 'Monday', weight: 2, temperature: 10 },
    { day: 'Tuesday', weight: 16, temperature: 15 },
    { day: 'Wednesday', weight: 10, temperature: 20 },
    { day: 'Thursday', weight: 15, temperature: 25 },
    { day: 'Friday', weight: 3, temperature: 30 },
    { day: 'Saturday', weight: 5, temperature: 35 },
    { day: 'Sunday', weight: 20, temperature: 40 }
];

const dataDay = [
    { hour: '00:00', weight: 2 },
    { hour: '06:00', weight: 16 },
    { hour: '12:00', weight: 10 },
    { hour: '18:00', weight: 15 }
];

const periods = ['This day', '7 days', '21 days', 'Month', '1 cvartal', '2 cvartal', '3 cvartal', '4 cvartal', 'Year'];

const types = ['Weight', 'Temperature', 'Weather'];

const units = {
    weight: 'kg',
    temperature: 'celsius'
};

export default function DetailedGraph() {

    const [showDots, setShowDots] = useState(true);
    const [dataKeyXA, setDataKeyXA] = useState('month');
    const [dataKeyYA, setDataKeyYA] = useState('weight');
    const [hydrated, setHydrated] = useState(false);
    const [data, setData] = useState(dataYear);
    const [activeType, setActiveType] = useState(['weight']);

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }

    const renderLineChart = (
        <LineChart
            id='detailed-graph'
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5
            }}
            width={1200} height={800}
        >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            {
                activeType.map((type, index) => (
                    <Line key={index} type="monotone" dataKey={type}
                        stroke={type === 'weight' ? '#8884d8' : '#82ca9d'}
                        dot={<CustomDot showDots={showDots} setShowDots={setShowDots} type={type} />}
                        yAxisId={units[type]} />
                ))
            }
            {/*TODO: add more smooth line animation when changing types*/}
            <XAxis dataKey={dataKeyXA} angle={-35} textAnchor="end" tick={{ fontSize: 14 }} />
            <YAxis yAxisId="kg" />
            <YAxis yAxisId="celsius" orientation="right" />
            <Legend />
        </LineChart>
    );


    function OnPeriodClicked(period) {

        if (period === 'This day') {
            setData(dataDay);
            setDataKeyXA('hour');
        }
        else if (period === '7 days') {
            setData(dataWeek);
            setDataKeyXA('day');
            console.log('clicked');
        }
        else if (period === 'Year') {
            setData(dataYear);
            setDataKeyXA('month');
        }
        // else if (period === '21 days') {
        //     setData(dataWeek);
        //     setDataKeyXA('day');
        // }
        // else if (period === 'Month') {
        //     setData(dataWeek);
        //     setDataKeyXA('day');
        // }
        // else if (period === '1 cvartal') {
        //     setData(dataWeek);
        //     setDataKeyXA('day');
        //     setDataKeyYA('weight');
        // }

    }

    const historyLine = (
        <div className="shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)] overflow-hidden flex flex-row mx-2 rounded-[50px] h-16">
            {periods.map((period, index) => (

                <button key={index} className="history-container font-sans font-light"
                    onClick={() => OnPeriodClicked(period)}
                >{period}</button>

            ))}
        </div>
    )

    function TypeButton({ type, onTypeClicked }) {
        console.log(type);
        const typeLowerCase = type.toLowerCase();
        return (
            <div className="graph-checkbox">
                <input type="checkbox" className="type-button"  //change to checkbox
                    checked={activeType.includes(typeLowerCase)}
                    onClick={() => { onTypeClicked(typeLowerCase) }
                    }
                ></input>
                <div className="font-sans font-light">{type}</div>
            </div>
        )
    }

    function onTypeClicked(type) {
        if (activeType.includes(type)) {
            // If the clicked button is already active, deactivate it
            setActiveType(activeType.filter((active) => active !== type));
        } else {
            // Otherwise, activate the button
            setActiveType([...activeType, type]);
        }
        // Handle other logic based on the selected type here
        if (type === 'weight') {
            setDataKeyYA('weight');
        } else if (type === 'temperature') {
            setDataKeyYA('temperature');
        } else if (type === 'weather') {
            console.log('clicked Weather');
        }
        console.log(activeType);

    }

    return (
        <div className=" bg-[rgba(25,118,210,0.08)] flex pt-10">
            <div className="flex flex-col gap-5 mt-3">
                {hydrated && renderLineChart}
                {historyLine}
            </div>
            <div className="flex flex-col gap-16 w-full items-center">
                <div className="flex flex-col gap-6 w-[250px]">
                    <div className="text-center text-xl font-sans font-semibold">
                        Select graph type
                    </div>
                    <div className="graph-type-container shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)]">
                        {['Weight', 'Temperature', 'Weather'].map((type, index) => (
                            <TypeButton key={index} type={type} onTypeClicked={onTypeClicked} />
                        ))}
                    </div>
                </div>
                <div className=" flex flex-col gap-12 w-[377px] items-center">
                    <Calendar></Calendar>
                    <button className="shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)] overflow-hidden bg-[rgba(25,_118,_210,_0.08)] flex flex-row justify-center gap-3 w-3/5 h-12 shrink-0 items-center rounded-[50px] hover:bg-[#3877b53b] cursor-pointer">
                        <img
                            src="https://file.rendit.io/n/tCph0baGyDvCMUzNZVzt.svg"
                            className="w-6 shrink-0"
                        />
                        <div className="text-center text-xl font-sans font-semibold">
                            Add extra graph
                        </div>
                    </button>
                </div>
            </div>
        </div>




    )
}



