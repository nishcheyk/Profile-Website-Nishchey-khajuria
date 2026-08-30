import React from 'react';
import { motion } from 'framer-motion';

export default function ArcadeMenu({ onSelectGame }: ArcadeMenuProps) {
  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden font-mono">
      {/* Background Arcade Vibes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-black pointer-events-none" />
      
      {/* Grid Floor */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(to_top,rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(99,102,241,0.8)]">
          ARCADE HUB
        </h1>
        <p className="text-slate-400 mt-4 tracking-widest uppercase text-sm">Select Your Experience</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 z-10 px-4 w-full max-w-5xl justify-center">
        {/* Game 1: Space Shooter */}
        <motion.button
          onClick={() => onSelectGame('shooter')}
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex-1 bg-slate-900 border-2 border-indigo-500/50 rounded-2xl p-8 overflow-hidden text-left shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] hover:border-indigo-400 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-3xl font-bold text-indigo-400 mb-2 uppercase tracking-wide">Star<br/>Defender</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            An action-packed 2D space shooter. Blast asteroids to uncover projects and skills.
          </p>
          <div className="text-xs font-bold text-indigo-500 tracking-widest uppercase mt-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> Action Mode
          </div>
        </motion.button>

        {/* Game 2: Visual Novel */}
        <motion.button
          onClick={() => onSelectGame('novel')}
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex-1 bg-slate-900 border-2 border-fuchsia-500/50 rounded-2xl p-8 overflow-hidden text-left shadow-[0_0_30px_rgba(217,70,239,0.2)] hover:shadow-[0_0_50px_rgba(217,70,239,0.6)] hover:border-fuchsia-400 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-3xl font-bold text-fuchsia-400 mb-2 uppercase tracking-wide">Interview<br/>Simulator</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            A narrative dating-sim experience. Chat with an AI avatar to learn about experience and history.
          </p>
          <div className="text-xs font-bold text-fuchsia-500 tracking-widest uppercase mt-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" /> Narrative Mode
          </div>
        </motion.button>
      </div>
    </div>
  );
}
