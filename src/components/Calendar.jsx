import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { useState } from 'react';


const colors = {
    red: 'bg-red-300',
    green: 'bg-green-300',
    blue: 'bg-blue-300',
};

function dateToYMD(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`;
}

export function Calendar({ allNotes, setAllNotes }) {
    const [range, setRange] = useState();
    const [showNote, setShowNote] = useState(false);
    const [noteColor, setNoteColor] = useState('red');
    const [noteText, setNoteText] = useState('');

    const css = `
    .date-picker-cont * {
        --rdp-accent-color: #95b1c8;
        --rdp-background-color: #95b1c8;
    }`

    const disabled = !range;

    const allNotesStyle = {
        red: {
            color: 'red'
        },
        green: {
            color: 'green'
        },
        blue: {
            color: 'blue'
        }
    };

    const allNoteMatcher = {
        red: [],
        green: [],
        blue: []
    };

    for (let i = 0; i < allNotes.length; i++) {
        const note = allNotes[i];
        const noteFrom = new Date(note.dateFrom);
        const noteTo = new Date(note.dateTo);

        const noteColor = note.color;

        const noteMatcher = {
            from: noteFrom,
            to: noteTo
        };

        allNoteMatcher[noteColor].push(noteMatcher); //TODO: change style for overlapping notes
    }

    console.log(range)

    const handleDayClick = (day, { selected }) => {
        if (selected) {
            setShowNote(false);
        }
    };

    const handleColorClick = (color) => {
        setNoteColor(color);
    };

    function onSaveClick() {

        let noteTo;

        if (range.to !== undefined) {
            noteTo = new Date(range.to);
        } else {
            noteTo = range.from;
        }

        const note = {
            dateFrom: dateToYMD(range.from),
            dateTo: dateToYMD(noteTo),
            color: noteColor,
            noteText: noteText
        };

        setAllNotes([...allNotes, note]);
    }

    const noteArea = (
        <div>
            <textarea className="flex rounded-[15px] pl-1 resize-both" placeholder="Add a note..."
                onChange={(e) => setNoteText(e.target.value)} value={noteText}
            ></textarea>
            <div className="flex flex-row items-center justify-between">
                <div className="flex justify-between gap-2 pl-1">
                    {Object.entries(colors).map(([color, colorClass]) => (
                        <button
                            key={color}
                            className={`${colorClass} color-note-button`}
                            onClick={() => handleColorClick(color)}
                        ></button>))}
                    {/* TODO: change to radio buttons */}
                </div>
                <button className="bg-[#1976d214] rounded-[15px] px-2 mt-1 font-semibold"
                    onClick={onSaveClick}
                >Save</button>
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
                    modifiers={allNoteMatcher}
                    modifiersStyles={allNotesStyle}
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
