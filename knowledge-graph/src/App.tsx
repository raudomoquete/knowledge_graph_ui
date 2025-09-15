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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchArticles(searchTerm);
      setArticles(result);
    } catch (err) {
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const handleExplore = async (articleTitle: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await exploreGraph(articleTitle, 1);
      setNodes(data.nodes);
      setEdges(data.edges);
    } catch (err) {
      setError('Failed to explore graph');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
       
        <h1>Vite + React + TypeScript</h1>
      </header>
      <main className="App-main">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Busca un artículo para iniciar la exploración"
          />
          <button onClick={handleSearch} disabled={loading}>
            Buscar
          </button>
        </div>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="articles-list">
          {articles.map((article) => (
            <div key={article.id} onClick={() => handleExplore(article.title)}>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </div>
          ))}
        </div>
        <div className="graph-visualization">
          {/* Aquí iría la lógica para renderizar el grafo usando los nodos y aristas */}
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </main>
    </div>
  );
}

export default App;
