import { useState } from 'react';
import { useUserNotes } from '@/lib/useUserNotes';

const colors = {
    red: 'bg-red-300',
    green: 'bg-green-300',
    blue: 'bg-blue-300',
};

export function NoteAreaCalendar({ showNote, setShowNote, range, setActiveShowButton, activeShowButton }) {
    const [noteColor, setNoteColor] = useState('red');
    const [noteText, setNoteText] = useState('');
    const { allNotes, setNotesAndPersist } = useUserNotes();

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
            id: allNotes.length,
            dateFrom: range.from.getTime(),
            dateTo: noteTo.getTime(),
            color: noteColor,
            noteText: noteText
        };
        setNotesAndPersist([...allNotes, note]);
        setShowNote(false);

    }
    function onShowOnGraphClick() {
        setActiveShowButton(!activeShowButton);
    }

    function onTextChange(e) {
        setNoteText(e.target.value);
    }

    const noteArea = (
        <div>
            <textarea className="flex rounded-[15px] pl-1 resize-both" placeholder="Add a note..."
                onChange={onTextChange} value={noteText}
            ></textarea>
            <div className="flex flex-row items-center justify-between">
                <div className="flex justify-between gap-2 pl-1 items-center">
                    {Object.entries(colors).map(([color, colorClass]) => (
                        <input type="radio" key={color} className={`${colorClass} checked:w-3 checked:h-3 checked:border-solid checked:border checked:border-gray-300 color-note-button`} name="color" value={color} onClick={() => handleColorClick(color)} />
                    ))}
                </div>
                <button className="bg-[#1976d214] rounded-[15px] px-2 mt-1 font-semibold hover:-bg--hover-color"
                    onClick={onSaveClick}
                >Uložit</button>
            </div>
        </div>
    )

    return (
        <div className="items-center gap-2">
            <div className="flex justify-center pb-1">

                <button disabled={disabled}
                    className={disabled ? 'opacity-50' : 'opacity-100'}
                    title="Zobrazit na grafu"
                    onClick={onShowOnGraphClick}
                >
                    <img
                        src="/graph.png"
                        className=" w-8 h-8"
                    />
                </button>
                <button disabled={disabled}
                    className={disabled ? 'opacity-50' : 'opacity-100'}
                    title="Přidat poznámku"
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