import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
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
    const timeoutId = setTimeout(() => {
      console.log("💾 Salvando...");
      localStorage.setItem('notas-markdown', JSON.stringify(notas));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [notas]);

  function criarNovaNota() {
    const novaNota = {
      id: Date.now().toString(), 
      body: "# Título da Nota\nComece a escrever..."
    };
    setNotas([novaNota, ...notas]); 
    setNotaAtualId(novaNota.id);
  }

  function atualizarNota(textoDigitado) {
    setNotas(notasAntigas => notasAntigas.map(nota => {
      if (nota.id === notaAtualId) {
        return { ...nota, body: textoDigitado };
      }
      return nota;
    }));
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

  function encontrarNotaAtual() {
    return notas.find(nota => nota.id === notaAtualId) || notas[0];
  }
  return (
    <div className="app-container">
      <Sidebar 
        notas={notas} 
        adicionarNota={criarNovaNota} 
        notaAtiva={notaAtualId} 
        aoSelecionar={setNotaAtualId} 
        onDelete={deletarNota}
      />

      {notas.length > 0 ? (
        <>
          <Editor 
            texto={encontrarNotaAtual().body} 
            aoDigitar={atualizarNota} 
          />
          <div className="painel preview">
            <ReactMarkdown>{encontrarNotaAtual().body}</ReactMarkdown>
          </div>
        </>
      ) : (
        <div className="painel no-notes">
          <h1>Nenhuma nota selecionada</h1>
          <button className="btn-add" onClick={criarNovaNota}>Criar uma agora</button>
        </div>
      )}
    </div>
  );
}

export default App;