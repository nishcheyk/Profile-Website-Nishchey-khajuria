import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Highlight, themes } from 'prism-react-renderer';
import TopNav from './TopNav';
import CommandPalette from '../../../components/ui/CommandPalette';
import { useVFS } from '../../../context/VFSContext';
import { useKeyDown } from '../../../hooks/useKeyDown';

export const EDITOR_TABS = [
  { id: 'App.tsx', label: 'App.tsx' },
  { id: 'data.json', label: 'data.json' },
  { id: 'ZenEditor.tsx', label: 'ZenEditor.tsx' },
  { id: 'HeroDashboard.tsx', label: 'HeroDashboard.tsx' },
  { id: 'TerminalTheme.tsx', label: 'TerminalTheme.tsx' },
];

export default function ZenEditor({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('code');
  const { getFile, updateFile } = useVFS();

  // Sync Scroll Ref
  const gutterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  useKeyDown((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsCommandPaletteOpen((prev) => !prev);
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      // VFS auto-saves on change, so this is just for the user's peace of mind
      console.log('Saved to VFS');
    }
  });

  const currentSource = getFile(activeTab) || '// Source not found in VFS';
  const lineCount = currentSource.split('\n').length;

  return (
    <div className="flex-1 flex flex-col bg-[#0d1117] overflow-hidden relative text-primary">
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
        onSelectTab={setActiveTab} 
        tabs={EDITOR_TABS} 
      />

      <TopNav 
        tabs={EDITOR_TABS} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      {/* Editor Body */}
      <div className="flex-1 flex overflow-hidden relative perspective-[2000px]">
        {/* Line Numbers Gutter */}
        <div 
          ref={gutterRef}
          className="w-12 shrink-0 bg-[#020617] border-r border-surfaceBorder flex flex-col items-end py-8 pr-4 font-mono text-xs text-secondary select-none opacity-50 z-10 overflow-hidden"
        >
          {Array.from({ length: viewMode === 'code' ? Math.max(150, lineCount + 50) : 150 }).map((_, i) => (
            <div key={i} className={`mb-4 leading-none ${viewMode === 'code' ? 'h-[21px] mb-0 leading-[21px]' : ''}`}>{i + 1}</div>
          ))}
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth no-scrollbar" onScroll={handleScroll}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${viewMode}`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className={`min-h-full origin-center [transform-style:preserve-3d] ${viewMode === 'preview' ? 'p-8' : ''}`}
            >
              {viewMode === 'preview' ? (
                <div className="text-secondary text-sm">Preview rendering requires full build engine. View the site directly to see effects.</div>
              ) : (
                <div className="relative p-8 pb-32 min-h-full">
                  <textarea
                    ref={textRef}
                    value={currentSource}
                    onChange={(e) => updateFile(activeTab, e.target.value)}
                    spellCheck={false}
                    className="absolute inset-0 p-8 m-0 w-full h-full resize-none outline-none bg-transparent text-transparent caret-white font-mono text-[13px] leading-[21px] z-10"
                    style={{ whiteSpace: 'pre' }}
                  />
                  <Highlight theme={themes.dracula} code={currentSource} language={activeTab.endsWith('.json') ? 'json' : 'tsx'}>
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre className={`${className} bg-transparent! text-[13px] font-mono absolute inset-0 p-8 m-0 pointer-events-none`} style={{ ...style }}>
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })} className="h-[21px] leading-[21px]">
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
