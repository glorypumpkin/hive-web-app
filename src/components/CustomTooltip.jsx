
export function CustomTooltip({ active, payload, label, activeType, units }) {
    if (active) {
        // console.log('payload', payload)
        // if payload[1] exists, show the tooltip for the comparison graph
        const diff = payload[0].payload.rozdil
        let image = ''
        if (diff > 0) {
            image = <img src="/arrow-up.svg" alt="plus" />
        } else if (diff < 0) {
            image = <img src="/arrow-down.svg" alt="minus" />
        } else {
            image = <img src="/even.svg" alt="equal" />
        }
        const showComparison = () => (
            payload[1] && (
                <div className="">
                    <p>{`${payload[1].payload.day}, ${payload[1].payload.hour}, ${payload[1].payload.year}`}</p>
                    {activeType.map((type, index) => (
                        <p key={index}>{`${type}: ${payload[1].payload[type]} ${units[type]}`}</p>
                    ))}
                </div>
            )
        )

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