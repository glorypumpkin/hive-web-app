

export default function Dashboard() {
    return (
        <div className="bg-[#fffae7] flex flex-col gap-16 w-full px-6 pt-16 pb-10">
            <div className="flex flex-row mr-1 gap-12 items-start">
                <Weather> </Weather>
                <div className=" bg-[#e7ecff] w-2/5 h-[340px] rounded-[50px]" />
            </div>
            <div className="flex flex-row mr-1 gap-12 items-start">
                <div className=" bg-[#e7ecff] w-1/2 h-[380px] rounded-[50px]" />
                <div className=" bg-[#e7ecff] w-1/2 h-[380px] rounded-[50px]" />
            </div>
        </div>
    )
}

export function Weather() {

    const weatherIcons = {
        sunny: "/sunny.png",
        partialcloud: "/partial-cloudy.png",
        mostlycloudy: "/mostly-cloudly.png",
        stormy: "/stormy.png",
        rainyday: "/rainy.png",
        snow: "/snowfell.png",
        heavywind: "/heavy-wind.png",
        hailstorm: "/hailstorm.png"
    }

    const tempText = {
        day: "Day: 20 C",
        night: "Night: 20 C"
    }

    function WeatherElement({ weatherType, tempText }) {
        const imageSrc = weatherIcons[weatherType];

        return (
            <div className="">
                <img
                    src={imageSrc}
                    alt={weatherType}
                    className=""
                />
                {tempText.day}
                <br />
                {tempText.night}
            </div>
        )
    }

    return (
        <div
            id="WeatherApiRoot"
            className=" bg-[#e7ecff] grid grid-rows-2 w-3/5 px-3 rounded-[50px] h-[340px]">
            <div className="grid grid-flow-col-dense">
                <div className="flex items-center justify-center">
                    <img
                        src={weatherIcons.sunny}
                        id="Sunny"
                        className="top-0 left-0"
                    />
                </div>
                <div className="text-xs col-span-3 flex items-center">
                    {/* temporary solution */}
                    Temperature:
                    <br />
                    Humidity:
                    <br />
                    Wind:
                </div>
            </div>
            <div
                id="WeatherPrediction"
                className="grid grid-cols-7">
                {WeatherElement({ weatherType: "partialcloud", tempText: tempText })}
                {WeatherElement({ weatherType: "mostlycloudy", tempText: tempText })}
                {WeatherElement({ weatherType: "stormy", tempText: tempText })}
                {WeatherElement({ weatherType: "rainyday", tempText: tempText })}
                {WeatherElement({ weatherType: "snow", tempText: tempText })}
                {WeatherElement({ weatherType: "heavywind", tempText: tempText })}
                {WeatherElement({ weatherType: "hailstorm", tempText: tempText })}
            </div>
        </div>
    )
}