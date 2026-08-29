import React from 'react';
import { motion } from 'framer-motion';
import HeroDashboard from './HeroDashboard';
import { springStructural } from '../../../animations';

export const Hero = () => {
  return (
    <section className="px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center mt-12 mb-32 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={springStructural}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-8 shadow-sm"
      >
        <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
        Full Stack AI Infrastructure
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springStructural, delay: 0.1 }}
        className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 max-w-5xl leading-[1.1]"
      >
        Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">impossible</span> software at scale.
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springStructural, delay: 0.2 }}
        className="text-xl text-slate-500 max-w-2xl mb-12"
      >
        Full-stack MERN, FastAPI, and AI-driven RAG pipelines built for enterprise resilience and consumer-grade aesthetics.
      </motion.p>
      
      <HeroDashboard />
    </section>
  );
};
