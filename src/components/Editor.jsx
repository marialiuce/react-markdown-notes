import React from 'react';

const Editor = ({ texto, aoDigitar }) => {
  return (
    <textarea 
      className="painel editor"
      value={texto} 
      onChange={(e) => aoDigitar(e.target.value)}
      placeholder="Digite seu Markdown aqui..."
      autoFocus
    />
  );
};

export default Editor;