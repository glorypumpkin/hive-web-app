const periods = ['Tento den', '7 dní', '21 dní', 'Měsíc', '1 kvartal', '2 kvartal', '3 kvartal', '4 kvartal', 'Rok'];

export function HistoryLine({ activePeriodButton, setActivePeriodButton, setActiveShowButton, activeShowButton }) {

    function OnPeriodClicked(period) {
        setActivePeriodButton(period);
        setActiveShowButton(false);
    }

    return (
        <div className=" overflow-x-auto">
            {/* shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)] */}
            <div className="  flex flex-row mx-2 rounded-[50px] h-16">
                {periods.map((period, index) => (

                    <button key={index} className={`common-button font-sans first:rounded-l-[50px] last:rounded-r-[50px] flex w-full min-w-[90px] flex-col ${activePeriodButton === period && !activeShowButton ? '-bg--hover-color' : ''}`}
                        onClick={() => OnPeriodClicked(period)}
                    >{period}</button>

                ))}
            </div>
        </div>
    )
}