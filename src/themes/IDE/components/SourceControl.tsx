import React from 'react';
import { VscGitCommit, VscGitMerge, VscEllipsis } from 'react-icons/vsc';
import { experiences } from '../../../data/constants';

export default function SourceControl() {
  return (
    <div className="w-64 h-full bg-[#0f172a] border-r border-[#1e293b] flex flex-col shrink-0 select-none overflow-y-auto">
      <div className="px-4 py-3 text-[11px] font-bold text-[#94a3b8] uppercase tracking-widest flex items-center justify-between">
        <span>Source Control: Resume</span>
        <VscEllipsis size={14} className="cursor-pointer hover:text-white" />
      </div>

      <div className="flex flex-col px-4 py-2 relative">
        <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-[#334155] z-0" />
        
        {experiences.map((exp, i) => (
          <div key={i} className="relative z-10 flex gap-4 mb-6 group cursor-pointer">
            <div className="mt-1 flex-shrink-0 bg-[#0f172a] rounded-full border-2 border-[#334155] group-hover:border-accent transition-colors w-4 h-4 flex items-center justify-center">
              {i === 0 ? <VscGitMerge size={10} className="text-accent" /> : <VscGitCommit size={10} className="text-transparent group-hover:text-accent" />}
            </div>
            <div className="flex flex-col">
              <span className="text-[#e2e8f0] font-bold text-sm leading-tight mb-1">{exp.role}</span>
              <span className="text-[#94a3b8] text-[11px] font-mono leading-tight">{exp.company}</span>
              <span className="text-[#64748b] text-[10px] uppercase mt-1">{exp.duration}</span>
              <div className="text-[10px] text-[#475569] font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                commit {Math.random().toString(16).slice(2, 8)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
