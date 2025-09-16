import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchArticles, exploreGraph, saveExploration, deleteExploration, fetchExplorations } from './services/apiService';
import ForceGraph2D from 'react-force-graph-2d';
import MyExplorations from './components/MyExplorations';

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

interface Exploration {
  _id: string;
  title: string;
  summary: string;
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
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [explorations, setExplorations] = useState<Exploration[]>([]);
  const [showExplorations, setShowExplorations] = useState<boolean>(false);

  useEffect(() => {
    // Fetch saved explorations
    const fetchAllExplorations = async () => {
      try {
        const response = await fetchExplorations();
        const sanitizedData = response.map((exploration: Exploration) => ({
          ...exploration,
          title: sanitizeText(exploration.title),
          summary: sanitizeText(exploration.summary)
        }));
        setExplorations(sanitizedData);
      } catch (err) {
        console.error('Failed to fetch explorations:', err);
        setError('Failed to fetch explorations');
      }
    };
    fetchAllExplorations();
  }, []);

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

  const handleNodeClick = (node: Node) => {
    console.log('Node clicked:', node);
    setSelectedNode(node);
    console.log('Selected node:', selectedNode);
  };

  const expandNode = async (node: Node) => {
    setLoading(true);
    setError(null);
    try {
      const data = await exploreGraph(node.label, 1);
      setNodes((prevNodes) => [...prevNodes, ...data.nodes]);
      setEdges((prevEdges) => [...prevEdges, ...data.edges]);
    } catch (err) {
      setError('Failed to expand node');
    } finally {
      setLoading(false);
    }
  };

  const sanitizeText = (text: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <header className="App-header">
          <h1>El Grafo de Conocimiento</h1>
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
            <button onClick={() => setShowExplorations(true)} disabled={loading}>
              Exploraciones
            </button>
            <button onClick={() => window.location.reload()} disabled={loading}>
              Refrescar
            </button>
          </div>
          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="articles-list">
            {articles.map((article) => (
              <div key={article.id} onClick={() => handleExplore(article.title)}>
                <h3>{sanitizeText(article.title)}</h3>
                <p>{sanitizeText(article.summary)}</p>
              </div>
            ))}
          </div>
          <div className="graph-visualization">
            <ForceGraph2D
              graphData={{ nodes, links: edges }}
              nodeLabel="label"
              linkDirectionalArrowLength={3.5}
              linkDirectionalArrowRelPos={1}
              linkCurvature={0.25}
              onNodeClick={handleNodeClick}
            />
          </div>
          {showExplorations && (
            <MyExplorations 
              explorations={explorations} 
              handleExplore={handleExplore} 
              deleteExploration={deleteExploration} 
              sanitizeText={sanitizeText} 
              onClose={() => setShowExplorations(false)} 
            />
          )}
        </main>
      </div>
      <div className={`sidebar ${selectedNode ? 'visible' : ''}`}>
        {selectedNode && (
          <div className="node-summary">
            <h3>{selectedNode.label}</h3>
            <button onClick={() => expandNode(selectedNode)}>Expandir Nodo</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
