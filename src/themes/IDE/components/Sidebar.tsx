import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VscChevronRight, VscChevronDown, VscFile, VscFolder, VscEllipsis } from 'react-icons/vsc';
import { EDITOR_TABS } from './ZenEditor';
import { useToast } from '../../../components/ui/Toast';

export default function Sidebar({ activeTab, onSelect }: { activeTab: string, onSelect: (id: string) => void }) {
  const [isSrcOpen, setIsSrcOpen] = useState(true);
  const toast = useToast();

  return (
    <div className="w-64 h-full bg-[#0f172a] border-r border-surfaceBorder flex flex-col shrink-0 select-none overflow-y-auto">
      <div className="px-4 py-3 text-[11px] font-bold text-secondary uppercase tracking-widest flex items-center justify-between">
        <span>Explorer</span>
        <VscEllipsis 
          size={14} 
          className="cursor-pointer hover:text-white transition-colors" 
          onClick={() => toast.show('Explorer View Options')}
        />
      </div>
      
      <div className="flex flex-col font-mono text-sm text-secondary pb-4">
        {/* Profile Website Workspace */}
        <div className="px-2 py-1 hover:bg-white/5 cursor-pointer flex items-center gap-1 font-bold text-primary">
          <VscChevronDown size={16} />
          <span className="uppercase text-[11px] tracking-wide">PROFILE-WEBSITE</span>
        </div>

        {/* src folder */}
        <div 
          className="px-4 py-1 hover:bg-white/5 cursor-pointer flex items-center gap-1 mt-1 text-primary"
          onClick={() => setIsSrcOpen(!isSrcOpen)}
        >
          {isSrcOpen ? <VscChevronDown size={16} /> : <VscChevronRight size={16} />}
          <VscFolder size={16} className="text-blue-400" />
          <span>src</span>
        </div>

        {/* src contents */}
        <AnimatePresence initial={false}>
          {isSrcOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden flex flex-col"
            >
              {EDITOR_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <div
                    key={tab.id}
                    onClick={() => onSelect(tab.id)}
                    className={`pl-10 pr-4 py-1 cursor-pointer flex items-center gap-2 border-l-[3px] transition-colors ${
                      isActive ? 'bg-accent/10 border-accent text-accent' : 'border-transparent hover:bg-white/5 hover:text-primary'
                    }`}
                  >
                    <VscFile size={16} className={tab.id.endsWith('tsx') ? 'text-blue-400' : 'text-yellow-400'} />
                    <span className="truncate">{tab.label}</span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
