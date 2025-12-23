import React from 'react';

const Sidebar = ({ notas, adicionarNota, notaAtiva, aoSelecionar, onDelete }) => {
  
  const obterTitulo = (texto) => {
    const linhas = texto.split('\n');
    const primeiraLinha = linhas[0];
    return primeiraLinha.replace(/^#\s*/, '') || "Untitled Note";
  };

  const obterResumo = (texto) => {
    const linhas = texto.split('\n');
    return linhas[1] || "No content...";
  };

  return (
    <aside className="w-1/3 max-w-xs bg-sidebar-bg h-full overflow-y-auto p-5 rounded-2xl shadow-inner flex flex-col">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-text-primary font-bold text-lg tracking-tight">
          My notes
        </h2>
        <button 
          className="bg-brand-blue text-white w-8 h-8 rounded-full hover:bg-opacity-80 transition flex items-center justify-center text-xl shadow-md"
          onClick={adicionarNota}
          title="Create new note"
        >
          +
        </button>
      </div>
      
      <ul className="space-y-4 pb-4">
        {notas.map((nota) => (
          <li 
            key={nota.id}
            onClick={() => aoSelecionar(nota.id)}
            className={`
              relative p-4 rounded-lg shadow-sm cursor-pointer transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md
              bg-note-card text-text-primary
              ${nota.id === notaAtiva ? "ring-4 ring-brand-blue ring-opacity-50 scale-[1.02]" : ""}
            `}
          >
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-white/30 backdrop-blur-sm opacity-50 rotate-1"></div>

            <div className="mt-1">
                <h3 className="font-bold text-sm mb-1 truncate">
                    {obterTitulo(nota.body)}
                </h3>
                
                <p className="text-xs text-text-secondary opacity-80 line-clamp-2 h-8">
                    {obterResumo(nota.body)}
                </p>
            </div>

            <button 
                className="mt-3 text-[10px] font-bold bg-delete-btn text-white px-2 py-1 rounded shadow hover:bg-red-600 transition uppercase tracking-wider ml-auto block"
                onClick={(e) => onDelete(nota.id, e)}
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
