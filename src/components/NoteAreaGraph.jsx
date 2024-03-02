import { assignFloors } from "@/lib/isOverlapping";
import { set } from "date-fns";
import { Fragment, useState } from "react";

export function NoteAreaGraph({ noteCoordinates, dateFrom, dateTo, allNotes }) {
    const [showNoteText, setShowNoteText] = useState(false);
    const [hoveredNote, setHoveredNote] = useState(null);
    const { x1, x2, y1, y2 } = noteCoordinates;
    const width = x2 - x1;
    const fullHeight = 90;
    const floorHeight = 30
    const y = y1 - fullHeight;

    const dateFromMilliseconds = dateFrom.getTime();
    const dateToMilliseconds = dateTo.getTime();

    const relevantNotes = [];

    console.log(`Rendering NoteAreaGraph with dateFrom: ${dateFrom} and dateTo: ${dateTo}`)

    for (let i = 0; i < allNotes.length; i++) {
        const note = allNotes[i];
        const noteFrom = note.dateFrom;
        const noteTo = note.dateTo;

        if (noteFrom >= dateFromMilliseconds && noteTo <= dateToMilliseconds) {
            relevantNotes.push({ ...note });
        }
    }
    console.log("relevantNotes", relevantNotes)

    assignFloors(relevantNotes);
    console.log("relevantNotes after assignFloors", relevantNotes)


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
        <foreignObject x={x1} y={y} width={width} height={fullHeight}>
            <div className="h-full relative">
                {noteArea}
            </div>
        </foreignObject>
    )

}
