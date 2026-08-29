import React, { useState, useEffect } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { motion, AnimatePresence } from 'framer-motion';
import VirtualJoystick from './VirtualJoystick';
import { useKeyDown } from '../../../hooks/useKeyDown';

const ZONES = [
  { id: 'projects', x: -400, y: -200, w: 250, h: 200, color: 'emerald', title: 'Tavern of Projects', desc: 'View my featured case studies.' },
  { id: 'skills', x: 300, y: 150, w: 250, h: 200, color: 'blue', title: 'Forest of Skills', desc: 'My technical stack & proficiencies.' },
  { id: 'contact', x: -100, y: 400, w: 200, h: 200, color: 'fuchsia', title: 'Contact Shrine', desc: 'Send a transmission.' },
];

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export default function GameMap() {
  const { pos, direction, isMoving, setJoystickInput } = useGameLoop(8);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [isDungeonMode, setIsDungeonMode] = useState(false);
  const [openedZone, setOpenedZone] = useState<string | null>(null);

  // Easter Egg: Day/Night cycle based on local time
  const hour = new Date().getHours();
  const isNight = hour >= 20 || hour <= 6;
  
  useKeyDown((e) => {
    if (e.key === KONAMI[konamiProgress]) {
      if (konamiProgress === KONAMI.length - 1) {
        setIsDungeonMode(true);
        setKonamiProgress(0);
      } else {
        setKonamiProgress(p => p + 1);
      }
    } else {
      setKonamiProgress(0);
    }
  });

  const activeZone = ZONES.find(
    (z) => pos.x >= z.x && pos.x <= z.x + z.w && pos.y >= z.y && pos.y <= z.y + z.h
  );

  // Handle interaction
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && activeZone) {
        setOpenedZone(activeZone.id);
      } else if (e.key === 'Escape') {
        setOpenedZone(null);
      }
    };
    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [activeZone]);

  const mapStyle = isNight ? 'bg-[#050510]' : 'bg-[#0f172a]';
  const gridStyle = isNight 
    ? 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]'
    : 'bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]';

  return (
    <div className={`relative w-full h-full overflow-hidden transition-colors duration-1000 ${mapStyle}`}>
      
      {/* Dynamic Parallax Background Dust */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ transform: `translate(${-pos.x * 0.2}px, ${-pos.y * 0.2}px)` }}
      >
        <div className="w-[4000px] h-[4000px] absolute -top-[1000px] -left-[1000px] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:100px_100px]" />
      </div>

      {/* The Camera / World Container - moves opposite to player */}
      <div 
        className="absolute top-1/2 left-1/2 transition-transform duration-75 ease-out"
        style={{ transform: `translate(${-pos.x}px, ${-pos.y}px)` }}
      >
        {/* Infinite Grid */}
        <div className={`absolute -inset-[3000px] ${gridStyle} bg-[size:40px_40px]`} />

        {/* Zones */}
        {ZONES.map((zone) => {
          const isActive = activeZone?.id === zone.id;
          const colorMap: Record<string, string> = {
            emerald: 'border-emerald-500 shadow-emerald-500/50 bg-emerald-950/40',
            blue: 'border-blue-500 shadow-blue-500/50 bg-blue-950/40',
            fuchsia: 'border-fuchsia-500 shadow-fuchsia-500/50 bg-fuchsia-950/40',
          };

          return (
            <div
              key={zone.id}
              className={`absolute flex items-center justify-center transition-all duration-500`}
              style={{ left: zone.x, top: zone.y, width: zone.w, height: zone.h }}
            >
              {/* Outer Glow Ring (Pulses when active) */}
              <motion.div
                animate={{ scale: isActive ? [1, 1.05, 1] : 1, opacity: isActive ? [0.5, 0.8, 0.5] : 0.3 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`absolute inset-[-20px] rounded-xl border-2 ${colorMap[zone.color]} blur-sm`}
              />
              
              {/* Core Platform */}
              <div className={`relative w-full h-full border border-white/20 rounded-lg backdrop-blur-sm flex flex-col items-center justify-center gap-2 overflow-hidden ${colorMap[zone.color]}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="relative z-10 text-white font-bold font-mono tracking-widest text-lg drop-shadow-md">{zone.title}</span>
                <span className="relative z-10 text-white/50 text-xs tracking-wider">{zone.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* The Player Sprite (always centered) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
        <motion.div
          animate={{
            scale: isMoving ? [1, 1.1, 1] : 1,
            rotateZ: direction === 'RIGHT' ? 15 : direction === 'LEFT' ? -15 : 0,
            rotateX: direction === 'UP' ? -15 : direction === 'DOWN' ? 15 : 0,
          }}
          transition={{ 
            scale: { repeat: isMoving ? Infinity : 0, duration: 0.3 },
            rotateZ: { type: 'spring', stiffness: 300, damping: 20 },
            rotateX: { type: 'spring', stiffness: 300, damping: 20 }
          }}
          className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center relative shadow-[0_10px_20px_rgba(250,204,21,0.4),inset_0_2px_5px_rgba(255,255,255,0.8)] [transform-style:preserve-3d]"
        >
          {/* Flashlight (Night mode) */}
          {isNight && (
            <motion.div 
              className="absolute w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.15)_0%,transparent_70%)] rounded-full -z-10 blur-xl"
              animate={{
                x: direction === 'RIGHT' ? 50 : direction === 'LEFT' ? -50 : 0,
                y: direction === 'DOWN' ? 50 : direction === 'UP' ? -50 : 0,
              }}
            />
          )}

          {/* Direction indicator (eyes) */}
          <motion.div 
            className="absolute flex gap-1.5"
            animate={{
              x: direction === 'RIGHT' ? 8 : direction === 'LEFT' ? -8 : 0,
              y: direction === 'DOWN' ? 8 : direction === 'UP' ? -8 : 0,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="w-2 h-2.5 bg-black rounded-full shadow-inner" />
            <div className="w-2 h-2.5 bg-black rounded-full shadow-inner" />
          </motion.div>
        </motion.div>
      </div>

      {/* HUD overlay */}
      <div className="absolute top-6 left-6 z-50 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl text-white font-mono shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
            <h2 className="text-yellow-400 font-bold tracking-widest text-lg">THE PLAYER</h2>
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <p>X: {Math.round(pos.x).toString().padStart(4, '0')} | Y: {Math.round(pos.y).toString().padStart(4, '0')}</p>
            <p>ENV: {isNight ? 'NIGHT' : 'DAY'} {isDungeonMode ? '| SECRETS_UNLOCKED' : ''}</p>
          </div>
        </div>
      </div>

      {/* Zone Interaction Prompt */}
      <AnimatePresence>
        {activeZone && !openedZone && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-32 md:bottom-12 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/30 px-6 py-4 rounded-2xl shadow-2xl flex flex-col items-center gap-2">
              <span className="text-white font-bold text-lg">{activeZone.title}</span>
              <button 
                onClick={() => setOpenedZone(activeZone.id)}
                className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform active:scale-95"
              >
                Press Enter or Tap
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Modal (When Zone is Opened) */}
      <AnimatePresence>
        {openedZone && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
            onClick={() => setOpenedZone(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden relative"
            >
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                <h3 className="text-white font-mono font-bold tracking-widest uppercase text-sm">
                  {ZONES.find(z => z.id === openedZone)?.title}
                </h3>
                <button 
                  onClick={() => setOpenedZone(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>
              <div className="p-8 min-h-[400px] flex items-center justify-center">
                <p className="text-slate-400 font-mono animate-pulse">[ Content Loading... ]</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Controls */}
      {!openedZone && (
        <VirtualJoystick 
          onMove={(dx, dy) => setJoystickInput(dx, dy)}
          onEnd={() => setJoystickInput(0, 0)}
        />
      )}

    </div>
  );
}
