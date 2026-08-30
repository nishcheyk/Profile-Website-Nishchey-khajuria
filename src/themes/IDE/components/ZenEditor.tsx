import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Highlight, themes } from 'prism-react-renderer';
import TopNav from './TopNav';
import Home from '../../../components/sections/Home';
import Projects from '../../../components/sections/Projects';
import Experience from '../../../components/sections/Experience';
import Skills from '../../../components/sections/Skills';
import Contact from '../../../components/sections/Contact';
import Architecture from '../../../components/sections/Architecture';
import Secrets from '../../../components/sections/Secrets';
import CommandPalette from '../../../components/ui/CommandPalette';
import sourceRegistry from '../sourceRegistry.json';
import { useKeyDown } from '../../../hooks/useKeyDown';

export const EDITOR_TABS = [
  { id: 'architecture', label: 'ARCHITECTURE.md' },
  { id: 'secrets', label: 'SECRETS.md' },
  { id: 'home', label: 'Home.tsx' },
  { id: 'projects', label: 'Projects.tsx' },
  { id: 'experience', label: 'Experience.tsx' },
  { id: 'skills', label: 'Skills.tsx' },
  { id: 'contact', label: 'Contact.tsx' },
];

export default function ZenEditor({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  // Sync Scroll Ref
  const gutterRef = useRef<HTMLDivElement>(null);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  useKeyDown((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsCommandPaletteOpen((prev) => !prev);
    }
  });


  const renderContent = () => {
    switch (activeTab) {
      case 'architecture': return <Architecture />;
      case 'secrets': return <Secrets />;
      case 'home': return <Home setActiveTab={setActiveTab} />;
      case 'projects': return <Projects />;
      case 'experience': return <Experience />;
      case 'skills': return <Skills />;
      case 'contact': return <Contact />;
      default: return <Home setActiveTab={setActiveTab} />;
    }
  };

  const currentSource = (sourceRegistry as Record<string, string>)[activeTab] || '// Source not found';
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
          {Array.from({ length: viewMode === 'code' ? lineCount : 150 }).map((_, i) => (
            <div key={i} className={`mb-4 leading-none ${viewMode === 'code' ? 'h-[21px] mb-0 leading-[21px]' : ''}`}>{i + 1}</div>
          ))}
        </div>
        
        {/* Content Area */}
        <div 
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth no-scrollbar"
        >
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
                renderContent()
              ) : (
                <div className="p-8 pb-32">
                  <Highlight theme={themes.dracula} code={currentSource} language="tsx">
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre className={`${className} bg-transparent! text-[13px] font-mono`} style={{ ...style }}>
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
