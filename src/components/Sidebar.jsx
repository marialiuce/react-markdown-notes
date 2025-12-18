import React from 'react';

const Sidebar = ({ notas, adicionarNota, notaAtiva, aoSelecionar, onDelete }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Minhas Notas</h1>
        <button className="btn-add" onClick={adicionarNota}>+</button>
      </div>
      
      <ul className="lista-notas">
        {notas.map((nota) => (
          <li 
            key={nota.id} 
            className={`item-nota ${nota.id === notaAtiva ? "ativa" : ""}`}
            onClick={() => aoSelecionar(nota.id)}
          >
            <div className="nota-conteudo">
                <h3>{nota.body.split('\n')[0] || "Nova Nota"}</h3>
                
                <button 
                    className="btn-delete"
                    onClick={(e) => onDelete(nota.id, e)}
                >
                    🗑️
                </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
