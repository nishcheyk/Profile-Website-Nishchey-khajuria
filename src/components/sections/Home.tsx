import React from 'react';
import { name, summary, skills } from '../../data/constants';
import { motion } from "framer-motion";
import { VscPlay, VscRepo, VscCode, VscPreview, VscRocket } from "react-icons/vsc";

const Home = ({ setActiveTab }: { setActiveTab?: (id: string) => void }) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-start overflow-y-auto bg-[#020617] text-white p-8 font-sans custom-scrollbar'>
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-surfaceBorder pb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white shadow-lg">
              <VscRocket size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome to {name} Workspace</h1>
              <p className="text-secondary text-sm font-mono mt-1">Version 1.0.0 (stable)</p>
            </div>
          </div>
          <p className="text-[#94a3b8] text-lg leading-relaxed max-w-2xl">
            {summary}
          </p>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Start Section */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#94a3b8] mb-4 flex items-center gap-2">
              <VscPlay className="text-accent" /> Start
            </h2>
            <ul className="space-y-2">
              {[
                { icon: VscCode, text: "View Portfolio Projects", color: "text-blue-400", action: () => setActiveTab?.('projects') },
                { icon: VscRepo, text: "Read Documentation (Resume)", color: "text-green-400", action: () => setActiveTab?.('experience') },
                { icon: VscPreview, text: "Launch Interactive Preview", color: "text-purple-400", action: () => setActiveTab?.('skills') },
                { icon: VscRocket, text: "Deploy to Production", color: "text-orange-400", action: () => setActiveTab?.('contact') },
              ].map((item, i) => (
                <li key={i}>
                  <button onClick={item.action} className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-md text-left transition-colors group">
                    <item.icon className={item.color} size={18} />
                    <span className="text-[#e2e8f0] group-hover:text-white transition-colors">{item.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* System Specs Section */}
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#94a3b8] mb-4 flex items-center gap-2">
              <VscRepo className="text-accent" /> System Specs
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-xs text-[#94a3b8]">
              <div className="flex justify-between mb-2 pb-2 border-b border-white/5">
                <span>Architecture</span>
                <span className="text-white">Multiverse OS</span>
              </div>
              <div className="flex justify-between mb-2 pb-2 border-b border-white/5">
                <span>Runtime</span>
                <span className="text-white">React 18 / TypeScript</span>
              </div>
              <div className="flex justify-between mb-2 pb-2 border-b border-white/5">
                <span>Engine</span>
                <span className="text-white">Framer Motion</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Status</span>
                <span className="text-green-400">● Online</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Tags */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
           <h2 className="text-sm font-bold uppercase tracking-widest text-[#94a3b8] mb-4">Loaded Modules</h2>
           <div className="flex flex-wrap gap-2">
             {skills.map((skill, i) => (
               <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-[#cbd5e1] rounded hover:bg-white/10 transition-colors cursor-default">
                 {skill.title}
               </span>
             ))}
           </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Home;
