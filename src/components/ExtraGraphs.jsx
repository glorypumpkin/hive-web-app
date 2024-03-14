export function ExtraGraphs({ setExtraGraphs, extraGraphs }) {

    const onExtraGraphsClicked = () => {
        setExtraGraphs(!extraGraphs);
    }

    const selectExtraGraphsType = extraGraphs ? (
        <div className="absolute mr-96 bottom-2 p-2">
            <div className="text-center font-sans font-semibold">
                Select type(s)
            </div>
            <div className="-bg--primary-color rounded-3xl flex flex-col p-2">
                {[{ type: 'Temperature' }, { type: 'Weather' }, { type: 'Weight' }].map((type, index) => (
                    <div className="graph-checkbox" key={index}>
                        <input
                            type="checkbox" className="type-button"
                        ></input>
                        <div className="font-sans font-light">{type.type}</div>
                    </div>
                ))}
            </div>
            <div className="flex flex-row items-center justify-center">
                <button>
                    <img src="/check.svg" alt="" className="w-6 h-6" />
                </button>
                <button>
                    <img src="/x.svg" alt="" className="w-6 h-6" />
                </button>
            </div>
        </div>
    ) : null;

    return (
        <div className=" w-full flex justify-center">
            {selectExtraGraphsType}
            <button className="shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)] flex flex-row gap-3 w-48 h-12 rounded-[50px] common-button relative"
                onClick={onExtraGraphsClicked}
            >
                <img
                    src="https://file.rendit.io/n/tCph0baGyDvCMUzNZVzt.svg"
                    className="w-4 shrink-0"
                />
                <div className="text-center font-sans">
                    Add extra graph
                </div>
            </button>
        </div>
    )
}
