

export function NoteAreaGraph({ noteCoordinates, dateFrom, dateTo, allNotes }) {
    const { x1, x2, y1, y2 } = noteCoordinates;
    const width = x2 - x1;
    const height = 30;
    const y = y1 - height;

    const dateFromMilliseconds = dateFrom.getTime();
    const dateToMilliseconds = dateTo.getTime();

    const relevantNotes = [];

    console.log(`Rendering NoteAreaGraph with dateFrom: ${dateFrom} and dateTo: ${dateTo}`)

    for (let i = 0; i < allNotes.length; i++) {
        const note = allNotes[i];
        const noteFrom = note.dateFrom;
        const noteTo = note.dateTo;
        const noteColor = note.color;
        const noteText = note.noteText;

        const noteFromMilliseconds = noteFrom.getTime();
        const noteToMilliseconds = noteTo.getTime();

        if (noteFromMilliseconds >= dateFromMilliseconds && noteToMilliseconds <= dateToMilliseconds) {
            relevantNotes.push(note);
        }
    }
    console.log("relevantNotes", relevantNotes)

    const noteArea = relevantNotes.map((note, index) => {
        const noteFrom = note.dateFrom
        const noteTo = note.dateTo;
        const noteColor = note.color;
        const noteText = note.noteText;

        const noteFromMilliseconds = noteFrom.getTime();
        const noteToMilliseconds = noteTo.getTime();

        const noteStartOffset = (noteFromMilliseconds - dateFromMilliseconds) / (dateToMilliseconds - dateFromMilliseconds) * 100;
        const noteWidth = (noteToMilliseconds - noteFromMilliseconds) / (dateToMilliseconds - dateFromMilliseconds) * 100;

        return (
            <div style={
                {
                    backgroundColor: noteColor,
                    width: `${noteWidth}%`,
                    height: height,
                    position: 'absolute',
                    left: `${noteStartOffset}%`,
                    top: 0
                }
            } key={index}></div>
        )
    })

    return (
        <foreignObject x={x1} y={y} width={width} height={height}>
            <div className="bg-white h-full relative">
                {noteArea}
            </div>
        </foreignObject>
    )

}
