import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, skills } from '../../../data/constants';

interface SpaceShooterProps {
  onExit: () => void;
}

type GameObject = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
};

type Asteroid = GameObject & {
  speed: number;
  data: any; // Project or Skill
  type: 'project' | 'skill';
};

type Projectile = GameObject & {
  speed: number;
};

export default function SpaceShooter({ onExit }: SpaceShooterProps) {
  const [gameState, setGameState] = useState<'playing' | 'paused'>('playing');
  const [activeModalData, setActiveModalData] = useState<any>(null);
  const [score, setScore] = useState(0);

  // Mutable game state for the physics loop
  const playerRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight - 100, width: 40, height: 40 });
  const projectilesRef = useRef<Projectile[]>([]);
  const asteroidsRef = useRef<Asteroid[]>([]);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  
  // Refs for rendering so we don't trigger React renders on every frame
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    // Generate initial asteroids based on portfolio data
    const allTargets = [
      ...projects.map(p => ({ ...p, _type: 'project' })),
      ...skills.map(s => ({ ...s, _type: 'skill' }))
    ];

    asteroidsRef.current = allTargets.map((item, i) => ({
      id: `ast-${i}`,
      x: Math.random() * (window.innerWidth - 100) + 50,
      y: -Math.random() * 2000 - 100, // staggered start
      width: 60,
      height: 60,
      active: true,
      speed: Math.random() * 2 + 1,
      data: item,
      type: item._type as 'project' | 'skill'
    }));

    const handleKeyDown = (e: KeyboardEvent) => { keysRef.current[e.code] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keysRef.current[e.code] = false; };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let lastFire = 0;

    const gameLoop = (time: number) => {
      if (gameState !== 'playing') {
        requestRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Ensure canvas matches window size
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Player Movement
      const speed = 7;
      if (keysRef.current['ArrowLeft'] || keysRef.current['KeyA']) {
        playerRef.current.x = Math.max(playerRef.current.width / 2, playerRef.current.x - speed);
      }
      if (keysRef.current['ArrowRight'] || keysRef.current['KeyD']) {
        playerRef.current.x = Math.min(canvas.width - playerRef.current.width / 2, playerRef.current.x + speed);
      }

      // Firing
      if (keysRef.current['Space'] && time - lastFire > 200) {
        projectilesRef.current.push({
          id: `proj-${Date.now()}`,
          x: playerRef.current.x,
          y: playerRef.current.y - playerRef.current.height,
          width: 4,
          height: 15,
          speed: 15,
          active: true
        });
        lastFire = time;
      }

      // Update Projectiles
      projectilesRef.current.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) p.active = false;
        
        ctx.fillStyle = '#6366f1';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#6366f1';
        ctx.fillRect(p.x - p.width/2, p.y, p.width, p.height);
      });
      projectilesRef.current = projectilesRef.current.filter(p => p.active);

      // Update Asteroids
      let hitAsteroid: Asteroid | null = null;

      asteroidsRef.current.forEach(ast => {
        if (!ast.active) return;

        ast.y += ast.speed;
        if (ast.y > canvas.height + 100) {
          // Reset to top if missed
          ast.y = -100;
          ast.x = Math.random() * (canvas.width - 100) + 50;
        }

        // Draw Asteroid
        ctx.shadowBlur = 15;
        if (ast.type === 'project') {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
          ctx.strokeStyle = '#10b981';
          ctx.shadowColor = '#10b981';
        } else {
          ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
          ctx.strokeStyle = '#3b82f6';
          ctx.shadowColor = '#3b82f6';
        }

        ctx.beginPath();
        // Draw a simple hexagon/asteroid shape
        const sides = 6;
        for (let i = 0; i < sides; i++) {
          const angle = (i * 2 * Math.PI) / sides;
          const px = ast.x + (ast.width/2) * Math.cos(angle);
          const py = ast.y + (ast.height/2) * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Label inside
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 0;
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(ast.type.toUpperCase(), ast.x, ast.y + 3);

        // Collision detection
        projectilesRef.current.forEach(proj => {
          if (!proj.active) return;
          const dist = Math.hypot(proj.x - ast.x, proj.y - ast.y);
          if (dist < ast.width / 2) {
            proj.active = false;
            ast.active = false; // Destroy asteroid
            hitAsteroid = ast;
          }
        });
      });

      if (hitAsteroid) {
        setActiveModalData(hitAsteroid.data);
        setGameState('paused');
        setScore(s => s + 100);
      }

      // Draw Player Ship
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#06b6d4';
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(playerRef.current.x, playerRef.current.y - playerRef.current.height/2);
      ctx.lineTo(playerRef.current.x + playerRef.current.width/2, playerRef.current.y + playerRef.current.height/2);
      ctx.lineTo(playerRef.current.x, playerRef.current.y + playerRef.current.height/4);
      ctx.lineTo(playerRef.current.x - playerRef.current.width/2, playerRef.current.y + playerRef.current.height/2);
      ctx.closePath();
      ctx.fill();

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState]);

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden font-mono">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />

      {/* HUD */}
      <div className="absolute top-6 left-6 z-10 flex gap-8">
        <div className="bg-black/50 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
          <span className="text-slate-400 text-xs tracking-widest uppercase">Score</span>
          <div className="text-2xl font-bold text-cyan-400">{score.toString().padStart(5, '0')}</div>
        </div>
        <div className="bg-black/50 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
          <span className="text-slate-400 text-xs tracking-widest uppercase">Controls</span>
          <div className="text-sm font-bold text-white mt-1">A / D to Move<br/>SPACE to Fire</div>
        </div>
      </div>

      <button 
        onClick={onExit}
        className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-colors backdrop-blur-sm"
      >
        Exit Game
      </button>

      {/* Game Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Data Modal */}
      <AnimatePresence>
        {activeModalData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute z-50 bg-slate-900/90 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl max-w-2xl w-[90%] max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className={`text-xs font-bold uppercase tracking-widest ${activeModalData._type === 'project' ? 'text-emerald-500' : 'text-blue-500'}`}>
                  Data Retrieved: {activeModalData._type}
                </span>
                <h2 className="text-3xl font-bold text-white mt-1">{activeModalData.title}</h2>
              </div>
              <button 
                onClick={() => {
                  setActiveModalData(null);
                  setGameState('playing');
                  // Respawn the destroyed asteroid
                  const ast = asteroidsRef.current.find(a => !a.active);
                  if (ast) {
                    ast.y = -100;
                    ast.active = true;
                  }
                }}
                className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full"
              >
                ✕
              </button>
            </div>
            
            {activeModalData.image && (
              <img src={activeModalData.image} alt={activeModalData.title} className="w-full h-48 object-cover rounded-xl mb-6 border border-white/10" />
            )}
            
            <p className="text-slate-300 leading-relaxed">
              {activeModalData.description || `Proficient in ${activeModalData.title} for building robust applications.`}
            </p>

            {activeModalData.technologies && (
              <div className="flex flex-wrap gap-2 mt-6">
                {activeModalData.technologies.map((t: string) => (
                  <span key={t} className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
