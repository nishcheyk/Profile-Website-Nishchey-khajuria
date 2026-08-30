import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { summary, experiences, name } from '../../../data/constants';

// --- Audio Engine ---
class AudioEngine {
  private ctx: AudioContext | null = null;
  
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBlip() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    // Randomize frequency slightly for a "speaking" texture
    osc.frequency.setValueAtTime(800 + Math.random() * 200, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }
}

const audio = new AudioEngine();

// --- Dialogue Tree ---
const generateDialogue = (): Record<string, VisualNovelNode> => {
  const tree: Record<string, VisualNovelNode> = {
    start: {
      id: 'start',
      text: `Hello. I am the digital construct representing ${name.split(' ')[0]}. My purpose is to guide you through my creator's professional background and capabilities. What specific aspect of my creator's engineering profile would you like to evaluate today?`,
      options: [
        { label: "Give me the high-level summary.", targetId: 'about' },
        { label: "Let's dive into work experience.", targetId: 'exp_0' },
        { label: "I'll explore on my own, thanks.", targetId: 'end' }
      ]
    },
    about: {
      id: 'about',
      text: `Certainly.\n\n${summary}\n\nThis blend of rapid prototyping and robust systems engineering allows my creator to deliver highly polished, production-ready experiences. Where should we direct our focus next?`,
      options: [
        { label: "Show me the real-world experience.", targetId: 'exp_0' },
        { label: "That's sufficient. Goodbye.", targetId: 'end' }
      ]
    },
    end: {
      id: 'end',
      text: "Understood. The simulation will remain active should you require further insights. I wish you an excellent day.",
      options: [
        { label: "Wait, I have more questions.", targetId: 'start' }
      ]
    }
  };

  experiences.forEach((exp, i) => {
    const hasNext = i < experiences.length - 1;
    const nextLabel = hasNext ? `What was the role before ${exp.company}?` : "";
    
    tree[`exp_${i}`] = {
      id: `exp_${i}`,
      text: `At ${exp.company}, my creator operated as a ${exp.role} from ${exp.duration}.\n\nKey impact: ${exp.points[0]}\n\nThis involved strict adherence to engineering standards and cross-functional collaboration to ensure scalability.`,
      options: [
        ...(hasNext ? [{ label: nextLabel, targetId: `exp_${i+1}` }] : []),
        { label: "Let's zoom out to the high-level summary.", targetId: 'about' },
        { label: "I've heard enough for now.", targetId: 'end' }
      ]
    };
  });

  return tree;
};

export default function DialogueEngine() {
  const [dialogueTree] = useState(generateDialogue());
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const navigate = useNavigate();

  const currentNode = dialogueTree[currentNodeId];

  // Initialize audio on first click anywhere
  useEffect(() => {
    const initAudio = () => {
      audio.init();
      setHasInteracted(true);
      window.removeEventListener('click', initAudio);
    };
    window.addEventListener('click', initAudio);
    return () => window.removeEventListener('click', initAudio);
  }, []);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    
    const interval = setInterval(() => {
      setDisplayedText(currentNode.text.slice(0, i));
      
      // Play sound occasionally while typing to avoid audio clipping
      if (hasInteracted && i % 3 === 0 && currentNode.text[i] !== ' ') {
        audio.playBlip();
      }

      i++;
      if (i > currentNode.text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25); // typing speed

    return () => clearInterval(interval);
  }, [currentNode.id, currentNode.text, hasInteracted]);

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col relative overflow-hidden font-sans">
      {/* Sci-fi Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-50 text-white/50 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors"
      >
        <span>←</span> Abort Simulation
      </button>

      {/* Character Sprite */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[85vh] flex items-end justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full flex justify-center"
        >
          {/* Hologram glow behind avatar */}
          <div className="absolute bottom-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen" />
          
          <img 
            src="/assets/avatar.png" 
            alt="AI Assistant"
            className="h-full object-contain object-bottom drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          />

          {/* Scanline overlay for hologram effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] mix-blend-overlay pointer-events-none opacity-50" />
        </motion.div>
      </div>

      {!hasInteracted && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-cyan-400 font-mono text-sm tracking-widest uppercase border border-cyan-500/30 px-6 py-3 rounded-full bg-cyan-500/10"
          >
            Click anywhere to initialize audio
          </motion.div>
        </div>
      )}

      {/* Dialogue UI */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 pb-12 flex justify-center z-20">
        <div className="w-full max-w-4xl relative">
          
          {/* Name Plate */}
          <div className="absolute -top-4 left-8 bg-cyan-500/10 backdrop-blur-md border border-cyan-500/30 text-cyan-300 px-6 py-1 font-mono font-bold tracking-widest text-xs z-30 uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)] skew-x-[-15deg]">
            <span className="block skew-x-[15deg]">SYSTEM.{name.split(' ')[0].toUpperCase()}</span>
          </div>
          
          {/* Main Text Box */}
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm p-8 md:p-12 min-h-[200px] relative overflow-hidden before:absolute before:inset-0 before:border-l-2 before:border-cyan-500/50 before:w-full before:h-full before:pointer-events-none">
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50" />

            <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light whitespace-pre-wrap">
              {displayedText}
              {isTyping && <span className="inline-block w-2 h-5 ml-1 bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />}
            </p>

            {/* Options */}
            <AnimatePresence>
              {!isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex flex-col gap-3"
                >
                  {currentNode.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentNodeId(opt.targetId)}
                      className="w-full bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 px-6 py-4 border border-white/5 hover:border-cyan-500/30 font-mono text-sm tracking-wide text-left flex items-center justify-between group transition-all"
                    >
                      <span>
                        <span className="text-cyan-500/50 mr-4">[{i + 1}]</span>
                        {opt.label}
                      </span>
                      <span className="text-transparent group-hover:text-cyan-400 group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
