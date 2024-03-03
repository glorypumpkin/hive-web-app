import { assignFloors } from "@/lib/isOverlapping";
import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import { NoteBubble } from "./NoteBubble";

export function NoteAreaGraph({ dateFrom, dateTo, allNotes }) {
    const [line, setLine] = useState(null);

    // Get the line element from the graph
    // line = dom element of the line in the graph
    // useEffect is called because the line is not available when the component is first rendered
    useEffect(() => {
        const selectedLine = document.querySelector('.recharts-cartesian-grid-horizontal line:first-child')
        if (selectedLine != line) {
            setLine(selectedLine);
        }
    });

    let x1, x2, y1, y2;
    let notesParent = null;
    if (line) {
        x1 = line.getAttribute('x1');
        y1 = line.getAttribute('y1');
        x2 = line.getAttribute('x2');
        y2 = line.getAttribute('y2');
        notesParent = line.parentElement;
    }

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


    const noteArea = relevantNotes.map((note, index) => {
        return (
            <NoteBubble note={note} dateFromMilliseconds={dateFromMilliseconds} dateToMilliseconds={dateToMilliseconds} floorHeight={floorHeight} key={index} />
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
