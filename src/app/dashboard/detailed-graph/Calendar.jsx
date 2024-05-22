import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { useState } from 'react';
import { NoteAreaCalendar } from "./NoteAreaCalendar";
import { useUserNotes } from "@/lib/useUserNotes";
import { TextInfo } from "../../../components/TextInfo";
import { cs } from "date-fns/locale";

export function Calendar({ activeShowButton, setActiveShowButton, range, setRange }) {
    // const [range, setRange] = useState();
    const [showNote, setShowNote] = useState(false);
    const { allNotes } = useUserNotes();

    const css = `
    .date-picker-cont * {
        --rdp-accent-color: #95b1c8;
        --rdp-background-color: #95b1c8;
        text-transform: capitalize;
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

    console.log('range', range)

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
    const text = 'Vyberte potřebné datum nebo interval pro zobrazení grafu nebo přidání poznámky.'
    return (
        <div className="self-stretch flex flex-col gap-4 items-center">
            <div className="flex flex-row gap-2 items-center">
                <div className="text-center text-xl font-sans font-semibold">
                    Vyberte datum nebo interval
                </div>
                <TextInfo text={text}></TextInfo>
            </div>
            <div className="shadow-[11px_11px_26px_-2px_rgba(46,_55,_84,_0.08)] bg-[#1976d214] pb-4 px-6 rounded-[50px] date-picker-cont">
                <style>{css}</style>
                <DayPicker
                    locale={cs}
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    toMonth={new Date()}
                    captionLayout="dropdown-buttons"
                    fromMonth={new Date(2022, 0)}
                    showOutsideDays
                    onDayClick={handleDayClick}
                    modifiers={allNoteMatcher}
                    modifiersStyles={allNotesStyle}
                />
            </div>
            <NoteAreaCalendar setShowNote={setShowNote} showNote={showNote} range={range} setRange={setRange}
                activeShowButton={activeShowButton} setActiveShowButton={setActiveShowButton}
            ></NoteAreaCalendar>
        </div>
    )
}
