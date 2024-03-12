import { format } from "date-fns";
import { Fragment, useState } from "react";

export function NoteBubble({ note, dateFromMilliseconds, dateToMilliseconds, floorHeight, index }) {
    const [showNoteText, setShowNoteText] = useState(false);
    const [hoveredNote, setHoveredNote] = useState(null);
    const [expandedNote, setExpandedNote] = useState(false);
    const [noteTextChanged, setNoteTextChanged] = useState('');

    const noteFrom = note.dateFrom
    const noteTo = note.dateTo;
    const noteColor = note.color;
    const noteText = note.noteText;
    const noteFloor = note.floor;

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

    const renderedHeight = (noteFloor + 1) * floorHeight;
    const zIndex = 100 - noteFloor;

    const noteTextStartOffset = noteStartOffset + 1;

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
                            minWidth: `${noteWidth / 2}%`,
                            backgroundColor: 'white',
                            position: 'absolute',
                            left: `${noteTextStartOffset}%`,
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
                <div style={{ left: `${noteStartOffset}%` }}
                    className="absolute flex rounded-lg bottom-20 -bg--primary-color border-[1px] border-black">
                    <div className="flex flex-col">
                        <div className="flex justify-between gap-3 border-black border-b-[1px] rounded-lg">
                            <div className=" font-medium px-2">{format(noteFrom, 'dd.LL')} - {format(noteTo, 'dd.LL')}</div>
                            <div className="flex gap-1 px-2">
                                <button>
                                    <img src="/check.svg" className="w-6 h-6" />
                                </button>
                                <button>
                                    <img src="/delete.svg" className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <textarea defaultValue={noteText} value={noteTextChanged} className="rounded-b-lg px-2" onChange={handleNoteTextChange}></textarea>
                    </div>
                </div>
            }

        </Fragment >
    )
}