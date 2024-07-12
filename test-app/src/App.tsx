import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

import React, { useState } from 'react';

const CadastrarTarefa: React.FC = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoriaId, setCategoriaId] = useState('');

 const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('/api/tarefa/cadastrar', {
            nome,
            descricao,
            categoriaId,
            status: 'Não iniciada'
        })
        .then(response => console.log('Tarefa cadastrada:', response.data))
        .catch(error => console.error('Erro ao cadastrar tarefa:', error));
    };
    return (
        <div>
            <h1>Cadastrar Tarefa</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Categoria ID"
                    value={categoriaId}
                    onChange={e => setCategoriaId(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastrarTarefa;
