import { TypeButton } from "./TypeButton";

export function SelectGraphType({ activeType, setActiveType }) {

    function onTypeClicked(type) {
        if (activeType.includes(type)) {
            // If the clicked button is already active, deactivate it
            setActiveType(activeType.filter((active) => active !== type));
        } else {
            // Otherwise, activate the button
            setActiveType([...activeType, type]);
        }
    }
    return (
        <div className="flex flex-col gap-6 w-[250px]">
            <div className="text-center text-xl font-sans font-semibold">
                Select graph type
            </div>
            <div className="graph-type-container shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)]">
                {['Weight', 'Temperature', 'Weather', 'Notes'].map((type, index) => (
                    <TypeButton key={index} type={type} onTypeClicked={onTypeClicked} activeType={activeType} />
                ))}
            </div>
        </div>
    )
}