import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { springMomentum } from '../../../animations';
import { experiences } from '../../../data/constants';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % experiences.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);

  return (
    <section id="experience" className="py-32 px-6 max-w-5xl mx-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-50/50 -z-10 transform -skew-y-3 origin-top-left" />
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Professional Experience.</h2>
        <p className="text-slate-500 text-lg">Engineering intelligent systems across industry-leading teams.</p>
      </div>

      <div className="relative h-[300px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9, x: 100, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -100, rotateY: 15 }}
            transition={springMomentum}
            className="absolute w-full max-w-2xl bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 md:p-12 text-center flex flex-col items-center justify-center [transform-style:preserve-3d]"
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-3xl" />
            
            <p className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed mb-8 h-24 overflow-y-auto no-scrollbar">
              {experiences[currentIndex].points[0]}
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shadow-sm">
                 {experiences[currentIndex].logo && !experiences[currentIndex].logo.includes('simpleicons') ? (
                    <img src={experiences[currentIndex].logo} alt="logo" className="w-full h-full object-contain" />
                 ) : (
                    <div className="text-2xl font-black text-slate-300">{experiences[currentIndex].company.charAt(0)}</div>
                 )}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{experiences[currentIndex].company}</h4>
                <p className="text-sm text-slate-500">{experiences[currentIndex].role} • {experiences[currentIndex].duration}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-0 z-20 pointer-events-none">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-indigo-600 pointer-events-auto transition-colors"
          >
            ←
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-indigo-600 pointer-events-auto transition-colors"
          >
            →
          </motion.button>
        </div>
      </div>
    </section>
  );
}
