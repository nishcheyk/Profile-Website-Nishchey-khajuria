import React from 'react';
import { motion } from 'framer-motion';

export function BrutalistTitle({ text, subtext }: { text: string, subtext?: string }) {
  return (
    <div className="flex flex-col justify-center h-full px-24 w-[100vw] snap-center shrink-0 group relative overflow-hidden bg-stone-100 text-stone-900 border-r-8 border-black">
      {/* Background massive number or letter */}
      <span className="absolute -right-20 -bottom-20 text-[40rem] font-black leading-none opacity-5 group-hover:scale-110 transition-transform duration-1000 select-none">
        {text.charAt(0)}
      </span>

      <motion.h1 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-8 relative z-10 hover:italic"
      >
        {text}
      </motion.h1>

      {subtext && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-2xl md:text-4xl font-medium tracking-tight max-w-3xl relative z-10 border-l-4 border-black pl-8"
        >
          {subtext}
        </motion.p>
      )}
    </div>
  );
}

export function BrutalistCard({ title, desc, link }: { title: string, desc: string, link?: string }) {
  return (
    <div className="flex flex-col justify-end h-full px-12 py-24 w-[50vw] md:w-[33vw] snap-center shrink-0 border-r-4 border-black group bg-white hover:bg-black hover:text-white transition-colors duration-500">
      <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">{title}</h3>
      <p className="text-xl md:text-2xl font-medium opacity-70 mb-8 max-w-lg">{desc}</p>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="text-lg font-bold tracking-widest uppercase border-b-2 border-current w-max pb-1 group-hover:text-red-500 transition-colors">
          View Work ↗
        </a>
      )}
    </div>
  );
}
