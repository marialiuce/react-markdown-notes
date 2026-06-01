import React from 'react';

const Sidebar = ({ notes, newNote, currentNoteId, setCurrentNoteId, deleteNote }) => {
  
  const getNoteTitle = (text) => {
    const lines = text.split('\n');
    const firstLine = lines[0];
    return firstLine.replace(/^#\s*/, '') || "Untitled Note";
  };

  const getNoteSummary = (text) => {
    const lines = text.split('\n');
    return lines[1] || "No content...";
  };

  return (
    <aside className="w-1/3 max-w-xs bg-sidebar-bg h-full overflow-y-auto p-5 rounded-2xl shadow-inner flex flex-col">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-text-primary font-bold text-lg tracking-tight">
          My notes
        </h2>
        <button 
          className="bg-brand-blue text-white w-8 h-8 rounded-full hover:bg-opacity-80 transition flex items-center justify-center text-xl shadow-md"
          onClick={newNote}
          title="Create new note"
        >
          +
        </button>
      </div>
      
      <ul className="space-y-4 pb-4">
        {notes.map((note) => (
          <li 
            key={note.id}
            onClick={() => setCurrentNoteId(note.id)}
            className={`
              relative p-4 rounded-lg shadow-sm cursor-pointer transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md
              bg-note-card text-text-primary
              ${note.id === currentNoteId ? "ring-4 ring-brand-blue ring-opacity-50 scale-[1.02]" : ""}
            `}
          >
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-white/30 backdrop-blur-sm opacity-50 rotate-1"></div>

            <div className="mt-1">
                <h3 className="font-bold text-sm mb-1 truncate">
                    {getNoteTitle(note.body)}
                </h3>
                
                <p className="text-xs text-text-secondary opacity-80 line-clamp-2 h-8">
                    {getNoteSummary(note.body)}
                </p>
            </div>

            <button 
                className="mt-3 text-[10px] font-bold bg-delete-btn text-white px-2 py-1 rounded shadow hover:bg-red-600 transition uppercase tracking-wider ml-auto block"
                onClick={(e) => deleteNote(note.id, e)}
            >
                Remove
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
