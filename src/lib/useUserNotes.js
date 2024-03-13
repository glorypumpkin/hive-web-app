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

    const deleteNote = (note) => {
        // TODO: implement
    }

    return { allNotes, setAllNotes: setNotesAndPersist, deleteAllNotes, deleteNote };
}