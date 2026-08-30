import React, { useState, useMemo } from 'react';
import { VscSearch, VscReplaceAll, VscCollapseAll, VscListSelection, VscFile, VscChevronDown } from 'react-icons/vsc';
import sourceRegistry from '../sourceRegistry.json';

export default function SearchPanel() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    const matches: { filename: string, count: number }[] = [];
    
    Object.entries(sourceRegistry).forEach(([filename, content]) => {
      if (typeof content === 'string') {
        const lowerContent = content.toLowerCase();
        let count = 0;
        let pos = lowerContent.indexOf(lowerQuery);
        while (pos !== -1) {
          count++;
          pos = lowerContent.indexOf(lowerQuery, pos + lowerQuery.length);
        }
        if (count > 0) {
          matches.push({ filename, count });
        }
      }
    });
    return matches;
  }, [query]);

  return (
    <div className="w-64 h-full bg-[#0f172a] border-r border-surfaceBorder flex flex-col shrink-0 select-none overflow-y-auto">
      <div className="px-4 py-3 text-[11px] font-bold text-secondary uppercase tracking-widest flex items-center justify-between">
        <span>Search</span>
        <div className="flex items-center gap-2">
          <VscCollapseAll size={14} className="cursor-pointer hover:text-white" />
          <VscListSelection size={14} className="cursor-pointer hover:text-white" />
        </div>
      </div>
      
      <div className="px-4 py-2 flex flex-col gap-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-secondary">
            <VscSearch size={14} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#020617] border border-surfaceBorder rounded-sm py-1 pl-7 pr-2 text-[13px] text-primary focus:outline-none focus:border-accent font-mono placeholder:text-[#334155]"
          />
        </div>
        <div className="relative opacity-50 pointer-events-none">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-secondary">
            <VscReplaceAll size={14} />
          </div>
          <input
            type="text"
            placeholder="Replace (Disabled)"
            className="w-full bg-[#020617] border border-surfaceBorder rounded-sm py-1 pl-7 pr-2 text-[13px] text-primary focus:outline-none focus:border-accent font-mono placeholder:text-[#334155]"
          />
        </div>
      </div>

      <div className="px-4 py-4 text-xs text-secondary font-mono">
        {!query ? (
          <div>Search across the portfolio workspace.</div>
        ) : results.length > 0 ? (
          <div>
            <div className="mb-4 text-[#e2e8f0]">{results.reduce((acc, curr) => acc + curr.count, 0)} results in {results.length} files</div>
            <div className="flex flex-col gap-3">
              {results.map(res => (
                <div key={res.filename} className="flex flex-col">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-white text-sm">
                    <VscChevronDown size={14} />
                    <VscFile size={12} className="text-accent" />
                    <span>{res.filename}</span>
                    <span className="ml-auto text-[#64748b] bg-white/5 rounded-full px-2 py-0.5 text-[9px]">{res.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="break-words">No matches found for '{query}'</div>
        )}
      </div>
    </div>
  );
}
