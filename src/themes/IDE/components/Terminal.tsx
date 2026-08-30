import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VscClose, VscChevronDown } from 'react-icons/vsc';

interface TerminalProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MIN_HEIGHT = 120;
const MAX_HEIGHT = 500;

export default function Terminal({ isOpen, onToggle }: TerminalProps) {
  const [activeTab, setActiveTab] = useState<'terminal' | 'output' | 'problems'>('terminal');
  const [history, setHistory] = useState<{ command: string; output: string; isError?: boolean }[]>([
    { command: '', output: 'Welcome to Nishchey OS v1.0.0.\nType "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [height, setHeight] = useState(180);
  const [isSelfDestruct, setIsSelfDestruct] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const dragStartHeight = useRef<number>(180);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const onDragStart = useCallback((e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
    dragStartHeight.current = height;
    window.addEventListener('pointermove', onDragMove);
    window.addEventListener('pointerup', onDragEnd);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  const onDragMove = useCallback((e: PointerEvent) => {
    if (dragStartY.current === null) return;
    const delta = dragStartY.current - e.clientY;
    const newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, dragStartHeight.current + delta));
    setHeight(newHeight);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEnd = useCallback(() => {
    dragStartY.current = null;
    window.removeEventListener('pointermove', onDragMove);
    window.removeEventListener('pointerup', onDragEnd);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playErrorSound = () => {
    try {
      const audio = new Audio('/fahhh.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch (e) {}
  };

  const triggerSelfDestruct = () => {
    setIsSelfDestruct(true);
    setTimeout(() => setIsSelfDestruct(false), 3000);
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      const cmdLower = cmd.toLowerCase();
      let output = '';
      let isError = false;

      switch (cmdLower) {
        case 'help':
          output = 'Available commands:\n  whoami    - Display bio & AI USP\n  clear     - Clear terminal\n  ls        - List projects\n  echo      - Print text\n  secrets   - Open SECRETS.md';
          break;
        case 'whoami':
        case 'npm run whoami':
          output = `Nishchey Khajuria - Full Stack Developer & AI Engineer
--------------------------------------------------
[+] Specialization: Sub-100ms Voice AI & RAG Infrastructure
[+] Frontend: React, Next.js, Framer Motion (Zero Layout Shift)
[+] Backend: FastAPI, Node.js, Postgres
[+] AI Stack: OpenAI, ElevenLabs, Qdrant, Twilio WebRTC
--------------------------------------------------
> Engineering impossible software at scale.`;
          break;
        case 'ls':
          output = 'Projects:\n  - NeuroPulse AI (RAG + Voice)\n  - STORY E-Commerce (Shopify)\n  - WePegasus Web Platform\n  - EditEase Document Platform\n  - Asankart E-Commerce';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'sudo rm -rf /':
        case 'sudo rm -rf /*':
          triggerSelfDestruct();
          output = 'PERMISSION DENIED.\nInitiating self-destruct in 3... 2... 1...\n[SYSTEM] Just kidding. Nice try though.';
          isError = true;
          break;
        case 'secrets':
          output = 'Opening SECRETS.md... Try clicking the SECRETS.md tab in the editor above.';
          break;
        default:
          if (cmdLower.startsWith('echo ')) {
            output = cmd.substring(5);
          } else if (cmd) {
            output = `Command not found: ${cmd}. Type "help" for a list of commands.`;
            isError = true;
            playErrorSound();
          }
      }

      if (cmd) {
        setHistory((prev) => [...prev, { command: cmd, output, isError }]);
      }
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          className={`w-full bg-[#020617] border-t border-[#1e293b] flex flex-col shrink-0 relative z-20 transition-colors ${isSelfDestruct ? 'border-red-500/50' : ''}`}
          style={{ height }}
        >
          <div
            onPointerDown={onDragStart}
            className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize group z-30"
          >
            <div className="w-full h-full group-hover:bg-accent/40 transition-colors rounded" />
          </div>

          <div className={`flex items-center justify-between px-4 h-9 border-b border-[#1e293b] select-none transition-colors ${isSelfDestruct ? 'border-red-500/30' : ''}`}>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`font-mono text-[11px] uppercase tracking-wider pb-2 translate-y-1 transition-colors ${activeTab === 'terminal' ? 'text-[#e2e8f0] border-b-2 border-accent' : 'text-[#64748b] hover:text-[#e2e8f0]'}`}
              >
                Terminal
              </button>
              <button
                onClick={() => setActiveTab('output')}
                className={`font-mono text-[11px] uppercase tracking-wider pb-2 translate-y-1 transition-colors ${activeTab === 'output' ? 'text-[#e2e8f0] border-b-2 border-accent' : 'text-[#64748b] hover:text-[#e2e8f0]'}`}
              >
                Output
              </button>
              <button
                onClick={() => setActiveTab('problems')}
                className={`font-mono text-[11px] uppercase tracking-wider pb-2 translate-y-1 transition-colors ${activeTab === 'problems' ? 'text-[#e2e8f0] border-b-2 border-accent' : 'text-[#64748b] hover:text-[#e2e8f0]'}`}
              >
                Problems
              </button>
            </div>
            <div className="flex items-center gap-2 text-[#64748b]">
              <button onClick={onToggle} className="hover:text-white transition-colors p-1"><VscChevronDown size={14} /></button>
              <button onClick={onToggle} className="hover:text-white transition-colors p-1"><VscClose size={14} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 font-mono text-sm text-[#e2e8f0]">
            {activeTab === 'terminal' && (
              <>
                {history.map((entry, i) => (
                  <div key={i} className="mb-2">
                    {entry.command && (
                      <div className="flex items-center gap-2 text-accent">
                        <span>~/profile-website $</span>
                        <span className="text-[#e2e8f0]">{entry.command}</span>
                      </div>
                    )}
                    {entry.output && (
                      <div className={`whitespace-pre-wrap mt-1 ${entry.isError ? 'text-red-400' : 'text-[#94a3b8]'}`}>
                        {entry.output}
                      </div>
                    )}
                  </div>
                ))}

                <div className={`flex items-center gap-2 mt-2 ${isSelfDestruct ? 'text-red-400' : 'text-accent'}`}>
                  <span>~/profile-website $</span>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-[#e2e8f0] font-mono"
                  />
                </div>
                <div ref={bottomRef} />
              </>
            )}

            {activeTab === 'output' && (
              <div className="text-[#94a3b8] whitespace-pre-wrap">
                [Info] Booting Nishchey OS Runtime Environment...{'\n'}
                [Info] AI Voice Agent Subsystem: INITIALIZED{'\n'}
                [Info] RAG Vector Database (Qdrant): CONNECTED{'\n'}
                [Info] React Server Components: READY{'\n'}
                [Success] Build completed successfully. No errors found.
              </div>
            )}

            {activeTab === 'problems' && (
              <div className="flex flex-col items-center justify-center h-full text-[#64748b]">
                <p>No problems have been detected in the workspace.</p>
                <p className="mt-4 text-xs italic opacity-50">...except for the fact that you haven't hired me yet.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
