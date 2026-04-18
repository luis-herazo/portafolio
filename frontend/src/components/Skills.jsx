import React from 'react';

const Skills = () => {
  const skillCategories = [
    { name: 'Backend', icon: '⚙️', skills: ['C#', 'Elixir', 'Python', 'PHP', 'Laravel', 'Node.js', 'JavaScript'] },
    { name: 'Frontend & UI', icon: '💻', skills: ['React', 'Flet', 'HTML5', 'CSS3'] },
    { name: 'Cloud Services', icon: '☁️', skills: ['AWS', 'Azure', 'Google Cloud', 'Serverless'] },
    { name: 'Arquitectura', icon: '🏛️', skills: ['Solution Architect', 'Microservicios', 'Clean Architecture'] }
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
