import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, skills, experiences, summary, name } from '../../../data/constants';

type CardType = 'project' | 'skill' | 'experience' | 'about';

export interface CardData {
  id: string;
  type: CardType;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  meta?: string;
}

// Generate the deck from constants
const generateDeck = (): CardData[] => {
  const deck: CardData[] = [];
  
  // Add About Card
  deck.push({
    id: 'about',
    type: 'about',
    title: name,
    description: summary,
    image: '/75way_logo.png'
  });

  // Add Experiences
  experiences.forEach((exp, i) => {
    deck.push({
      id: `exp-${i}`,
      type: 'experience',
      title: exp.role,
      description: exp.points.join(' '),
      meta: `${exp.company} • ${exp.duration}`,
      image: exp.logo
    });
  });

  // Add Projects
  projects.forEach((proj, i) => {
    deck.push({
      id: `proj-${i}`,
      type: 'project',
      title: proj.title,
      description: proj.description,
      tags: proj.technologies,
      image: proj.image
    });
  });

  // Add Skills
  skills.slice(0, 10).forEach((skill, i) => {
    deck.push({
      id: `skill-${i}`,
      type: 'skill',
      title: skill.title,
      description: `Proficient in ${skill.title} for building robust applications.`,
      image: skill.image,
      meta: skill.category
    });
  });

  return deck;
};

export default function DeckBuilder() {
  const [deck] = useState<CardData[]>(generateDeck());
  const [hand, setHand] = useState<CardData[]>(deck.slice(0, 7));
  const [activeCard, setActiveCard] = useState<CardData | null>(null);

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col relative overflow-hidden font-sans">
      {/* Background Table */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black opacity-80" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
      
      {/* Play Area */}
      <div className="flex-1 w-full flex items-center justify-center relative z-10 p-8">
        <div className="w-full max-w-4xl h-full border-2 border-dashed border-slate-700/50 rounded-3xl flex items-center justify-center relative bg-slate-900/20 backdrop-blur-sm">
          {!activeCard && (
            <div className="text-slate-500 font-medium tracking-widest uppercase text-xl animate-pulse">
              Drag a card here to play
            </div>
          )}

          <AnimatePresence>
            {activeCard && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                transition={{ type: 'spring', damping: 20 }}
                className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
              >
                {activeCard.image && (
                  <div className="w-full md:w-1/3 bg-slate-800 flex items-center justify-center p-8">
                    <img src={activeCard.image} alt={activeCard.title} className="max-w-full max-h-48 object-contain drop-shadow-xl" />
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col justify-center">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">{activeCard.type}</span>
                  <h2 className="text-3xl font-bold text-white mb-2">{activeCard.title}</h2>
                  {activeCard.meta && <div className="text-slate-400 text-sm mb-4">{activeCard.meta}</div>}
                  <p className="text-slate-300 leading-relaxed">{activeCard.description}</p>
                  
                  {activeCard.tags && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {activeCard.tags.map(t => (
                        <span key={t} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-slate-700">{t}</span>
                      ))}
                    </div>
                  )}

                  <button 
                    onClick={() => setActiveCard(null)}
                    className="mt-8 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-medium transition-colors w-fit"
                  >
                    Return to Hand
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* The Hand */}
      <div className="h-72 w-full relative z-20 flex justify-center items-end pb-8">
        {hand.map((card, i) => {
          // Calculate fan angle based on index
          const offset = i - (hand.length - 1) / 2;
          const rotate = offset * 5; // 5 degrees per card
          const y = Math.abs(offset) * 10; // slightly lower on the edges

          return (
            <motion.div
              key={card.id}
              drag
              dragSnapToOrigin
              onDragEnd={(e, info) => {
                // If dragged up enough, play it
                if (info.offset.y < -150) {
                  setActiveCard(card);
                }
              }}
              whileHover={{ 
                y: -40, 
                scale: 1.15, 
                zIndex: 50,
                rotate: 0,
                transition: { type: 'spring', stiffness: 400, damping: 25 }
              }}
              animate={{
                y,
                rotate,
                zIndex: i
              }}
              style={{
                marginLeft: i === 0 ? 0 : '-50px'
              }}
              className="w-52 h-72 bg-slate-800 rounded-2xl border-2 border-slate-600 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing flex flex-col relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 bg-slate-900 border-b border-slate-700 flex justify-between items-center">
                <span className="text-white font-bold text-sm truncate pr-2">{card.title}</span>
                <div className={`w-3 h-3 rounded-full shrink-0 ${
                  card.type === 'project' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                  card.type === 'skill' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' :
                  card.type === 'experience' ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                }`} />
              </div>
              
              {/* Card Body */}
              <div className="flex-1 p-4 flex flex-col items-center justify-start gap-4 relative">
                {card.image && (
                  <div className="w-24 h-24 mt-2 bg-slate-900 rounded-xl p-2 flex items-center justify-center border border-slate-700 shadow-inner">
                    <img src={card.image} alt={card.title} className="max-w-full max-h-full object-contain filter drop-shadow-md" />
                  </div>
                )}
                <div className="text-xs text-slate-400 text-center line-clamp-4 leading-relaxed">
                  {card.description}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3 bg-slate-900/80 border-t border-slate-700 text-center backdrop-blur-sm">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{card.type}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
