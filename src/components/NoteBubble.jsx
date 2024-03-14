import { format } from "date-fns";
import { Fragment, useState } from "react";
import { useUserNotes } from "@/lib/useUserNotes";

export function NoteBubble({ note, dateFromMilliseconds, dateToMilliseconds, floorHeight, index }) {
    const [showNoteText, setShowNoteText] = useState(false);
    const [hoveredNote, setHoveredNote] = useState(null);
    const [expandedNote, setExpandedNote] = useState(false);
    const [noteTextChanged, setNoteTextChanged] = useState('');
    const { allNotes, setAllNotes, deleteNote } = useUserNotes();

    const noteFrom = note.dateFrom
    const noteTo = note.dateTo;
    const noteColor = note.color;
    const noteText = note.noteText;
    const noteFloor = note.floor;
    const noteID = note.id;

    // const graphWidth = (dateToMilliseconds - dateFromMilliseconds);
    // console.log(graphWidth)

    let backgroundColor;

    if (noteColor === 'red') {
        backgroundColor = '#f1bed8';
    } else if (noteColor === 'green') {
        backgroundColor = '#d8f1be';
    } else if (noteColor === 'blue') {
        backgroundColor = '#bed8f1';
    }

    const noteStartOffset = (noteFrom - dateFromMilliseconds) / (dateToMilliseconds - dateFromMilliseconds) * 100;
    const noteWidth = (noteTo - noteFrom) / (dateToMilliseconds - dateFromMilliseconds) * 100;

    const remainingWidth = 100 - (noteStartOffset + noteWidth);

    const renderedHeight = (noteFloor + 1) * floorHeight;
    const zIndex = 100 - noteFloor;


    const calculateExpandedNotePosition = () => {
        // if the remaining width is less than 17, move the note to the left
        if (remainingWidth < 17) {
            return noteTextStartOffset - 17
        } else {
            return noteTextStartOffset;
        }
    }

    const noteTextStartOffset = noteStartOffset + 1;
    const calculateHoveredNotePosition = () => {
        // if the remaining width is less than 10, move the note to the left
        if (remainingWidth < 10) {
            return noteTextStartOffset - 10;
        } else {
            return noteTextStartOffset;
        }

    }

    console.log('allNotes', allNotes)

    // if the note is hovered, show the note text
    const handleMouseEnter = (noteText) => () => {
        setShowNoteText(true);
        setHoveredNote(noteText);
    }

    const handleMouseLeave = () => {
        setShowNoteText(false);
        setHoveredNote(null);
    }

    // if the note is clicked, expand the note
    const handleNoteClick = () => {
        setExpandedNote(!expandedNote);
    }

    const handleNoteTextChange = (e) => {
        setNoteTextChanged(e.target.value);
    }

    function onCheckClick() {
        setExpandedNote(false);
        console.log(allNotes)
        // only update the note that was changed
        // explanation: map through all notes, if the noteText is the same as the noteText of the note that was changed, return the note with the new noteText, else return the note
        setAllNotes(allNotes.map(n => {
            if (n.noteText === noteText) {
                return { ...n, noteText: noteTextChanged }
            } else {
                return n;
            }
        }
        ));
    }

    return (
        <Fragment key={index}>
            <div style={
                {
                    backgroundColor: backgroundColor,
                    width: `${noteWidth}%`,
                    height: renderedHeight,
                    position: 'absolute',
                    left: `${noteStartOffset}%`,
                    bottom: 0,
                    zIndex: zIndex,
                }
            } key={index}
                className=" rounded-t-[5px]"
                onMouseEnter={handleMouseEnter(noteText)}
                onMouseLeave={handleMouseLeave}
                onClick={handleNoteClick}
            >
            </div>
            {showNoteText && hoveredNote === noteText &&
                <div
                    style={
                        {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: renderedHeight,
                            // minWidth: `${noteWidth / 2}%`,
                            backgroundColor: 'white',
                            position: 'absolute',
                            left: `${calculateHoveredNotePosition()}%`,
                            bottom: 50,
                            zIndex: 100,
                        }
                    }
                    className='rounded-[5px] shadow-[15px_15px_35px_-3px_rgba(46,_55,_84,_0.08)] px-2 py-1 overflow-hidden'
                >
                    {noteText}
                </div>
            }
            {expandedNote &&
                <div style={{ left: `${calculateExpandedNotePosition()}%` }}
                    className="absolute flex rounded-lg bottom-20 -bg--primary-color border-[1px] border-black">
                    <div className="flex flex-col">
                        <div className="flex justify-between gap-3 border-black border-b-[1px] ">
                            <div className=" font-medium px-2">{format(noteFrom, 'dd.LL')} - {format(noteTo, 'dd.LL')}</div>
                            <div className="flex gap-1 px-2">
                                <button onClick={onCheckClick}>
                                    <img src="/check.svg" className="w-6 h-6" />
                                </button>
                                <button onClick={() => deleteNote(noteID)}>
                                    <img src="/delete.svg" className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <textarea defaultValue={noteText} className="rounded-b-lg px-2 w-52" onChange={handleNoteTextChange} ></textarea>
                    </div>
                </div>
            }

        </Fragment >
    )
}