import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Editor = ({ notaAtual, atualizarNota }) => {
    const [abaSelecionada, setAbaSelecionada] = useState("write");

    return (
        <section className="flex-grow flex flex-col h-full bg-brand-blue rounded-2xl shadow-inner overflow-hidden p-1">
            
            <div className="flex items-center justify-between px-4 py-3 bg-black/10 text-white">
                <div className="flex gap-2">
                    <button
                        onClick={() => setAbaSelecionada("write")}
                        className={`px-4 py-1 rounded-full text-sm font-bold transition-all ${
                            abaSelecionada === "write" 
                            ? "bg-white text-brand-blue shadow-sm" 
                            : "hover:bg-white/10 opacity-70"
                        }`}
                    >
                        Write
                    </button>
                    
                    <button
                        onClick={() => setAbaSelecionada("preview")}
                        className={`px-4 py-1 rounded-full text-sm font-bold transition-all ${
                            abaSelecionada === "preview" 
                            ? "bg-white text-brand-blue shadow-sm" 
                            : "hover:bg-white/10 opacity-70"
                        }`}
                    >
                        Preview
                    </button>
                </div>
                
                <span className="text-xs uppercase tracking-widest opacity-50 font-bold hidden sm:block">
                   Markdown Editor
                </span>
            </div>

            <div className="flex-grow bg-brand-dark/20 p-4 overflow-hidden relative">
                
                <textarea
                    value={notaAtual.body}
                    onChange={(event) => atualizarNota(event.target.value)}
                    placeholder="# Type your Markdown here..."
                    className={`
                        w-full h-full resize-none outline-none text-white p-4 font-mono leading-relaxed bg-transparent
                        ${abaSelecionada === "write" ? "block" : "hidden"}
                    `} 
                />

                <div className={`
                    w-full h-full overflow-y-auto prose prose-invert prose-headings:text-white prose-p:text-slate-200 pl-4
                    ${abaSelecionada === "preview" ? "block" : "hidden"}
                `}>
                    <ReactMarkdown>
                        {notaAtual.body}
                    </ReactMarkdown>
                </div>

            </div>
        </section>
    );
}

export default Editor;