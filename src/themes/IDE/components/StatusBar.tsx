import React from 'react';
import { VscSourceControl, VscError, VscWarning, VscCheckAll, VscBell, VscTerminal } from 'react-icons/vsc';
import { useToast } from '../../../components/ui/Toast';

export default function StatusBar({ onToggleTerminal }: { onToggleTerminal?: () => void }) {
  const toast = useToast();
  return (
    <div className="h-6 w-full bg-[#020617] border-t border-surfaceBorder text-secondary text-[11px] font-mono flex items-center justify-between px-3 shrink-0 select-none z-20">
      <div className="flex items-center gap-4 h-full">
        <a 
          href="https://github.com/nishcheyk" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-1 hover:text-white transition-colors h-full px-1"
        >
          <VscSourceControl size={14} />
          <span>main*</span>
        </a>
        <button onClick={onToggleTerminal} className="flex items-center gap-1 hover:text-white transition-colors h-full px-1">
          <VscError size={14} /> <span>0</span>
          <VscWarning size={14} className="ml-1" /> <span>0</span>
        </button>
      </div>
      <div className="flex items-center gap-4 h-full">
        <button 
          onClick={() => toast.success('Document formatted with Prettier')}
          className="hover:text-white transition-colors h-full px-1 flex items-center gap-1"
        >
          <VscCheckAll size={14} /> Prettier
        </button>
        <button 
          onClick={() => toast.show('Encoding changed to UTF-8')}
          className="hover:text-white transition-colors h-full px-1"
        >
          UTF-8
        </button>
        <button 
          onClick={() => toast.show('Language Mode: TypeScript React')}
          className="hover:text-white transition-colors h-full px-1"
        >
          TypeScript JSX
        </button>
        <button onClick={onToggleTerminal} className="hover:text-white transition-colors h-full px-1 flex items-center gap-1" title="Toggle Terminal">
          <VscTerminal size={14} /> 
        </button>
        <button onClick={() => toast.show('No new notifications')} className="hover:text-white transition-colors h-full px-1" title="Notifications">
          <VscBell size={14} />
        </button>
      </div>
    </div>
  );
}
