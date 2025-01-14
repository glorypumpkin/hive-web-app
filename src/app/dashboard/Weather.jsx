import useSWR from 'swr';
import { WeatherElement } from './WeatherElement';
import { WeatherActive } from './WeatherActive';
import { addHours, startOfDay } from 'date-fns';
import { useState } from 'react';
import { useLoadForecast } from '@/lib/dataLoaders';

const fetcher = (url) => fetch(url).then((res) => res.json());

const today = startOfDay(new Date());
const localTime = addHours(today, -today.getTimezoneOffset() / 60);

export function Weather() {
    const [activeDay, setActiveDay] = useState(localTime.getTime());

    const { forecast, error, isLoading } = useLoadForecast();

    if (isLoading) return <div>Předpověď počasí se načítá...</div>

    if (error) return <div>Chyba při načítání předpovědi počasí</div>

    console.log('forecast', forecast);
    console.log('activeDay', activeDay); // activeDay is a timestamp

    // filter forecast so that it only contains days, starting from today
    let forecastNext7Days = [];
    for (let i = 0; i < forecast.length; i++) {
        const day = forecast[i];
        const timestamp = day.timestamp;
        if (timestamp >= localTime.getTime()) {
            forecastNext7Days.push(day);
        }
    }

    console.log('forecastNext7Days', forecastNext7Days);

    return (
        <div
            className="shadow-[10px_10px_20px_5px_#4541332e] -bg--primary-color grid w-3/5 lg:w-full rounded-[50px] "
            style={{
                gridTemplateRows: 'auto max-content',
            }}
        >
            <WeatherActive
                activeDay={activeDay}
                forecast={forecast}
            />
            <div
                id="WeatherPrediction"
                className="grid grid-cols-8 gap-2 mx-2 mb-2 lg:pb-2">
                {forecastNext7Days && forecastNext7Days.map((day, index) => (
                    <WeatherElement
                        key={index}
                        forecastForOneDay={day}
                        setActiveDay={setActiveDay}
                    />
                ))}
            </div>
        </div>
    )
}