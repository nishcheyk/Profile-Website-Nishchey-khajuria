import React from 'react';
import { motion } from 'framer-motion';

interface SpaceShooterProps {
  onExit: () => void;
}

export default function SpaceShooter({ onExit }: SpaceShooterProps) {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-4xl text-indigo-500 font-bold mb-4">STAR DEFENDER</h1>
      <p className="text-slate-400 mb-8">Space Shooter Engine Initializing...</p>
      <button 
        onClick={onExit}
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold"
      >
        Abort Mission (Return to Menu)
      </button>
    </div>
  );
}
