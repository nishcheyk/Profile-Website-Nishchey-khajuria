import React from 'react';
import { motion } from 'framer-motion';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function TabBar({ tabs, activeTab, onChange }: TabBarProps) {
  return (
    <div className="flex items-end h-12 bg-background border-b border-surfaceBorder px-4 shrink-0 overflow-x-auto no-scrollbar font-mono text-sm z-10 relative">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-6 py-2.5 outline-none transition-colors duration-200 ${
              isActive ? 'text-accent' : 'text-secondary hover:text-primary'
            }`}
          >
            {tab.icon}
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
