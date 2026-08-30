import React from 'react';
import { VscGitCommit, VscGitMerge, VscEllipsis, VscChevronDown, VscFile } from 'react-icons/vsc';
import { experiences } from '../../../data/constants';
import { useVFS } from '../../../context/VFSContext';

export default function SourceControl() {
  const { files, isDirty } = useVFS();
  
  const dirtyFiles = Object.keys(files).filter(isDirty);

  return (
    <div className="w-64 h-full bg-[#0f172a] border-r border-[#1e293b] flex flex-col shrink-0 select-none overflow-y-auto">
      <div className="px-4 py-3 text-[11px] font-bold text-[#94a3b8] uppercase tracking-widest flex items-center justify-between">
        <span>Source Control</span>
        <VscEllipsis size={14} className="cursor-pointer hover:text-white" />
      </div>

      <div className="px-4 py-2">
        <div className="flex items-center gap-1 text-sm font-bold text-[#e2e8f0] mb-2 cursor-pointer">
          <VscChevronDown size={14} />
          <span>CHANGES</span>
          <span className="ml-auto text-[#94a3b8] bg-white/5 rounded-full px-2 py-0.5 text-[10px] font-mono">{dirtyFiles.length}</span>
        </div>
        
        {dirtyFiles.length === 0 ? (
          <div className="text-xs text-[#64748b] ml-5 mb-6">No active changes</div>
        ) : (
          <div className="flex flex-col gap-1 ml-5 mb-6">
            {dirtyFiles.map(file => (
              <div key={file} className="flex items-center gap-2 text-xs text-[#94a3b8] hover:text-[#e2e8f0] cursor-pointer">
                <VscFile size={12} className="text-[#eab308]" />
                <span className="truncate">{file}</span>
                <span className="ml-auto text-[#eab308] font-mono text-[10px]">M</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-3 text-[11px] font-bold text-[#94a3b8] uppercase tracking-widest flex items-center">
        <span>Git Log: Resume</span>
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
