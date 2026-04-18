import React from 'react';

const Hobbies = () => {
  const hobbies = [
    { name: 'Ciencia Ficción', icon: '🚀' },
    { name: 'Videojuegos', icon: '🎮' },
    { name: 'Basketball', icon: '🏀' },
    { name: 'Cocina', icon: '👨‍🍳' },
    { name: 'Playa', icon: '🏖️' }
  ];

  return (
    <section id="hobbies" className="hobbies-section">
      <div className="container">
        <h2 className="section-title">Mis Hobbies</h2>
        <div className="hobbies-grid">
          {hobbies.map((hobby, index) => (
            <div key={index} className="hobby-item animate-fade" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="hobby-icon">{hobby.icon}</span>
              <p style={{ fontWeight: 600, color: 'var(--color-text)' }}>{hobby.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
