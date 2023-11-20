const periods = ['This day', '7 days', '21 days', 'Month', '1 cvartal', '2 cvartal', '3 cvartal', '4 cvartal', 'Year'];

export function HistoryLine({ activePeriodButton, setActivePeriodButton }) {

    function OnPeriodClicked(period) {
        setActivePeriodButton(period);
    }

    return (
        <div className="shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)] overflow-hidden flex flex-row mx-2 rounded-[50px] h-16">
            {periods.map((period, index) => (

                <button key={index} className={`history-container font-sans font-light ${activePeriodButton === period ? 'bg-[#3877b53b]' : ''}`}
                    onClick={() => OnPeriodClicked(period)}
                >{period}</button>

            ))}
        </div>
    )
}