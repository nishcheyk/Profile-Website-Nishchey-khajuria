import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { summary, experiences, name } from '../../../data/constants';

interface VisualNovelProps {
  onExit: () => void;
}

type Node = {
  id: string;
  text: string;
  options: { label: string; targetId: string }[];
};

// Generate dialogue tree
const generateDialogue = (): Record<string, Node> => {
  const tree: Record<string, Node> = {
    start: {
      id: 'start',
      text: `Hello there. I'm ${name.split(' ')[0]}. Welcome to my digital space. How can I help you today?`,
      options: [
        { label: "Tell me about yourself.", targetId: 'about' },
        { label: "What is your work experience?", targetId: 'exp_0' },
        { label: "Just looking around.", targetId: 'end' }
      ]
    },
    about: {
      id: 'about',
      text: summary,
      options: [
        { label: "Impressive. What about your experience?", targetId: 'exp_0' },
        { label: "That's all I needed to know.", targetId: 'end' }
      ]
    },
    end: {
      id: 'end',
      text: "Feel free to look around. Let me know if you need anything else.",
      options: [
        { label: "Actually, I have more questions.", targetId: 'start' }
      ]
    }
  };

  // Dynamically add experience nodes
  experiences.forEach((exp, i) => {
    const hasNext = i < experiences.length - 1;
    tree[`exp_${i}`] = {
      id: `exp_${i}`,
      text: `I worked at ${exp.company} as a ${exp.role} (${exp.duration}).\n\n${exp.points[0]}`,
      options: [
        ...(hasNext ? [{ label: "What did you do before that?", targetId: `exp_${i+1}` }] : []),
        { label: "Tell me about yourself.", targetId: 'about' },
        { label: "That's enough for now.", targetId: 'end' }
      ]
    };
  });

  return tree;
};

export default function VisualNovel({ onExit }: VisualNovelProps) {
  const [dialogueTree] = useState(generateDialogue());
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const currentNode = dialogueTree[currentNodeId];

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(currentNode.text.slice(0, i));
      i++;
      if (i > currentNode.text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20); // typing speed

    return () => clearInterval(interval);
  }, [currentNode.id]);

  return (
    <div className="w-full h-screen bg-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Background (Bright / Office vibe) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-50" />
      
      {/* Decorative architectural shapes */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-slate-200/50 skew-x-12 translate-x-32" />
      
      <button 
        onClick={onExit}
        className="absolute top-6 right-6 z-50 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm transition-colors"
      >
        Leave Interview
      </button>

      {/* Character Sprite */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[80vh] flex items-end justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-[400px] h-[600px] relative"
        >
          {/* We use a sleek abstract humanoid silhouette or anime-style silhouette since we don't have a specific asset */}
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-slate-900 to-slate-700 [clip-path:polygon(30%_0%,70%_0%,100%_100%,0%_100%)] rounded-t-full opacity-90 shadow-2xl drop-shadow-2xl" />
          
          {/* Eyes/Visor to give it character */}
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-32 h-8 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center gap-4">
             <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_10px_cyan]" />
             <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_10px_cyan]" />
          </div>
        </motion.div>
      </div>

      {/* Dialogue UI */}
      <div className="absolute bottom-0 left-0 w-full p-6 pb-12 flex justify-center z-20">
        <div className="w-full max-w-5xl">
          {/* Name Plate */}
          <div className="bg-slate-900 text-white w-fit px-8 py-2 rounded-t-xl font-bold tracking-widest text-sm relative z-10 ml-8 border-t border-x border-slate-700">
            {name.split(' ')[0].toUpperCase()}
          </div>
          
          {/* Main Text Box */}
          <div className="bg-white/80 backdrop-blur-3xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl p-8 md:p-12 min-h-[250px] relative">
            <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium whitespace-pre-wrap">
              {displayedText}
              {isTyping && <span className="inline-block w-3 h-6 ml-1 bg-cyan-500 animate-ping" />}
            </p>

            {/* Options */}
            <AnimatePresence>
              {!isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 flex flex-col md:flex-row gap-4"
                >
                  {currentNode.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentNodeId(opt.targetId)}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-xl font-bold text-sm shadow-lg hover:-translate-y-1 transition-all text-left flex items-center justify-between group border border-slate-700"
                    >
                      {opt.label}
                      <span className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
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
