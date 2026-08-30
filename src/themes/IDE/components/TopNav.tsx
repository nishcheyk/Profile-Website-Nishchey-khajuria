import React from 'react';
import TabBar from './TabBar';

interface TopNavProps {
  tabs: { id: string; label: string }[];
  onReorder: (tabs: any[]) => void;
  activeTab: string;
  onTabChange: (id: string) => void;
  viewMode: 'preview' | 'code';
  onViewModeChange: (mode: 'preview' | 'code') => void;
}

export default function TopNav({ tabs, onReorder, activeTab, onTabChange, viewMode, onViewModeChange }: TopNavProps) {
  return (
    <div className="flex items-center justify-between pr-2 md:pr-4 bg-[#020617] border-b border-surfaceBorder z-10 w-full overflow-hidden">
      <TabBar tabs={tabs} onReorder={onReorder} activeTab={activeTab} onChange={onTabChange} />
      
      {/* Code/Preview Segmented Control */}
      <div className="flex bg-[#0f172a] rounded-md p-0.5 md:p-1 border border-surfaceBorder shadow-inner shrink-0 ml-2 md:ml-4">
        <button
          onClick={() => onViewModeChange('preview')}
          className={`px-2 md:px-3 py-1 text-[10px] md:text-[11px] font-bold font-mono rounded-sm uppercase tracking-wide transition-colors ${
            viewMode === 'preview' ? 'bg-accent text-[#020617] shadow-sm' : 'text-secondary hover:text-white'
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => onViewModeChange('code')}
          className={`px-2 md:px-3 py-1 text-[10px] md:text-[11px] font-bold font-mono rounded-sm uppercase tracking-wide transition-colors ${
            viewMode === 'code' ? 'bg-accent text-[#020617] shadow-sm' : 'text-secondary hover:text-white'
          }`}
        >
          Code
        </button>
      </div>
    </div>
  );
}
