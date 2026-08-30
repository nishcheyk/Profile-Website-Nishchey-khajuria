import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, skills } from '../../../data/constants';

type Node = {
  id: string;
  x: number;
  y: number;
  z: number; // For parallax
  data: any;
  type: 'project' | 'skill';
  size: number;
};

export default function InteractiveGalaxy() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [activeNode, setActiveNode] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate star nodes
    const allTargets = [
      ...projects.map(p => ({ ...p, _type: 'project' })),
      ...skills.map(s => ({ ...s, _type: 'skill' }))
    ];

    const generatedNodes = allTargets.map((item, i) => {
      // Golden ratio spiral for organic galaxy distribution
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      const radius = 50 + (i * 20); // spread out
      
      return {
        id: `node-${i}`,
        x: radius * Math.cos(theta),
        y: radius * Math.sin(theta),
        z: Math.random() * 50 - 25,
        data: item,
        type: item._type as 'project' | 'skill',
        size: item._type === 'project' ? 80 : 50
      };
    });

    setNodes(generatedNodes);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-screen bg-black overflow-hidden relative font-sans flex items-center justify-center cursor-crosshair"
    >
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-screen" />
      
      {/* Galaxy Core */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] rounded-full bg-fuchsia-600/5 blur-[120px] pointer-events-none"
      />

      {/* Nodes Container (moves opposite to mouse for 3D parallax) */}
      <motion.div 
        className="relative z-10"
        animate={{
          x: -mousePos.x * 0.05,
          y: -mousePos.y * 0.05
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            onClick={() => setActiveNode(node.data)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: node.x + (mousePos.x * (node.z * 0.002)), // Z-based parallax
              y: node.y + (mousePos.y * (node.z * 0.002)),
            }}
            whileHover={{ scale: 1.2, zIndex: 50 }}
            className={`absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-colors
              ${node.type === 'project' ? 'text-indigo-300 hover:text-indigo-100' : 'text-fuchsia-300 hover:text-fuchsia-100'}`}
            style={{
              width: node.size,
              height: node.size,
            }}
          >
            {/* Glowing Star Effect */}
            <div className={`absolute inset-0 rounded-full blur-md opacity-40 ${node.type === 'project' ? 'bg-indigo-500' : 'bg-fuchsia-500'}`} />
            <div className={`absolute inset-2 rounded-full border border-white/20 backdrop-blur-sm ${node.type === 'project' ? 'bg-indigo-950/50' : 'bg-fuchsia-950/50'}`} />
            
            {/* Label */}
            <span className="relative z-10 text-[10px] font-bold uppercase tracking-wider text-center leading-tight drop-shadow-lg px-2">
              {node.data.title || node.data.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* HUD Instructions */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.3em] uppercase pointer-events-none text-center">
        Interactive Galaxy <br/>
        <span className="opacity-50 text-[10px]">Explore Constellations</span>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/40"
            onClick={() => setActiveNode(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/90 border border-white/10 rounded-3xl p-8 md:p-12 max-w-3xl w-full shadow-2xl relative overflow-hidden"
            >
              {/* Modal Background Glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
              
              <button 
                onClick={() => setActiveNode(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="relative z-10">
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2 block">
                  {activeNode._type === 'project' ? 'Project Data' : 'Skill Data'}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                  {activeNode.title || activeNode.name}
                </h2>
                
                {activeNode.image && (
                  <div className="w-full h-64 rounded-xl overflow-hidden mb-8 border border-white/10">
                    <img src={activeNode.image} alt={activeNode.title} className="w-full h-full object-cover" />
                  </div>
                )}
                
                <p className="text-slate-300 text-lg leading-relaxed font-light">
                  {activeNode.description || `Proficient in ${activeNode.title} for building robust applications.`}
                </p>

                {activeNode.technologies && (
                  <div className="flex flex-wrap gap-2 mt-8">
                    {activeNode.technologies.map((t: string) => (
                      <span key={t} className="bg-white/5 text-white/80 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
