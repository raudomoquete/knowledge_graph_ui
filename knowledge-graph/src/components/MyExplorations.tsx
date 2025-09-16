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
  onClose: () => void;
}

const MyExplorations: React.FC<MyExplorationsProps> = ({ explorations, handleExplore, deleteExploration, sanitizeText, onClose }) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteExploration(id);
      alert('Exploración eliminada exitosamente');
      onClose(); // Cerrar el modal después de eliminar
    } catch (error) {
      alert('Error al eliminar la exploración');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Mis Exploraciones</h2>
        <ul style={{ listStyleType: 'none', padding: 0, width: '80%' }}>
          {explorations.map((exploration) => (
            <li key={exploration._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
              <h3 style={{ flex: 1 }}>{sanitizeText(exploration.title)}</h3>
              <div>
                <button onClick={() => handleExplore(exploration.title)} style={{ marginRight: '10px' }}>Cargar</button>
                <button onClick={() => handleDelete(exploration._id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyExplorations;
