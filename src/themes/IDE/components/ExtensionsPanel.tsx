import React from 'react';
import { VscFilter, VscRefresh } from 'react-icons/vsc';

const EXTENSIONS = [
  { name: "Dracula Official", author: "Dracula Theme", desc: "Official Dracula Theme", icon: "🧛", installed: true },
  { name: "Prettier - Code formatter", author: "Prettier", desc: "Code formatter using prettier", icon: "💅", installed: true },
  { name: "ESLint", author: "Microsoft", desc: "Integrates ESLint into VS Code.", icon: "✅", installed: true },
  { name: "Tailwind CSS IntelliSense", author: "Tailwind Labs", desc: "Intelligent Tailwind CSS tooling", icon: "🌊", installed: true },
];

export default function ExtensionsPanel() {
  return (
    <div className="w-64 h-full bg-[#0f172a] border-r border-surfaceBorder flex flex-col shrink-0 select-none overflow-y-auto">
      <div className="px-4 py-3 text-[11px] font-bold text-secondary uppercase tracking-widest flex items-center justify-between">
        <span>Extensions</span>
        <div className="flex items-center gap-2">
          <VscFilter size={14} className="cursor-pointer hover:text-white" />
          <VscRefresh size={14} className="cursor-pointer hover:text-white" />
        </div>
      </div>
      
      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="Search Extensions in Marketplace"
          className="w-full bg-[#020617] border border-surfaceBorder rounded-sm py-1 px-2 text-[13px] text-primary focus:outline-none focus:border-accent font-mono placeholder:text-[#334155]"
        />
      </div>

      <div className="px-4 py-2 text-[10px] font-bold text-secondary uppercase tracking-widest">
        Installed
      </div>
      
      <div className="flex flex-col">
        {EXTENSIONS.map((ext, i) => (
          <div key={i} className="flex gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer border-b border-surfaceBorder/50">
            <div className="text-2xl mt-1">{ext.icon}</div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-primary text-[13px] font-bold truncate">{ext.name}</span>
              <span className="text-secondary text-[11px] truncate">{ext.desc}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[#64748b] text-[10px] truncate">{ext.author}</span>
                {ext.installed && (
                  <span className="bg-accent/20 text-accent px-1 py-[1px] rounded-[3px] text-[9px] font-bold">
                    Installed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
