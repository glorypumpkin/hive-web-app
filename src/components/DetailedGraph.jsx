'use client'
import { Brush, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { useState, useEffect, useContext } from 'react';
import { Calendar } from './Calendar';
import { CustomDot } from './CustomDot';
import { SelectGraphType } from './SelectGraphType';
import { HistoryLine } from './HistoryLine';
import { dateFiltering, getDateInterval } from '@/lib/dateFiltering';

const allNotesDefault = [
    { dateFrom: '2023-10-01', dateTo: '2023-10-04', color: 'red', noteText: 'note1' },
    { dateFrom: '2023-10-05', dateTo: '2023-10-07', color: 'green', noteText: 'note2' },
    { dateFrom: '2023-10-11', dateTo: '2023-10-13', color: 'blue', noteText: 'note4' }
]

const units = {
    weight: 'kg',
    temperature: 'celsius'
};

export default function DetailedGraph({ data }) {

    // const data = useContext(DetailedGraphContext);
    const [showDots, setShowDots] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [activeType, setActiveType] = useState(['weight']);
    const [allNotes, setAllNotes] = useState(allNotesDefault);
    const [showTooltip, setShowTooltip] = useState(true);
    const [showDot, setShowDot] = useState(false);
    const [activePeriodButton, setActivePeriodButton] = useState("Year");
    // const [filteredNoteData, setFilteredNoteData] = useState([]);

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }

    // const areaCharts = allNotes.map((note, index) => (
    //     <Area
    //         dataKey='weight'
    //         fill={data[index].color}
    //         yAxisId='kg'
    //     />));

    const dateInterval = getDateInterval(activePeriodButton); //TODO: getDateIntervalPeriod(activePeriodButton) getDateIntervalCalendar(range)
    const dateFrom = dateInterval.startDate;
    const dateTo = dateInterval.endDate;
    const filterData = dateFiltering(data, dateFrom, dateTo);
    const dataWithDayAndHour = filterData.map((item) => {
        const date = new Date(item.timestamp);
        const day = date.getDate() + '.' + (date.getMonth() + 1);
        const hour = date.getHours() + ':00';
        const year = date.getFullYear();
        return { ...item, day, hour, year };
    })


    const customTooltip = ({ active, payload, label }) => {
        if (active) {
            // if showDots is false, hide tooltip
            if (!showDots && !showTooltip) {
                return null;
            }
            else {
                return (
                    <div className="custom-tooltip">
                        <p>{`${payload[0].payload.day}, ${payload[0].payload.hour}, ${payload[0].payload.year}`}</p>
                        {activeType.map((type, index) => (
                            <p key={index}>{`${type}: ${payload[0].payload[type]} ${units[type]}`}</p>
                        ))}
                    </div>
                );
            }
        }
    }


    const graphType = activeType.map((type, index) => (
        type === 'weight' || type === 'temperature' || type === 'weather' ? (
            <Line
                key={index}
                type="monotone"
                dataKey={type}
                stroke={type === 'weight' ? '#8884d8' : '#82ca9d'}
                dot={showDot ? <CustomDot showDots={showDots} setShowDots={setShowDots} type={type} /> : false}
                yAxisId={units[type]}
            />
        ) : areaCharts

    ));


    const renderLineChart = (
        <ComposedChart
            id='detailed-graph'
            data={dataWithDayAndHour}
            margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5
            }}
            width={1300} height={800}
        >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            {graphType}
            <XAxis dataKey='day' angle={-35} textAnchor="end" tick={{ fontSize: 14 }} reversed />
            <YAxis yAxisId="kg" domain={['dataMin-1', 'dataMax+1']} />
            <YAxis yAxisId="celsius" orientation="right" domain={['dataMin-1', 'dataMax+1']} />
            {showTooltip && <Tooltip content={customTooltip} />}
            <Legend />
            {/* <Brush dataKey='day' reversed></Brush> */}
        </ComposedChart>

    );

    const onTooltipButtonClick = () => {
        setShowTooltip(true);
        setShowDot(false);
    }

    const onDotButtonClick = () => {
        setShowTooltip(false);
        setShowDot(true);
    }

    return (
        <div className=" bg-[rgba(25,118,210,0.08)] flex pt-2">
            <div className="flex flex-col gap-5">
                <div className='flex flex-row gap-2 pl-3 items-center pt-1'>
                    <button className=' bg-orange-200' onClick={onTooltipButtonClick}>Tooltip</button>
                    <button className=' bg-orange-200' onClick={onDotButtonClick}>Dot</button>
                    <button className='bg-orange-200'>Statistic</button>
                    <button className='bg-orange-200'>Normal</button>
                </div>
                {hydrated && renderLineChart}

                <HistoryLine activePeriodButton={activePeriodButton} setActivePeriodButton={setActivePeriodButton}></HistoryLine>
            </div>
            <div className="flex flex-col gap-16 w-full items-center pt-10">
                <SelectGraphType activeType={activeType} setActiveType={setActiveType} ></SelectGraphType>
                <div className=" flex flex-col gap-12 w-[377px] items-center">
                    <Calendar allNotes={allNotes} setAllNotes={setAllNotes} data={data}
                    // filteredNoteData={filteredNoteData} setFilteredNoteData={setFilteredNoteData}
                    ></Calendar>
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



