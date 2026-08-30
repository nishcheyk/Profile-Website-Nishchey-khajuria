import React from "react";
import { motion } from "framer-motion";
import { experiences } from "../../data/constants";

const Experience = () => {
  return (
    <section id="experience" className="w-full relative z-10 pt-32">
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-20"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          Experience
        </h2>
        <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
      </motion.div>

      <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-16">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className="absolute w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] -left-[9px] top-1.5 ring-4 ring-black" />
            
            <div className="glass-card p-6 md:p-8 hover:bg-white/[0.05] transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                <div className="flex items-center gap-4">
                  {exp.logo && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 p-2 shrink-0">
                      <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">{exp.role}</h3>
                    <p className="text-lg text-blue-400 font-medium">{exp.company}</p>
                  </div>
                </div>
                <div className="text-white/40 font-mono text-sm tracking-widest uppercase py-1 px-3 rounded-full border border-white/10 bg-white/5 whitespace-nowrap self-start">
                  {exp.duration}
                </div>
              </div>
              
              <ul className="space-y-3 mt-6">
                {exp.points.map((point, idx) => (
                  <li key={idx} className="flex gap-3 text-white/60 font-light leading-relaxed">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
