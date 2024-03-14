import { useState, useEffect } from 'react';

export function useUserNotes() {
    const [allNotes, setAllNotes] = useState([]);
    // Fetch notes from the server
    useEffect(() => {
        // This function is used for async/await syntax
        async function fetchNotes() {
            const response = await fetch('/api/notes');
            const data = await response.json();
            setAllNotes(data);
        }
        fetchNotes();
    }, []);

    const setNotesAndPersist = (notes) => {
        setAllNotes(notes);
        fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notes)
        });
    }

    const deleteAllNotes = () => {
        setAllNotes([]);
        fetch('/api/notes', {
            method: 'DELETE'
        });
    }

    const deleteNote = (noteID) => {
        // TODO: implement
        // delete only one chosen note
        const updatedNotes = allNotes.filter(note => note.id !== noteID);
        setAllNotes(updatedNotes);
        console.log('updatedNotes', updatedNotes)
        console.log('allNotes', allNotes)
        fetch('/api/notes', {
            method: 'DELETE',
        }).then(response => {
            if (response.ok) {
                console.log(`Note with ID ${noteID} deleted successfully.`);
            } else {
                console.error(`Failed to delete note with ID ${noteID}.`);
            }
        }).catch(error => {
            console.error(`Error deleting note with ID ${noteID}: ${error.message}`);
        });
    }

    return { allNotes, setAllNotes: setNotesAndPersist, deleteAllNotes, deleteNote };
}