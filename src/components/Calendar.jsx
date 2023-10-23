import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { useState } from 'react';
import { set } from "date-fns";

export function Calendar() {
    const [range, setRange] = useState();
    const [disabled, setDisabled] = useState(true);
    const [showNote, setShowNote] = useState(false);

    const css = `
    .date-picker-cont * {
        --rdp-accent-color: #95b1c8;
        --rdp-background-color: #95b1c8;
    }
    `
    function onDayClick(day, { selected }) {
        if (selected) {
            // setRange(undefined);
            setDisabled(true);
            setShowNote(false);
            return;
        }
        // setRange([day, day]);
        setDisabled(false); // TODO: fix bug with disabled button
    }

    const noteArea = (
        <div>
            <textarea className="flex rounded-[15px] pl-1" placeholder="Add a note..."></textarea>
        </div>
    )

    return (
        <div className="self-stretch flex flex-col gap-4 items-center">
            <div className="text-center text-xl font-sans font-semibold">
                Select needed date or interval
            </div>
            <div className="shadow-[11px_11px_26px_-2px_rgba(46,_55,_84,_0.08)] bg-[#1976d214] pb-4 px-6 rounded-[50px] date-picker-cont">
                <style>{css}</style>
                <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    toMonth={new Date()}
                    captionLayout="dropdown-buttons"
                    fromMonth={new Date(2021, 0)} //TODO: change later
                    showOutsideDays
                    onDayClick={onDayClick}
                />
            </div>
            <div className="flex gap-2">
                <button disabled={disabled}
                    className={disabled ? 'opacity-50' : 'opacity-100'}
                    title="Show on graph"
                >
                    <img
                        src="/graph.png"
                        className=" w-8 h-8"
                    />
                </button>
                <button disabled={disabled}
                    className={disabled ? 'opacity-50' : 'opacity-100'}
                    title="Add a note"
                    onClick={() => setShowNote(!showNote)}
                >
                    <img src="/note.png"
                    />
                </button>
                {showNote && noteArea}
            </div>
        </div>
    )
}
