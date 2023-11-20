
export function TypeButton({ type, onTypeClicked, activeType }) {
    const typeLowerCase = type.toLowerCase();
    return (
        <div className="graph-checkbox">
            <input
                type="checkbox" className="type-button"  //change to checkbox
                checked={activeType.includes(typeLowerCase)}
                onChange={() => { onTypeClicked(typeLowerCase) }
                }
            ></input>
            <div className="font-sans font-light">{type}</div>
        </div>
    )
}

