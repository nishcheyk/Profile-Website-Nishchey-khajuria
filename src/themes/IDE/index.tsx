import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKeyDown } from "../../hooks/useKeyDown";
import { VscFiles, VscSearch, VscSourceControl, VscExtensions, VscChevronLeft } from "react-icons/vsc";
import ZenEditor from "./components/ZenEditor";
import Sidebar from "./components/Sidebar";
import SourceControl from "./components/SourceControl";
import ActivityBar from "./components/ActivityBar";
import StatusBar from "./components/StatusBar";
import Terminal from "./components/Terminal";
import SearchPanel from "./components/SearchPanel";
import ExtensionsPanel from "./components/ExtensionsPanel";

export default function IDETheme() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('App.tsx');
  const [activePanel, setActivePanel] = useState<'explorer' | 'search' | 'source-control' | 'extensions'>('explorer');
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useKeyDown((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '`') setIsTerminalOpen((prev) => !prev);
  });

  const mobileNavItems = [
    { id: 'explorer' as const, Icon: VscFiles, label: 'Files' },
    { id: 'search' as const, Icon: VscSearch, label: 'Search' },
    { id: 'source-control' as const, Icon: VscSourceControl, label: 'Git' },
    { id: 'extensions' as const, Icon: VscExtensions, label: 'Extensions' },
  ];

  const handleMobilePanelChange = (panel: typeof activePanel) => {
    if (isSidebarOpen && activePanel === panel) {
      setIsSidebarOpen(false);
    } else {
      setActivePanel(panel);
      setIsSidebarOpen(true);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-primary selection:bg-accent/30 font-sans flex flex-col relative">
      <div className="flex-1 flex overflow-hidden">
        <ActivityBar activePanel={activePanel} onPanelChange={setActivePanel} onBack={() => navigate('/')} />

        {activePanel === 'explorer' && (
          <div className={`${isSidebarOpen ? 'flex' : 'hidden'} md:flex`}>
            <Sidebar activeTab={activeTab} onSelect={(id) => { setActiveTab(id); setIsSidebarOpen(false); }} />
          </div>
        )}
        {activePanel === 'search' && (
          <div className={`${isSidebarOpen ? 'flex' : 'hidden'} md:flex`}>
            <SearchPanel />
          </div>
        )}
        {activePanel === 'source-control' && (
          <div className={`${isSidebarOpen ? 'flex' : 'hidden'} md:flex`}>
            <SourceControl />
          </div>
        )}
        {activePanel === 'extensions' && (
          <div className={`${isSidebarOpen ? 'flex' : 'hidden'} md:flex`}>
            <ExtensionsPanel />
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden relative">
          <ZenEditor activeTab={activeTab} setActiveTab={setActiveTab} />
          <Terminal isOpen={isTerminalOpen} onToggle={() => setIsTerminalOpen(!isTerminalOpen)} />
        </div>
      </div>

      <StatusBar onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)} />

      <div className="md:hidden flex bg-[#020617] border-t border-surfaceBorder z-30">
        <button
          onClick={() => navigate('/')}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-secondary hover:text-white transition-colors"
        >
          <VscChevronLeft size={18} />
          <span className="text-[9px]">Back</span>
        </button>
        {mobileNavItems.map(({ id, Icon, label }) => (
          <button
            key={id}
            onClick={() => handleMobilePanelChange(id)}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${isSidebarOpen && activePanel === id ? 'text-accent' : 'text-secondary hover:text-white'
              }`}
          >
            <Icon size={18} />
            <span className="text-[9px]">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
