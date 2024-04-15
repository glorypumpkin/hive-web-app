import { TypeButton } from "./TypeButton";
import { TextInfo } from "./TextInfo";

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
    const text = 'Select the type of graph you want to see. It can be a multiple selection.';
    return (
        <div className="flex flex-col gap-6 ">
            <div className="flex flex-row gap-2 items-center">
                <div className="text-center text-xl font-sans font-semibold">
                    Select graph type
                </div>
                <TextInfo text={text}></TextInfo>
            </div>
            <div className="graph-type-container shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)]">
                {['Weight', 'Temperature', 'Weather'].map((type, index) => (
                    <TypeButton key={index} type={type} onTypeClicked={onTypeClicked} activeType={activeType} />
                ))}
            </div>
        </div>
    )
}