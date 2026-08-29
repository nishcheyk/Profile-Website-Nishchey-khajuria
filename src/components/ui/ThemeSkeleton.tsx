import React from 'react';
import { Motion } from '../../animations/AnimatedComponents';

export const ThemeSkeleton = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0f172a] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_50%)]" />
      
      <Motion
        as="div"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <div className="text-white/80 font-mono text-sm tracking-widest uppercase animate-pulse">
            Initializing Core Systems
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full animate-bounce" />
          </div>
        </div>
      </Motion>
    </div>
  );
};
