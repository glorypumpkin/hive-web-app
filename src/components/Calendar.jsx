import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { useState, useEffect } from 'react';
import { NoteAreaCalendar } from "./NoteAreaCalendar";
import { dateFiltering } from '@/lib/dateFiltering';

function dateToYMD(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();

    return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`;
}

export function Calendar({ data, allNotes, setAllNotes, filteredNoteData, setFilteredNoteData }) {
    const [range, setRange] = useState();
    const [showNote, setShowNote] = useState(false);

    const css = `
    .date-picker-cont * {
        --rdp-accent-color: #95b1c8;
        --rdp-background-color: #95b1c8;
    }`

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

    const handleDayClick = (day, { selected }) => {
        if (selected) {
            setShowNote(false);
        }
    };

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
            <NoteAreaCalendar setShowNote={setShowNote} showNote={showNote} dateToYMD={dateToYMD} range={range} allNotes={allNotes} setAllNotes={setAllNotes}></NoteAreaCalendar>
        </div>
    )
}
