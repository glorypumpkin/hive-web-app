import { getShortWeatherDescription } from "@/lib/weatherForecast";
import { format } from "date-fns";

export function WeatherActive({ activeDay, forecast }) {
    // const isActiveDayValid = forecast.some(day => day.timestamp === activeDay);
    const activeDayData = forecast.find(day => day.timestamp === activeDay);
    const shortWeatherDescription = getShortWeatherDescription(activeDayData.conditions);
    const { description, icon } = shortWeatherDescription;
    const day = format(new Date(activeDayData.datetime), 'dd.MM');
    return (
        <div className="grid grid-flow-col-dense">
            {/* Show weather today */}
            <div className="flex items-center justify-center">
                <img
                    src={icon}
                    className="top-0 left-0 w-36"
                />
            </div>
            <div className="text-s col-span-3 flex items-center">
                {forecast[0].address}
                <br />
                {day}
                <br />
                {description}
                <br />
                Teplota: {activeDayData.tempWeather} °C
                <br />
                Vlhkost: {activeDayData.humidity} %
                <br />
                Srážky: {activeDayData.precip} mm
                {/* <br />
                Wind speed: {activeDayData.windspeed} m/s */}
            </div>
        </div>
    )
}