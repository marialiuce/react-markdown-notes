import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { nanoid } from 'nanoid';
import './App.css'; 

function App() {
  const [notas, setNotas] = useState(() => {
    const notasSalvas = localStorage.getItem('notas-markdown');
    return notasSalvas ? JSON.parse(notasSalvas) : [];
  });

  const [notaAtualId, setNotaAtualId] = useState(
    (notas[0] && notas[0].id) || ""
  );

  useEffect(() => {
    localStorage.setItem('notas-markdown', JSON.stringify(notas));
  }, [notas]);

  function criarNovaNota() {
    const novaNota = {
      id: nanoid(),
      body: "# Note Title\nStart writing..."
    };
    setNotas([novaNota, ...notas]);
    setNotaAtualId(novaNota.id);
  }

  function atualizarNota(texto) {
    setNotas(oldNotas => {
      const novaLista = [];
      for(let i = 0; i < oldNotas.length; i++) {
         const notaAntiga = oldNotas[i];
         if(notaAntiga.id === notaAtualId) {
             novaLista.unshift({ ...notaAntiga, body: texto });
         } else {
             novaLista.push(notaAntiga);
         }
      }
      return novaLista;
    });
  }

  function deletarNota(idDaNota, event) {
    event.stopPropagation();
    const novaLista = notas.filter(nota => nota.id !== idDaNota);
    setNotas(novaLista);
    if (idDaNota === notaAtualId) {
       const novoId = novaLista.length > 0 ? novaLista[0].id : "";
       setNotaAtualId(novoId);
    }
  }

  function encontrarNotaAtiva() {
    return notas.find(nota => nota.id === notaAtualId) || notas[0];
  }

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col text-text-primary font-sans">
      
      {/* Cabeçalho */}
      <header className="bg-brand-blue p-6 text-center shadow-lg z-10 flex justify-between items-center">
        <div className="w-8"></div> {/* Espaçador para centralizar o título */}
        <h1 className="text-white text-2xl font-bold tracking-wider uppercase drop-shadow-sm">
          My Notes in Markdown
        </h1>
        <div className="text-white text-sm opacity-80">v1.0</div>
      </header>

      {/* Área Principal */}
      <main className="flex-grow flex overflow-hidden p-6 gap-6">
        
        {/* Sidebar */}
        <Sidebar 
          notas={notas} 
          adicionarNota={criarNovaNota} 
          notaAtiva={notaAtualId} 
          aoSelecionar={setNotaAtualId}
          onDelete={deletarNota}
        />

        {/* Editor ou Tela de Boas-vindas */}
        {notas.length > 0 ? (
          <Editor 
            notaAtual={encontrarNotaAtiva()} 
            atualizarNota={atualizarNota} 
          />
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center bg-brand-dark/50 rounded-xl border-2 border-dashed border-brand-blue/30 text-brand-blue p-10">
            <p className="text-xl font-medium opacity-80">Your desk is clean!</p>
            <button 
              onClick={criarNovaNota}
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