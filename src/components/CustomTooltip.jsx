
export function CustomTooltip({ active, payload, label, activeType, units }) {
    if (active) {
        console.log('payload', payload)
        // if payload[1] exists, show the tooltip for the comparison graph
        if (payload[1]) {
            return (
                <div className="custom-tooltip">
                    <p>{`${payload[0].payload.day}, ${payload[0].payload.hour}, ${payload[0].payload.year}`}</p>
                    {activeType.map((type, index) => (
                        <p key={index}>{`${type}: ${payload[0].payload[type]} ${units[type]}`}</p>
                    ))}
                    <p>{`Comparison to last year, ${payload[1].payload.day}, ${payload[1].payload.hour}, ${payload[1].payload.year}`}</p>
                    {activeType.map((type, index) => (
                        <p key={index}>{`${type}: ${payload[1].payload[type]} ${units[type]}`}</p>
                    ))}
                </div>
            );
        }
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