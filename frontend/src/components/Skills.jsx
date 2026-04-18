import React from 'react';

const Skills = () => {
  const skillCategories = [
    { name: 'Frontend', icon: '💻', skills: ['React', 'JavaScript', 'HTML5', 'CSS3'] },
    { name: 'Backend', icon: '⚙️', skills: ['Node.js', 'Express', 'PostgreSQL'] },
    { name: 'Herramientas', icon: '🛠️', skills: ['Git', 'Vite', 'VS Code'] },
    { name: 'Diseño', icon: '🎨', skills: ['Figma', 'Responsive Design'] }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">Habilidades Técnicas</h2>
        <div className="skills-grid">
          {skillCategories.map((cat, index) => (
            <div key={index} className="skill-card animate-fade" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="skill-icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
              <div className="project-tags" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                {cat.skills.map((skill, i) => (
                  <span key={i} className="tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
