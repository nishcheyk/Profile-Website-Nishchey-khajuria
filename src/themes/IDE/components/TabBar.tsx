import React from 'react';
import { motion, Reorder } from 'framer-motion';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabBarProps {
  tabs: Tab[];
  onReorder: (tabs: Tab[]) => void;
  activeTab: string;
  onChange: (id: string) => void;
}

export default function TabBar({ tabs, onReorder, activeTab, onChange }: TabBarProps) {
  return (
    <Reorder.Group 
      axis="x" 
      values={tabs} 
      onReorder={onReorder}
      className="flex items-end h-12 bg-background border-b border-surfaceBorder px-2 md:px-4 flex-1 overflow-x-auto no-scrollbar font-mono text-sm z-10 relative"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Reorder.Item
            key={tab.id}
            value={tab}
            onPointerDown={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-6 py-2.5 outline-none transition-colors duration-200 cursor-pointer ${
              isActive ? 'text-accent bg-surfaceHighlight/50' : 'text-secondary hover:text-primary hover:bg-surfaceHighlight/30'
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
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}
