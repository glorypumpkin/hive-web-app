
export function isOverlapping(note1, note2) {
    const min = (note1.dateFrom < note2.dateFrom) ? note1 : note2;
    const max = (note1.dateFrom >= note2.dateFrom) ? note1 : note2;

    return min.dateTo > max.dateFrom;
}

// returns what floor the note is on - adds new value "floor" to notes
export function assignFloors(notes) {
    notes.forEach((note, index) => {
        let floor = 0;
        for (let i = 0; i < index; i++) {
            if (isOverlapping(notes[i], note)) {
                floor++;
            }
        }
        note.floor = floor;
    });
}
