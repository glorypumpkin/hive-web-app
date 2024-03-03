import { Fragment, useState } from "react";

export function NoteBubble({ note, dateFromMilliseconds, dateToMilliseconds, floorHeight, index }) {
    const [showNoteText, setShowNoteText] = useState(false);
    const [hoveredNote, setHoveredNote] = useState(null);

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

    const handleMouseEnter = (noteText) => () => {
        setShowNoteText(true);
        setHoveredNote(noteText);
    }

    const handleMouseLeave = () => {
        setShowNoteText(false);
        setHoveredNote(null);
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
            >
            </div>
            {showNoteText && hoveredNote === noteText &&
                <div style={
                    {
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#e5e191', // Set background color for the message box
                        border: '1px solid #ceca82', // Add a border for the message box
                        padding: '8px', // Add padding for content inside the message box
                        borderRadius: '5px', // Add border radius for rounded corners
                        // text in box is in the center
                        height: renderedHeight,
                        position: 'absolute',
                        left: `${noteTextStartOffset}%`,
                        bottom: 50,
                        zIndex: 100,
                    }
                }>
                    {noteText}
                    <div style={
                        {
                            position: 'absolute',
                            bottom: '-10px',
                            left: '0',
                            borderTop: '15px solid transparent',
                            borderLeft: '10px solid #ceca82',
                            borderBottom: '10px solid transparent',
                            stroke: '#ccc',
                        }
                    }></div>
                </div>
            }
        </Fragment>
    )
}