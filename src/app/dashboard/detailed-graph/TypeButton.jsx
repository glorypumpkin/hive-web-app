
export function TypeButton({ type, onTypeClicked, activeType, czechTypes }) {
    const typeLowerCase = czechTypes[type].toLowerCase();
    return (
        <div className="graph-checkbox">
            <input
                type="checkbox" className="type-button"  //change to checkbox
                checked={activeType.includes(typeLowerCase)}
                onChange={() => { onTypeClicked(typeLowerCase) }
                }
            ></input>
            <div className="font-sans">{type}</div>
        </div>
    )
}

