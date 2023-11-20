import { assignFloors } from "@/lib/isOverlapping";

export function NoteAreaGraph({ noteCoordinates, dateFrom, dateTo, allNotes }) {
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

        const noteFromMilliseconds = noteFrom.getTime();
        const noteToMilliseconds = noteTo.getTime();

        if (noteFromMilliseconds >= dateFromMilliseconds && noteToMilliseconds <= dateToMilliseconds) {
            relevantNotes.push({ ...note });
        }
    }
    console.log("relevantNotes", relevantNotes)

    assignFloors(relevantNotes);
    console.log("relevantNotes after assignFloors", relevantNotes)

    const noteArea = relevantNotes.map((note, index) => {
        const noteFrom = note.dateFrom
        const noteTo = note.dateTo;
        const noteColor = note.color;
        const noteText = note.noteText;
        const noteFloor = note.floor;

        const noteFromMilliseconds = noteFrom.getTime();
        const noteToMilliseconds = noteTo.getTime();

        const noteStartOffset = (noteFromMilliseconds - dateFromMilliseconds) / (dateToMilliseconds - dateFromMilliseconds) * 100;
        const noteWidth = (noteToMilliseconds - noteFromMilliseconds) / (dateToMilliseconds - dateFromMilliseconds) * 100;

        const renderedHeight = (noteFloor + 1) * floorHeight;
        const zIndex = 100 - noteFloor;
        return (
            <div style={
                {
                    backgroundColor: noteColor,
                    width: `${noteWidth}%`,
                    height: renderedHeight,
                    position: 'absolute',
                    left: `${noteStartOffset}%`,
                    bottom: 0,
                    zIndex: zIndex,
                }
            } key={index}
                className=" rounded-t-[5px]"
            ></div>
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
