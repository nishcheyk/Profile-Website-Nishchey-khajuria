import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../../data/constants';

export default function BentoGrid() {
  return (
    <section id="skills" className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Enterprise Infrastructure.</h2>
        <p className="text-slate-500 text-lg">A unified ecosystem engineered for hyper-scale.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
        
        {/* Large Feature 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 20 }}
          className="md:col-span-2 md:row-span-2 rounded-3xl bg-slate-50 border border-slate-200 p-8 flex flex-col relative overflow-hidden group cursor-pointer"
        >
          <div className="z-10 relative">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-6">
              <span className="text-indigo-600 font-bold text-xl">AI</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Cognitive Engine</h3>
            <p className="text-slate-500 max-w-sm">Native integration with OpenAI and Qdrant. Context-aware RAG pipelines out of the box.</p>
          </div>
          <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-white rounded-tl-3xl border-t border-l border-slate-200 shadow-2xl p-6 translate-y-8 translate-x-8 group-hover:translate-y-4 transition-transform duration-500 ease-out">
            <div className="flex flex-col gap-4">
              <div className="h-8 w-3/4 bg-indigo-50 rounded-lg animate-pulse" />
              <div className="h-8 w-full bg-slate-100 rounded-lg" />
              <div className="h-8 w-5/6 bg-slate-100 rounded-lg" />
            </div>
          </div>
        </motion.div>

        {/* Small Feature 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 20, delay: 0.1 }}
          className="md:col-span-2 rounded-3xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow flex items-center gap-6"
        >
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2">99.9% Uptime</h3>
            <p className="text-slate-500 text-sm">Resilient backend architecture powered by FastAPI and Postgres.</p>
          </div>
          <div className="w-24 h-24 shrink-0 rounded-full border-4 border-green-100 flex items-center justify-center relative">
            <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-green-600 font-bold">100%</span>
          </div>
        </motion.div>

        {/* Small Feature 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 20, delay: 0.2 }}
          className="md:col-span-1 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 shadow-lg relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
          <h3 className="text-xl font-bold mb-2">Edge Ready</h3>
          <p className="text-indigo-100 text-sm">Deployed on Next.js Edge for zero latency.</p>
        </motion.div>

        {/* Small Feature 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 20, delay: 0.3 }}
          className="md:col-span-1 rounded-3xl bg-slate-900 text-white p-8 flex flex-col justify-between"
        >
          <div className="flex gap-2 flex-wrap">
            {skills.slice(0, 4).map((s, i) => (
              <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs font-mono">{s.title}</span>
            ))}
          </div>
          <h3 className="text-lg font-bold mt-4">Native Stack</h3>
        </motion.div>

      </div>
    </section>
  );
}
