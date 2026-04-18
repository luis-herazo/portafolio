import React, { useState } from 'react';

const ProjectForm = ({ onProjectCreated }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    url: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/proyectos/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Detalle del error del servidor:', responseData);
        throw new Error(responseData.error || 'Error al crear el proyecto');
      }

      setMessage({ text: '¡Proyecto creado con éxito!', type: 'success' });
      setFormData({ titulo: '', descripcion: '', url: '' });
      
      // Notificar al componente padre para refrescar la lista
      if (onProjectCreated) {
        onProjectCreated(responseData);
      }

    } catch (error) {
      console.error('Error:', error);
      setMessage({ 
        text: `Error: ${error.message || 'Error al crear el proyecto'}`, 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="project-form-container">
      <h3>Añadir Nuevo Proyecto</h3>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="titulo">Título del Proyecto</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ej: Mi Portafolio React"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Cuéntanos de qué trata el proyecto..."
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL del Proyecto</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://github.com/tu-usuario/tu-proyecto"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Proyecto'}
        </button>

        {message.text && (
          <p className={`form-message ${message.type}`}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default ProjectForm;
