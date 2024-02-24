import { useState } from 'react';

const colors = {
    red: 'bg-red-300',
    green: 'bg-green-300',
    blue: 'bg-blue-300',
};

export function NoteAreaCalendar({ showNote, setShowNote, range, allNotes, setAllNotes, setActiveShowButton, activeShowButton }) {
    const [noteColor, setNoteColor] = useState('red');
    const [noteText, setNoteText] = useState('');

    const handleColorClick = (color) => {
        setNoteColor(color);
    };

    const disabled = !range

    function onSaveClick() {  //TODO: if there is no text - don't save

        let noteTo;

        if (range.to !== undefined) { //if there is only one date selected, there is no range.to
            noteTo = new Date(range.to);
        } else {
            noteTo = range.from;
        }

        const note = {
            dateFrom: range.from,
            dateTo: noteTo,
            color: noteColor,
            noteText: noteText
        };
        setAllNotes([...allNotes, note]);

    }
    function onShowOnGraphClick() {
        console.log(range.from, range.to);
        setActiveShowButton(!activeShowButton);
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
        <div className="items-center gap-2">
            <div className="flex justify-center pb-1">

                <button disabled={disabled}
                    className={disabled ? 'opacity-50' : 'opacity-100'}
                    title="Show on graph"
                    onClick={onShowOnGraphClick}
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
    )
}