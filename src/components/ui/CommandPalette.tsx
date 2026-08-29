import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeyDown } from '../../hooks/useKeyDown';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
  tabs: { id: string; label: string }[];
}

export default function CommandPalette({ isOpen, onClose, onSelectTab, tabs }: CommandPaletteProps) {
  const [search, setSearch] = useState('');

  useKeyDown((e) => { if (isOpen && e.key === 'Escape') onClose(); }, [isOpen, onClose]);

  const filteredTabs = tabs.filter((t) => t.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020617]/50 backdrop-blur-md"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-surface border border-surfaceBorder rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 py-4 border-b border-surfaceBorder bg-[#020617]/50">
              <span className="text-accent mr-3 font-mono font-bold text-lg">{'>'}</span>
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search files..."
                className="flex-1 bg-transparent border-none outline-none text-primary font-mono placeholder-secondary text-lg"
              />
              <span className="text-secondary text-xs font-mono border border-surfaceBorder px-2 py-1 rounded">ESC</span>
            </div>
            
            <div className="max-h-[50vh] overflow-y-auto py-2">
              <div className="px-4 py-2 text-xs font-bold text-secondary uppercase tracking-widest font-mono">
                Files
              </div>
              {filteredTabs.length === 0 ? (
                <div className="px-4 py-8 text-center text-secondary font-mono text-sm">
                  No matches found for "{search}"
                </div>
              ) : (
                filteredTabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onSelectTab(tab.id);
                      setSearch('');
                      onClose();
                    }}
                    className="w-full flex items-center px-4 py-3 hover:bg-accent/10 text-left transition-colors font-mono text-sm group"
                  >
                    <span className="text-secondary w-8 mr-2 group-hover:text-accent transition-colors">0{idx + 1}</span>
                    <span className="text-primary flex-1">{tab.label}</span>
                    <span className="text-secondary text-xs opacity-0 group-hover:opacity-100 transition-opacity">Jump</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
