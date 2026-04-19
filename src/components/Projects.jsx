import React from "react";
import { projects } from "../constants";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./ProjectCard.css";

const Projects = () => {
  return (
    <div className="bg-transparent min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-white tracking-widest uppercase">
          My <span className="text-[#FB6D48]">Featured</span> Projects
        </h2>
        
        <div className="project-container">
          {projects.map((project, index) => (
            <div key={index} className="book">
              {/* Inside Page - Project Details */}
              <div className="book-content">
                <h3 className="book-title">{project.title}</h3>
                <p className="book-description">{project.description}</p>
                
                <div className="tech-stack flex-wrap">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="book-actions">
                  <a href={project.git} target="_blank" rel="noreferrer" className="action-btn github-btn">
                    {project.git?.includes("github.com") ? <FaGithub /> : <FaExternalLinkAlt />} 
                    {project.git?.includes("github.com") ? "Code" : "Visit"}
                  </a>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="action-btn live-btn">
                      <FaExternalLinkAlt /> Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Cover Page */}
              <div className="cover">
                <img 
                  src={project.image} 
                  alt={project.alt || project.title} 
                  className="cover-image"
                  onError={(e) => {
                    e.target.src = "/generic_fallback.png"; // Premium universal fallback
                  }}
                />
                <div className="cover-title">
                  <p>{project.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
