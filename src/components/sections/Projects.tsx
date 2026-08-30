import React from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/constants";
import TiltCard from "../../features/Premium/TiltCard";

const Projects = () => {
  return (
    <section id="projects" className="w-full relative z-10 pt-20">
      
      {/* Animated Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-20 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          Featured Work
        </h2>
        <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
          A selection of projects that showcase my ability to build scalable, beautiful, and highly functional web applications.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          >
            <TiltCard className="h-full">
              <div className="flex flex-col h-full p-6 md:p-8">
                
                {/* Project Image */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 border border-white/10 group">
                  <img
                    src={project.image || "/generic_fallback.png"}
                    alt={project.alt || project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Project Content */}
                <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">{project.title}</h3>
                <p className="text-white/60 mb-6 font-light leading-relaxed flex-grow">
                  {project.description}
                </p>
                
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/10">
                  {project.technologies?.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/80 border border-white/10 backdrop-blur-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
      
    </section>
  );
};

export default Projects;
