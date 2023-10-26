import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { useState } from 'react';


const colors = {
    red: 'red',
    green: 'green',
    blue: 'blue',
};

export function Calendar() {
    const [range, setRange] = useState();
    const [disabled, setDisabled] = useState(true);
    const [showNote, setShowNote] = useState(false);
    const [noteColor, setNoteColor] = useState('');
    const [hasNote, setHasNote] = useState(false);
    const [noteDays, setNoteDays] = useState([]); //days with notes

    const css = `
    .date-picker-cont * {
        --rdp-accent-color: #95b1c8;
        --rdp-background-color: #95b1c8;
    }`

    const noteDaysStyle = {
        color: noteColor
    };


    const handleDayClick = (day, { selected }) => {
        if (selected) {
            setDisabled(true);
            setShowNote(false);
            console.log(range);
        } else {
            setDisabled(false);
        }
    };

    const handleColorClick = (color,) => {
        setNoteColor(color);
        setNoteDays(range); //TODO: only one color at a time, change it later
        setHasNote(true);
    };

    const noteArea = (
        <div>
            <textarea className="flex rounded-[15px] pl-1 resize-both" placeholder="Add a note..."></textarea>
            <div className="flex flex-row items-center justify-between">
                <div className="flex justify-between gap-2 pl-1">
                    {Object.values(colors).map((color) => (
                        <button
                            key={color}
                            className={`bg-${color}-300 color-note-button`}
                            onClick={() => handleColorClick(color)}
                        ></button>))}
                </div>
                <button className="bg-[#1976d214] rounded-[15px] px-2 mt-1 font-semibold">Save</button>
            </div>
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
                    onDayClick={handleDayClick}
                    modifiers={{ hasNote: noteDays }}
                    modifiersStyles={{ hasNote: noteDaysStyle }}
                />
            </div>
            <div className="items-center gap-2">
                <div className="flex justify-center pb-1">

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
                </div>
                {showNote && noteArea}
            </div>
        </div>
    )
}
