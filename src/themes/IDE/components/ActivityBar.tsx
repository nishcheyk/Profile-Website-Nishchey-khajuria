import React from 'react';
import { VscFiles, VscSearch, VscSourceControl, VscExtensions, VscSettingsGear, VscAccount } from 'react-icons/vsc';
import { IconArrowLeft } from '../../../components/ui/Icons';
import { useToast } from '../../../components/ui/Toast';

interface ActivityBarProps {
  activePanel: 'explorer' | 'search' | 'source-control' | 'extensions';
  onPanelChange: (panel: 'explorer' | 'search' | 'source-control' | 'extensions') => void;
  onBack: () => void;
}

export default function ActivityBar({ activePanel, onPanelChange, onBack }: ActivityBarProps) {
  const toast = useToast();
  return (
    <div className="hidden md:flex w-12 h-full bg-[#020617] border-r border-surfaceBorder flex-col justify-between py-4 items-center shrink-0 z-20">
      <div className="flex flex-col gap-6 w-full items-center">
        <button
          onClick={onBack}
          className="text-secondary hover:text-white transition-colors mb-2"
          title="Return to Multiverse"
        >
          <IconArrowLeft size={24} />
        </button>
        <button
          onClick={() => onPanelChange('explorer')}
          className={`relative group w-full flex justify-center transition-colors ${activePanel === 'explorer' ? 'text-accent' : 'text-secondary hover:text-white'}`}
        >
          {activePanel === 'explorer' && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />}
          <VscFiles size={24} />
        </button>
        <button
          onClick={() => onPanelChange('search')}
          className={`relative group w-full flex justify-center transition-colors ${activePanel === 'search' ? 'text-accent' : 'text-secondary hover:text-white'}`}
        >
          {activePanel === 'search' && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />}
          <VscSearch size={24} />
        </button>
        <button
          onClick={() => onPanelChange('source-control')}
          className={`relative group w-full flex justify-center transition-colors ${activePanel === 'source-control' ? 'text-accent' : 'text-secondary hover:text-white'}`}
        >
          {activePanel === 'source-control' && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />}
          <VscSourceControl size={24} />
          <div className="absolute -bottom-1 right-[6px] bg-accent rounded-full text-[#020617] text-[9px] font-bold w-4 h-4 flex items-center justify-center">1</div>
        </button>
        <button
          onClick={() => onPanelChange('extensions')}
          className={`relative group w-full flex justify-center transition-colors ${activePanel === 'extensions' ? 'text-accent' : 'text-secondary hover:text-white'}`}
        >
          {activePanel === 'extensions' && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />}
          <VscExtensions size={24} />
        </button>
      </div>
      <div className="flex flex-col gap-6 items-center">
        <button
          onClick={() => toast.show('Signed in as: Nishchey Khajuria')}
          className="text-secondary hover:text-white transition-colors"
        >
          <VscAccount size={24} />
        </button>
        <button
          onClick={() => toast.show('Opening Settings (JSON)...')}
          className="text-secondary hover:text-white transition-colors"
        >
          <VscSettingsGear size={24} />
        </button>
      </div>
    </div>
  );
}
