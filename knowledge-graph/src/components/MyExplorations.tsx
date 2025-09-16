import React from 'react';

interface Exploration {
  _id: string;
  title: string;
  summary: string;
}

interface MyExplorationsProps {
  explorations: Exploration[];
  handleExplore: (title: string) => void;
  deleteExploration: (id: string) => void;
  sanitizeText: (text: string) => string;
}

const MyExplorations: React.FC<MyExplorationsProps> = ({ explorations, handleExplore, deleteExploration, sanitizeText }) => {
  return (
    <div className="explorations" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h2>Mis Exploraciones</h2>
      <ul style={{ listStyleType: 'none', padding: 0, width: '80%' }}>
        {explorations.map((exploration) => (
          <li key={exploration._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <h3 style={{ flex: 1 }}>{sanitizeText(exploration.title)}</h3>
            <div>
              <button onClick={() => handleExplore(exploration.title)} style={{ marginRight: '10px' }}>Cargar</button>
              <button onClick={() => deleteExploration(exploration._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyExplorations;
