import React, { useState, useEffect } from "react";

import api from './services/api.js';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories',
      { title: `Novo Item ${Date.now()}`, url: 'http://github.com/tests/testjs', techs: ['NodeJS', 'ReactJS']});

    setRepositories([ ...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepositories = repositories.filter(
      repository => repository.id != id
    )

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
              <li key={repository.id}>
                {repository.title}

                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            )
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
