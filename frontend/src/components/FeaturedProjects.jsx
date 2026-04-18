import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/proyectos');
        if (response.ok) {
          const data = await response.json();
          setProjects(data.slice(0, 3));
        } else {
          throw new Error();
        }
      } catch (error) {
        setProjects([
          { id: 1, titulo: 'E-commerce Platform', descripcion: 'Una plataforma completa con carrito de compras y pagos.', tags: ['React', 'Node.js', 'MongoDB'] },
          { id: 2, titulo: 'Weather App', descripcion: 'Aplicación que muestra el clima en tiempo real usando APIs.', tags: ['JavaScript', 'Vite', 'CSS'] },
          { id: 3, titulo: 'Task Manager', descripcion: 'Gestor de tareas con persistencia de datos local.', tags: ['React', 'LocalStorage'] }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <section id="projects" className="featured-projects">
      <div className="container">
        <div className="featured-header">
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 0 }}>Proyectos Destacados</h2>
          <Link to="/proyectos" className="btn-contact" style={{ textDecoration: 'none' }}>
            Ver todos los proyectos
          </Link>
        </div>
        <div className="project-grid" style={{ marginTop: '3rem' }}>
          {projects.map((project, index) => (
            <div key={project.id} className="project-card animate-fade" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="project-image-placeholder" style={{ background: `linear-gradient(135deg, var(--color-principal), var(--color-secundario))` }}>
                <span>{project.titulo.charAt(0)}</span>
              </div>
              <div className="project-info">
                <h3>{project.titulo}</h3>
                <p>{project.descripcion}</p>
                <div className="project-tags">
                  {(project.tags || ['Web', 'Dev']).map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
