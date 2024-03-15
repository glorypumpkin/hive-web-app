'use client'
import { useState, useEffect, createContext, useContext } from 'react';

const notesContext = createContext({
    allNotes: [],
    setNotesAndPersist: () => { },
    deleteNote: () => { },
    deleteAllNotes: () => { }
});

export function NotesProvider({ children }) {
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
        console.log('notes setter', notes)
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
        setNotesAndPersist(updatedNotes);
        console.log('updatedNotes', updatedNotes)
    }
    return (
        <notesContext.Provider value={{ allNotes, setNotesAndPersist, deleteNote, deleteAllNotes }}>
            {children}
        </notesContext.Provider>
    );
}

export function useUserNotes() {
    const { allNotes, setNotesAndPersist, deleteNote, deleteAllNotes } = useContext(notesContext);
    console.log('new notes state', allNotes)
    return { allNotes, setNotesAndPersist, deleteNote, deleteAllNotes };
}