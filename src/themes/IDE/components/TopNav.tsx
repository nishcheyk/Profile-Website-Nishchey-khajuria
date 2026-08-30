import React from 'react';
import TabBar from './TabBar';

interface TopNavProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  viewMode: 'preview' | 'code';
  onViewModeChange: (mode: 'preview' | 'code') => void;
}

export default function TopNav({ tabs, activeTab, onTabChange, viewMode, onViewModeChange }: TopNavProps) {
  return (
    <div className="flex items-center justify-between pr-4 bg-[#020617] border-b border-surfaceBorder z-10">
      <TabBar tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
      
      {/* Code/Preview Segmented Control */}
      <div className="flex bg-[#0f172a] rounded-md p-1 border border-surfaceBorder shadow-inner">
        <button
          onClick={() => onViewModeChange('preview')}
          className={`px-3 py-1 text-[11px] font-bold font-mono rounded-sm uppercase tracking-wide transition-colors ${
            viewMode === 'preview' ? 'bg-accent text-[#020617] shadow-sm' : 'text-secondary hover:text-white'
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => onViewModeChange('code')}
          className={`px-3 py-1 text-[11px] font-bold font-mono rounded-sm uppercase tracking-wide transition-colors ${
            viewMode === 'code' ? 'bg-accent text-[#020617] shadow-sm' : 'text-secondary hover:text-white'
          }`}
        >
          Code
        </button>
      </div>
    </div>
  );
}
