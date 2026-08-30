import React, { useState, useEffect } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { motion, AnimatePresence } from 'framer-motion';
import VirtualJoystick from './VirtualJoystick';
import { useKeyDown } from '../../../hooks/useKeyDown';
import { projects, skills, experiences, summary } from '../../../data/constants';

const playBeep = (freq = 440, type: OscillatorType = 'square', dur = 0.1, vol = 0.05) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch(e) {
    // Ignore audio errors on environments without interaction
  }
};

const ZONES = [
  { id: 'projects', x: -400, y: -200, w: 250, h: 200, color: 'emerald', title: 'Tavern of Projects', desc: 'View my featured case studies.' },
  { id: 'skills', x: 300, y: 150, w: 250, h: 200, color: 'blue', title: 'Forest of Skills', desc: 'My technical stack & proficiencies.' },
  { id: 'experience', x: 200, y: -300, w: 200, h: 180, color: 'purple', title: 'Guild of Experience', desc: 'My professional journey.' },
  { id: 'about', x: -300, y: 250, w: 180, h: 180, color: 'orange', title: 'Cave of Origins', desc: 'About the creator.' },
  { id: 'contact', x: -100, y: 400, w: 200, h: 200, color: 'fuchsia', title: 'Contact Shrine', desc: 'Send a transmission.' },
  { id: 'npc', x: 50, y: -100, w: 80, h: 80, color: 'amber', title: 'Mysterious Stranger', desc: 'Press Space to Talk' },
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
      if (e.key === 'Escape') {
        if (openedZone) playBeep(200, 'square', 0.1);
        setOpenedZone(null);
        return;
      }
      
      if (e.key === 'Enter' || e.key === ' ') {
        if (openedZone) {
          // If a zone is already open, Space/Enter should close it
          playBeep(200, 'square', 0.1);
          setOpenedZone(null);
        } else if (activeZone) {
          // If no zone is open, open the active zone
          playBeep(800, 'square', 0.15, 0.08);
          setOpenedZone(activeZone.id);
        }
      }
    };
    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [activeZone, openedZone]);

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
        style={{ 
          transform: `perspective(2000px) rotateX(60deg) rotateZ(-45deg) translate(${-pos.x}px, ${-pos.y}px)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Infinite Grid Base */}
        <div 
          className={`absolute -inset-[3000px] ${gridStyle} bg-[size:60px_60px] shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]`} 
          style={{ transform: 'translateZ(-10px)' }}
        />

        {/* Zones */}
        {ZONES.map((zone) => {
          const isActive = activeZone?.id === zone.id;
          const colorMap: Record<string, string> = {
            emerald: 'border-emerald-500 shadow-emerald-500/50 bg-emerald-950/40',
            blue: 'border-blue-500 shadow-blue-500/50 bg-blue-950/40',
            fuchsia: 'border-fuchsia-500 shadow-fuchsia-500/50 bg-fuchsia-950/40',
            amber: 'border-amber-500 shadow-amber-500/50 bg-amber-950/40',
          };

          return (
            <div
              key={zone.id}
              className={`absolute flex items-center justify-center transition-all duration-500 group`}
              style={{ left: zone.x, top: zone.y, width: zone.w, height: zone.h }}
            >
              {/* Outer Glow Ring (Pulses when active) */}
              <motion.div
                animate={{ scale: isActive ? [1, 1.05, 1] : 1, opacity: isActive ? [0.5, 0.8, 0.5] : 0.3 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`absolute inset-[-20px] rounded-xl border-2 ${colorMap[zone.color]} blur-sm`}
              />
              
              {/* Core Platform */}
              <div 
                className={`relative w-full h-full border-t border-l border-white/40 border-r-black/50 border-b-black/50 rounded-sm backdrop-blur-md flex flex-col items-center justify-center gap-2 overflow-hidden ${colorMap[zone.color]} transition-transform duration-500`}
                style={{ 
                  transform: isActive ? 'translateZ(40px)' : 'translateZ(10px)',
                  boxShadow: isActive ? '20px 20px 40px rgba(0,0,0,0.8)' : '5px 5px 15px rgba(0,0,0,0.5)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                <span className="relative z-10 text-white/70 group-hover:text-white font-bold font-mono tracking-widest text-lg drop-shadow-md text-center px-2 transition-colors">{zone.title}</span>
                <span className="relative z-10 text-white/50 group-hover:text-white/70 text-xs tracking-wider text-center transition-colors">{zone.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* The Player Sprite (always centered) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
        style={{ 
          transform: `perspective(2000px) rotateX(60deg) rotateZ(-45deg)`,
          transformStyle: 'preserve-3d' 
        }}
      >
        <motion.div
          animate={{
            z: isMoving ? [10, 25, 10] : [10, 15, 10],
            rotateZ: direction === 'RIGHT' ? 15 : direction === 'LEFT' ? -15 : 0,
            rotateX: direction === 'UP' ? -15 : direction === 'DOWN' ? 15 : 0,
          }}
          transition={{ 
            z: { repeat: Infinity, duration: isMoving ? 0.4 : 2, ease: "easeInOut" },
            rotateZ: { type: 'spring', stiffness: 300, damping: 20 },
            rotateX: { type: 'spring', stiffness: 300, damping: 20 }
          }}
          className="w-10 h-10 bg-white/90 border border-white flex items-center justify-center relative shadow-[20px_20px_30px_rgba(0,0,0,0.5)] [transform-style:preserve-3d]"
        >
          {/* Top Face to give a cube illusion */}
          <div className="absolute inset-0 border border-white/50 bg-white/20" style={{ transform: 'translateZ(10px)' }} />

          {/* Flashlight (Night mode) */}
          {isNight && (
            <motion.div 
              className="absolute w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)] rounded-full -z-10 blur-xl pointer-events-none"
              style={{ transform: 'translateZ(-10px)' }}
              animate={{
                x: direction === 'RIGHT' ? 80 : direction === 'LEFT' ? -80 : 0,
                y: direction === 'DOWN' ? 80 : direction === 'UP' ? -80 : 0,
              }}
            />
          )}
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
                Press Space or Tap
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Modal (When Zone is Opened) */}
      <AnimatePresence>
        {openedZone && openedZone !== 'npc' && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
            onClick={() => setOpenedZone(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-4xl bg-white/95 backdrop-blur-2xl border border-white/40 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden relative text-slate-900"
            >
              <div className="p-6 border-b border-black/5 flex justify-between items-center bg-white/50">
                <h3 className="font-bold tracking-widest uppercase text-xs text-slate-500">
                  {ZONES.find(z => z.id === openedZone)?.title}
                </h3>
                <button 
                  onClick={() => setOpenedZone(null)}
                  className="text-slate-400 hover:text-black p-2 transition-colors rounded-full hover:bg-black/5"
                >
                  ✕
                </button>
              </div>
              <div className="p-10 min-h-[400px] max-h-[70vh] overflow-y-auto no-scrollbar">
                {openedZone === 'projects' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((p, i) => (
                      <div key={i} className="group bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col gap-6 hover:shadow-xl hover:border-slate-200 transition-all">
                        <div className="overflow-hidden rounded-xl bg-slate-200 aspect-video">
                          <img src={p.image} alt={p.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl text-slate-900">{p.title}</h4>
                          <p className="text-slate-500 mt-2 text-sm leading-relaxed">{p.description}</p>
                          <div className="flex flex-wrap gap-2 mt-6">
                            {p.technologies.map((t, j) => (
                              <span key={j} className="bg-white text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium border border-slate-200 shadow-sm">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {openedZone === 'skills' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {skills.map((s, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 text-center group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all">
                        <img src={s.image} alt={s.alt} className="w-12 h-12 grayscale opacity-60 group-hover:grayscale-0 transition-all group-hover:opacity-100 drop-shadow-sm" />
                        <span className="text-slate-600 font-bold text-sm tracking-wide group-hover:text-black transition-colors">{s.title}</span>
                      </div>
                    ))}
                  </div>
                )}
                {openedZone === 'experience' && (
                  <div className="flex flex-col gap-10 relative pl-4">
                    <div className="absolute left-6 top-2 bottom-0 w-px bg-slate-200" />
                    {experiences.map((exp, i) => (
                      <div key={i} className="relative pl-10 group">
                        <div className="absolute left-[6px] top-2 w-3 h-3 bg-white border-2 border-slate-300 rounded-full group-hover:border-black group-hover:scale-125 transition-all shadow-sm" />
                        <h4 className="text-slate-900 font-bold text-xl">{exp.role}</h4>
                        <div className="text-slate-500 text-sm mb-4 font-medium mt-1">{exp.company} • {exp.duration}</div>
                        <ul className="text-slate-600 text-sm leading-relaxed space-y-2 list-none">
                          {exp.points.map((pt, j) => (
                            <li key={j} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-slate-300 before:rounded-full">
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {openedZone === 'about' && (
                  <div className="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto py-8">
                    <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl ring-4 ring-white relative">
                       <div className="absolute inset-0 bg-slate-100 animate-pulse" />
                    </div>
                    <h4 className="text-slate-900 font-bold text-3xl tracking-tight">{summary.split('.')[0]}</h4>
                    <p className="text-slate-600 text-lg leading-relaxed">{summary}</p>
                  </div>
                )}
                {openedZone === 'contact' && (
                  <div className="flex flex-col items-center justify-center h-full gap-8 py-16">
                    <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-all duration-500">
                      <span className="text-4xl drop-shadow-sm">👋</span>
                    </div>
                    <div className="text-center">
                      <h4 className="text-slate-900 font-bold text-3xl tracking-tight">Let's Connect</h4>
                      <p className="text-slate-500 mt-2 max-w-md mx-auto">Open to new opportunities, technical discussions, and collaborative projects.</p>
                    </div>
                    <a href="mailto:hello@example.com" className="bg-slate-900 hover:bg-black text-white font-bold px-10 py-4 rounded-full tracking-wide shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                      Say Hello
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* NPC Dialogue Box */}
        {openedZone === 'npc' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-4"
          >
            <div className="bg-slate-900/95 backdrop-blur-xl border-4 border-amber-500 rounded-lg p-6 shadow-2xl text-white font-mono relative">
              <div className="absolute -top-4 -left-2 bg-amber-500 text-black px-3 py-1 font-bold rounded-sm shadow-md">Mysterious Stranger</div>
              <p className="text-lg leading-relaxed mt-2">
                "Ah, a traveler. The code paths are shifting. Some say if you enter the Konami code, the true layout reveals itself. But you didn't hear that from me."
              </p>
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={() => setOpenedZone(null)}
                  className="animate-pulse text-amber-400 text-sm font-bold uppercase"
                >
                  [ Press Space to Continue ]
                </button>
              </div>
            </div>
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
