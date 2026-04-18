import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (!isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">Luis Herazo</Link>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/proyectos">Proyectos</Link>
          <a href="#skills">Habilidades</a>
          
          <button 
            onClick={toggleTheme} 
            className="theme-toggle" 
            aria-label="Toggle theme"
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '1.2rem', 
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>

          {token ? (
            <button onClick={handleLogout} className="btn-contact" style={{ background: 'var(--color-accent)', border: 'none', cursor: 'pointer' }}>
              Cerrar Sesión
            </button>
          ) : (
            <Link to="/login" className="btn-contact">Admin</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
