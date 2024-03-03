
export function CustomTooltip({ active, payload, label, activeType, units }) {
    if (active) {

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