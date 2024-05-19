
export function CustomTooltip({ active, payload, label, activeType, units }) {
    if (!active || !payload || !payload.length) {
        return null;
    }
    console.log('payload', payload)
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
    function renderComparison() {
        // if payload has a stroke value b7b5e7 or b4dfc4 (the comparison graph), show the comparison
        for (let i = 1; i < payload.length; i++) {
            // if the date in payload[i].payload.date is the same as the date in the next payload[i+1].payload.date, dont show the comparison
            const theOne = payload[i].name == "hmotnost před rokem" || payload[i].name == "teplota před rokem";

            if (!theOne) {
                continue;
            }
            return (
                <PayloadInfo payload={payload[i].payload} units={units} activeType={activeType} />
            )
        }
        return null
    }

    const showComparison = payload.some(p => p.name?.includes("rokem"));

    return (
        <div className="custom-tooltip capitalize flex flex-col gap-2">
            <PayloadInfo payload={payload[0].payload} image={image} units={units} activeType={activeType} />
            {showComparison && renderComparison()}
        </div>
    );
}

function PayloadInfo({ payload, image, units, activeType }) {

    let { day: date, hour, year } = payload;
    if (payload.timestamp) {
        const d = new Date(payload.timestamp);
        date = `${d.getDate()}.${d.getMonth() + 1}`
        hour = `${d.getHours()}:00`
        year = d.getFullYear();
    }

    return (
        <div>
            <div className="flex flex-row">
                <p>{`${date}, ${hour}, ${year}`}</p>
                {image}
            </div>
            {activeType.map((type, index) => {
                const value = payload[type];
                if (value === undefined) {
                    return null
                }
                return (
                    <p key={index}>{`${type}: ${payload[type]} ${units[type]}`}</p>
                );
            })}
        </div>
    );
}
