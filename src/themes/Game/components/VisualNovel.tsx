import React from 'react';
import { motion } from 'framer-motion';

interface VisualNovelProps {
  onExit: () => void;
}

export default function VisualNovel({ onExit }: VisualNovelProps) {
  return (
    <div className="w-full h-screen bg-slate-100 flex flex-col items-center justify-center text-slate-900">
      <h1 className="text-4xl text-fuchsia-500 font-bold mb-4">INTERVIEW SIMULATOR</h1>
      <p className="text-slate-600 mb-8">Narrative Engine Initializing...</p>
      <button 
        onClick={onExit}
        className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-6 py-2 rounded-full font-bold shadow-lg"
      >
        End Interview (Return to Menu)
      </button>
    </div>
  );
}
