import { getShortWeatherDescription } from '@/lib/weatherForecast';
import { format } from 'date-fns';

export function WeatherElement({ forecastForOneDay, setActiveDay }) {
    const { datetime, tempmin, tempmax, temp, conditions, timestamp } = forecastForOneDay;
    const shortWeatherDescription = getShortWeatherDescription(conditions);
    const { description, icon } = shortWeatherDescription;
    const day = format(new Date(datetime), 'dd.MM');

    const handleClick = () => {
        setActiveDay(timestamp);
    }

    return (
        <button onClick={handleClick} className='hover:-bg--hover-color hover:overflow-hidden rounded-[48px] border-2 -border--hover-color h-32'>
            <div className="flex flex-col items-center">
                <img
                    src={icon}
                    alt={description}
                    className=""
                />
                <div>
                    {day}
                </div>
            </div>
        </button>
    )
}