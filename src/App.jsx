import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { nanoid } from 'nanoid';
import './App.css'; 

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes-data');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  useEffect(() => {
    localStorage.setItem('notes-data', JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Note Title\nStart writing..."
    };
    setNotes([newNote, ...notes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes(oldNotes => {
      const newArray = [];
      for(let i = 0; i < oldNotes.length; i++) {
         const oldNote = oldNotes[i];
         if(oldNote.id === currentNoteId) {
             newArray.unshift({ ...oldNote, body: text });
         } else {
             newArray.push(oldNote);
         }
      }
      return newArray;
    });
  }

  function deleteNote(noteId, event) {
    event.stopPropagation();
    const newNotes = notes.filter(note => note.id !== noteId);
    setNotes(newNotes);
    
    if (noteId === currentNoteId) {
       const newId = newNotes.length > 0 ? newNotes[0].id : "";
       setCurrentNoteId(newId);
    }
  }

  function findCurrentNote() {
    return notes.find(note => note.id === currentNoteId) || notes[0];
  }

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col text-text-primary font-sans">
      
      <header className="bg-brand-blue p-6 text-center shadow-lg z-10 flex justify-between items-center">
        <div className="w-8"></div>
        <h1 className="text-white text-2xl font-bold tracking-wider uppercase drop-shadow-sm">
          My Notes in Markdown
        </h1>
        <div className="text-white text-sm opacity-80">v1.0</div>
      </header>

      <main className="flex-grow flex overflow-hidden p-6 gap-6">
        
        <Sidebar 
          notes={notes} 
          newNote={createNewNote} 
          currentNoteId={currentNoteId} 
          setCurrentNoteId={setCurrentNoteId}
          deleteNote={deleteNote}
        />

        {notes.length > 0 ? (
          <Editor 
            currentNote={findCurrentNote()} 
            updateNote={updateNote} 
          />
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center bg-brand-dark/50 rounded-xl border-2 border-dashed border-brand-blue/30 text-brand-blue p-10">
            <p className="text-xl font-medium opacity-80">Your desk is clean!</p>
            <button 
              onClick={createNewNote}
              className="mt-4 px-6 py-2 bg-brand-blue text-white rounded-lg hover:bg-opacity-90 transition-all"
            >
              Create first note
            </button>
          </div>
        )}
      
      </main>
    </div>
  );
}

export default App;
