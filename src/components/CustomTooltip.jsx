
export function CustomTooltip({ active, payload, label, activeType, units }) {
    if (active) {
        if (payload.length === 0) {
            return null
        }
        // console.log('payload', payload)
        // if payload[1] exists, show the tooltip for the comparison graph
        const diff = payload[0].payload.rozdil || payload[0].payload.weightDiff
        let image = ''
        if (diff > 0) {
            image = <img src="/arrow-up.svg" alt="plus" />
        } else if (diff < 0) {
            image = <img src="/arrow-down.svg" alt="minus" />
        } else {
            image = <img src="/even.svg" alt="equal" />
        }
        function showComparison() {
            // if payload has a stroke value b7b5e7 or b4dfc4 (the comparison graph), show the comparison
            for (let i = 0; i < payload.length; i++) {
                // if the date in payload[i].payload.date is the same as the date in the next payload[i+1].payload.date, dont show the comparison
                if (payload[i + 2] && payload[i].payload.year === payload[i + 2].payload.year) {
                    return null
                }
                if (payload[i].stroke === '#b7b5e7' || payload[i].stroke === '#b4dfc4') {
                    return (
                        <div className="">
                            <p>{`${payload[i].payload.day}, ${payload[i].payload.hour}, ${payload[i].payload.year}`}</p>
                            {activeType.map((type, index) => (
                                <p key={index}>{`${type}: ${payload[i].payload[type]} ${units[type]}`}</p>
                            ))}
                        </div>
                    )
                }
            }
            return null
        }


        return (
            <div className="custom-tooltip capitalize">
                <div className="flex flex-row">
                    <p>{`${payload[0].payload.day}, ${payload[0].payload.hour}, ${payload[0].payload.year}`}</p>
                    {image}
                </div>
                {activeType.map((type, index) => (
                    <p key={index}>{`${type}: ${payload[0].payload[type]} ${units[type]}`}</p>
                ))}
                {showComparison()}
            </div>
        );
    }

}