import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchArticles, exploreGraph, saveExploration, deleteExploration } from './services/apiService';

interface Article {
  id: string;
  title: string;
  summary: string;
}

interface Node {
  id: string;
  label: string;
}

interface Edge {
  from: string;
  to: string;
}

function App() {
  const [count, setCount] = useState<number>(0);
  const [articles, setArticles] = useState<Article[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    fetchArticles('example').then(setArticles);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
        </div>
        <h1>Vite + React + TypeScript</h1>
      </header>
      <main className="App-main">
        <div className="card">
          <button onClick={() => setCount(count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </main>
    </div>
  );
}

export default App;
