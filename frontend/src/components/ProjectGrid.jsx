import React, { useEffect, useState } from 'react';
import ProjectForm from './ProjectForm';

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/proyectos');
      
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([
        { id: 1, titulo: 'Proyecto Mock 1', descripcion: 'Ejemplo de proyecto 1', url: 'https://github.com' },
        { id: 2, titulo: 'Proyecto Mock 2', descripcion: 'Ejemplo de proyecto 2', url: 'https://github.com' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectCreated = (newProject) => {
    // Actualizar la lista localmente
    setProjects(prev => [newProject, ...prev]);
  };

  const token = localStorage.getItem('token');

  if (loading) return <div className="container" style={{ color: 'white', padding: '5rem 0' }}>Cargando proyectos...</div>;

  return (
    <section className="projects">
      <div className="container">
        
        {/* Formulario para añadir nuevos proyectos - Solo si está logueado */}
        {token && <ProjectForm onProjectCreated={handleProjectCreated} />}

        <h2 className="section-title">Mis Proyectos</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <div key={project.id || project._id} className="project-card">
              <div className="project-image-placeholder">
                <span>P</span>
              </div>
              <div className="project-info">
                <h3>{project.titulo || 'Sin Título'}</h3>
                <p>{project.descripcion || 'Sin descripción disponible.'}</p>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                    Ver Proyecto →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
