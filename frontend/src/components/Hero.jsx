import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <span className="tag animate-fade" style={{ marginBottom: '1rem', display: 'inline-block' }}>Disponible para proyectos</span>
          <h1 className="animate-fade">
            Diseñando el <span style={{ color: 'var(--color-principal)' }}>Futuro</span> Digital
          </h1>
          <p className="subtitle animate-fade" style={{ animationDelay: '0.2s' }}>
            Luis Herazo • Desarrollador Full Stack
          </p>
          <p className="description animate-fade" style={{ animationDelay: '0.4s' }}>
            Transformo ideas complejas en interfaces intuitivas y funcionales. Especializado en crear experiencias web modernas, rápidas y escalables.
          </p>
          <div className="hero-actions animate-fade" style={{ animationDelay: '0.6s' }}>
            <a href="#projects" className="btn btn-primary">
              Explorar Proyectos
            </a>
            <a href="https://github.com/luis-herazo" target="_blank" rel="noopener noreferrer" className="project-link" style={{ marginLeft: '2rem' }}>
              Mi GitHub →
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper animate-fade" style={{ animationDelay: '0.3s' }}>
          <div className="hero-blob"></div>
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80" 
            alt="Luis Herazo Profile" 
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
