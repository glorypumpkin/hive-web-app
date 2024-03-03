import { assignFloors } from "@/lib/isOverlapping";
import { set } from "date-fns";
import { Fragment, useState, useEffect } from "react";
import { createPortal } from 'react-dom';

export function NoteAreaGraph({ dateFrom, dateTo, allNotes }) {
    const [noteCoordinates, setNoteCoordinates] = useState({});
    const [line, setLine] = useState(null);
    const [showNoteText, setShowNoteText] = useState(false);
    const [hoveredNote, setHoveredNote] = useState(null);


    useEffect(() => {
        const selectedLine = document.querySelector('.recharts-cartesian-grid-horizontal line:first-child')
        if (selectedLine != line) {
            setLine(selectedLine);
        }
    });

    let notesParent = null;
    if (line) {
        const x1 = line.getAttribute('x1');
        const y1 = line.getAttribute('y1');
        const x2 = line.getAttribute('x2');
        const y2 = line.getAttribute('y2');
        const coordinates = { x1, y1, x2, y2 };
        if (coordinates.x1 !== noteCoordinates.x1 || coordinates.y1 !== noteCoordinates.y1 || coordinates.x2 !== noteCoordinates.x2 || coordinates.y2 !== noteCoordinates.y2) {
            setNoteCoordinates(coordinates);
        }
        notesParent = line.parentElement;
    }



    const { x1, x2, y1, y2 } = noteCoordinates;
    const width = x2 - x1;
    const fullHeight = 90;
    const floorHeight = 30
    const y = y1 - fullHeight;

    const dateFromMilliseconds = dateFrom.getTime();
    const dateToMilliseconds = dateTo.getTime();

    const relevantNotes = [];

    for (let i = 0; i < allNotes.length; i++) {
        const note = allNotes[i];
        const noteFrom = note.dateFrom;
        const noteTo = note.dateTo;

        if (noteFrom >= dateFromMilliseconds && noteTo <= dateToMilliseconds) {
            relevantNotes.push({ ...note });
        }
    }

    assignFloors(relevantNotes);

    const handleMouseEnter = (noteText) => () => {
        setShowNoteText(true);
        setHoveredNote(noteText);
    }

    const handleMouseLeave = () => {
        setShowNoteText(false);
        setHoveredNote(null);
    }

    const noteArea = relevantNotes.map((note, index) => {
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
    })



    return (
        <>
            {notesParent && createPortal(
                <foreignObject x={x1} y={y} width={width} height={fullHeight}>
                    <div className="h-full relative">
                        {noteArea}
                    </div>
                </foreignObject>
                , notesParent)}
        </>
    )

}
