import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { VscFolderActive, VscTerminalLinux, VscRocket, VscPlay, VscDeviceCameraVideo, VscKey } from 'react-icons/vsc';
import { useTime } from '../hooks/useTime';
import { useToast } from '../components/ui/Toast';
import { Motion } from '../animations/AnimatedComponents';

const DESKTOP_ICONS = [
  { id: 'ide', title: 'The Engineer', desc: 'A full IDE interface.', Icon: VscFolderActive, color: 'text-blue-400', path: '/ide' },
  { id: 'saas', title: 'The Product', desc: 'A high-converting B2B SaaS landing page.', Icon: VscRocket, color: 'text-fuchsia-400', path: '/saas' },
  { id: 'terminal', title: 'The Hacker', desc: 'A retro CLI environment.', Icon: VscTerminalLinux, color: 'text-green-400', path: '/terminal' },
  { id: 'game', title: 'The Player', desc: 'A 2D interactive RPG map.', Icon: VscPlay, color: 'text-yellow-400', path: '/game' },
  { id: 'cinematic', title: 'The Director', desc: 'Brutalist cinematic scroll.', Icon: VscDeviceCameraVideo, color: 'text-orange-400', path: '/cinematic' },
  { id: 'secret', title: 'The Architect', desc: 'System administrator.', Icon: VscKey, color: 'text-slate-400', path: '#secret' },
];

const SECRET_SEQUENCE = ['ide', 'saas', 'game', 'terminal'];

const MENUS = (toast: ReturnType<typeof useToast>) => ({
  File: [
    { label: 'New Window', shortcut: 'Cmd N', action: () => window.open(window.location.href, '_blank') },
    { label: 'Open Theme...', separator: false },
    { label: 'The Engineer (IDE)', action: () => window.location.hash = '/ide' },
    { label: 'The Product (SaaS)', action: () => window.location.hash = '/saas' },
    { label: 'The Hacker (Terminal)', action: () => window.location.hash = '/terminal' },
    { label: 'The Player (Game)', action: () => window.location.hash = '/game' },
    { label: 'The Director (Cinematic)', action: () => window.location.hash = '/cinematic' },
    { label: '', separator: true },
    { label: 'GitHub', action: () => window.open('https://github.com/nishcheyk', '_blank') },
    { label: 'LinkedIn', action: () => window.open('https://www.linkedin.com/in/nishchey-khajuria-26a0b4236/', '_blank') },
  ],
  Edit: [
    { label: 'Select All Icons', shortcut: 'Cmd A', action: () => toast.show('All themes selected') },
    { label: '', separator: true },
    { label: 'Copy Portfolio URL', shortcut: 'Cmd C', action: () => { navigator.clipboard.writeText(window.location.href); toast.success('URL copied to clipboard'); } },
    { label: 'Share via Email', action: () => window.open('mailto:?subject=Check%20out%20this%20portfolio&body=' + encodeURIComponent(window.location.href)) },
  ],
  View: [
    { label: 'Reload', shortcut: 'Cmd R', action: () => window.location.reload() },
    { label: '', separator: true },
    { label: 'About This Portfolio', action: () => toast.show('Portfolio v1.0.0 — Built by Nishchey Khajuria. 4 themes. Infinite passion.') },
    { label: 'View Source on GitHub', action: () => window.open('https://github.com/nishcheyk', '_blank') },
    { label: '', separator: true },
    { label: 'Konami Code Hint', action: () => toast.show('Hint: Up Up Down Down Left Right Left Right B A') },
  ],
});

function MenuDropdown({ items, onClose }: {
  items: MenuItem[];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className="absolute top-full left-0 mt-0.5 min-w-[220px] bg-[#1e293b]/95 backdrop-blur-2xl border border-white/10 rounded-lg shadow-2xl z-[100] overflow-hidden py-1"
    >
      {items.map((item, i) =>
        item.separator ? (
          <div key={i} className="h-px bg-white/10 my-1" />
        ) : item.action ? (
          <button
            key={i}
            onClick={() => { item.action!(); onClose(); }}
            className="w-full flex items-center justify-between px-4 py-1.5 text-[13px] text-white/85 hover:bg-white/10 transition-colors text-left"
          >
            <span>{item.label}</span>
            {item.shortcut && <span className="text-white/30 text-[11px] ml-8">{item.shortcut}</span>}
          </button>
        ) : (
          <div key={i} className="px-4 py-1 text-[11px] text-white/30 uppercase tracking-widest">{item.label}</div>
        )
      )}
    </motion.div>
  );
}

export default function Bootloader() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [secretProgress, setSecretProgress] = useState<string[]>([]);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const secretTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const time = useTime();
  const toast = useToast();
  const activeMenus = MENUS(toast);

  const handleIconClick = (iconId: string) => {
    setSelectedIcon(iconId);
    const next = [...secretProgress, iconId];
    const slice = next.slice(-SECRET_SEQUENCE.length);
    setSecretProgress(slice);
    if (secretTimerRef.current) clearTimeout(secretTimerRef.current);
    secretTimerRef.current = setTimeout(() => setSecretProgress([]), 4000);
    if (slice.join(',') === SECRET_SEQUENCE.join(',')) {
      setSecretUnlocked(true);
      setSecretProgress([]);
      setTimeout(() => setSecretUnlocked(false), 5000);
    }
  };

  useEffect(() => {
    return () => { if (secretTimerRef.current) clearTimeout(secretTimerRef.current); };
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const close = () => setOpenMenu(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [openMenu]);

  return (
    <div className="h-screen w-screen bg-[#0f172a] overflow-hidden relative font-sans select-none">

      <div className="absolute inset-0 bg-cover bg-center opacity-40 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020617]/90" />

      <div className="absolute top-0 left-0 right-0 h-7 bg-black/30 backdrop-blur-md border-b border-white/10 flex items-center px-4 justify-between text-xs text-white z-50">
        <div className="flex items-center gap-1 h-full">
          <span className="font-serif italic font-bold px-3 h-full flex items-center">NK</span>
          <span className="font-bold px-3 h-full flex items-center">NishcheyOS</span>

          {Object.keys(activeMenus).map(menu => (
            <div key={menu} className="relative h-full">
              <button
                onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === menu ? null : menu); }}
                className={`px-3 h-full flex items-center font-medium transition-colors rounded-sm ${openMenu === menu ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                {menu}
              </button>
              <AnimatePresence>
                {openMenu === menu && (
                  <MenuDropdown
                    items={activeMenus[menu as keyof typeof activeMenus]}
                    onClose={() => setOpenMenu(null)}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 font-medium">
          <button
            onClick={() => window.open('https://github.com/nishcheyk', '_blank')}
            className="hover:text-white/60 transition-colors"
          >
            GitHub
          </button>
          <span className="font-mono tabular-nums">{time}</span>
        </div>
      </div>

      <div className="absolute top-12 left-4 hidden md:flex flex-col gap-6 z-10 w-24">
        {DESKTOP_ICONS.map((icon, i) => (
          <motion.div
            key={icon.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            onClick={() => handleIconClick(icon.id)}
            onDoubleClick={() => {
              if (icon.id === 'secret') setShowExplanation(true);
              else navigate(icon.path);
            }}
            className={`group relative flex flex-col items-center gap-1 cursor-pointer p-2 rounded-md border border-transparent transition-colors ${
              selectedIcon === icon.id ? 'bg-white/20 border-white/30 backdrop-blur-sm' : 'hover:bg-white/10'
            }`}
          >
            <motion.div
              animate={secretProgress.includes(icon.id) && secretProgress[secretProgress.length - 1] === icon.id
                ? { scale: [1, 1.25, 1], filter: ['brightness(1)', 'brightness(2)', 'brightness(1)'] }
                : {}}
              transition={{ duration: 0.3 }}
            >
              <icon.Icon size={48} className={`drop-shadow-lg ${icon.color}`} />
            </motion.div>
            <span className={`text-xs text-center font-medium drop-shadow-md px-1 rounded ${
              selectedIcon === icon.id ? 'bg-blue-600 text-white' : 'text-white'
            }`}>
              {icon.title}
            </span>
            
            {/* Hover Tooltip */}
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur border border-white/20 text-white text-xs p-2 rounded-lg w-40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              <div className="font-bold mb-1">{icon.title}</div>
              <div className="text-slate-300">{icon.desc}</div>
              <div className="mt-2 text-[10px] text-blue-400 animate-pulse">Double click to boot</div>
            </div>

            {secretProgress.length > 0 && (
              <div className="flex gap-0.5 mt-0.5">
                {SECRET_SEQUENCE.map((s, idx) => (
                  <div
                    key={idx}
                    className={`w-1 h-1 rounded-full transition-colors ${
                      secretProgress[idx] === s ? 'bg-yellow-400' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-8 left-0 right-0 md:hidden flex flex-col items-center justify-center z-10 px-4">
        {selectedIcon && (
          <div className="mb-4 text-center bg-black/60 backdrop-blur border border-white/20 p-2 rounded-lg text-white max-w-sm">
            <span className="font-bold text-sm block mb-1">{DESKTOP_ICONS.find(i => i.id === selectedIcon)?.title}</span>
            <span className="text-xs text-slate-300">{DESKTOP_ICONS.find(i => i.id === selectedIcon)?.desc}</span>
            <div className="mt-1 text-[10px] text-blue-400 animate-pulse">Double tap to boot</div>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-3 max-w-sm">
          {DESKTOP_ICONS.map((icon, i) => (
            <motion.div
              key={icon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              onClick={() => handleIconClick(icon.id)}
              onDoubleClick={() => {
                if (icon.id === 'secret') setShowExplanation(true);
                else navigate(icon.path);
              }}
              className={`flex flex-col items-center gap-1 cursor-pointer p-2 rounded-xl border border-transparent transition-colors w-16 ${
                selectedIcon === icon.id ? 'bg-white/20 border-white/30' : 'hover:bg-white/10'
              }`}
            >
              <icon.Icon size={28} className={`drop-shadow-lg ${icon.color}`} />
              <span className="text-[9px] text-center font-medium text-white/80 leading-tight">{icon.title}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center p-6 md:p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl w-full max-w-2xl pointer-events-auto mb-20 md:mb-0"
        >
          <h1 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tight">Welcome to the Multiverse</h1>
          <p className="text-[#cbd5e1] text-base md:text-lg leading-relaxed mb-4 md:mb-6">
            I couldn't decide on a single design for my portfolio. I was torn between a sleek IDE, an interactive 2D Game, a B2B SaaS landing page, a Cinematic scroll, or a classic Hacker terminal... <br /><br />
            <strong>So I built them all.</strong>
          </p>
          <p className="text-[#94a3b8] font-mono text-xs md:text-sm uppercase tracking-widest animate-pulse">
            [ Double-click an icon to boot a reality ]
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {secretUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-xl border border-yellow-500/40 rounded-2xl px-8 py-5 text-center max-w-sm"
          >
            <p className="text-yellow-400 font-mono font-bold text-lg mb-1">SECRET UNLOCKED</p>
            <p className="text-white/70 font-mono text-sm mb-3">Engineer → Product → Designer → Hacker</p>
            <p className="text-white/40 text-xs font-mono">Now check the SECRETS.md tab in the IDE theme.</p>
            <motion.div
              className="absolute -inset-px rounded-2xl pointer-events-none"
              animate={{ boxShadow: ['0 0 0px rgba(234,179,8,0)', '0 0 24px rgba(234,179,8,0.3)', '0 0 0px rgba(234,179,8,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExplanation && (
          <Motion
            as="div"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowExplanation(false)}
          >
            <Motion
              as="div"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-[#0f172a] border border-white/20 rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
              
              <h2 className="text-3xl font-bold text-white mb-2">The Architect's Secret</h2>
              <p className="text-indigo-400 font-mono text-sm mb-6 uppercase tracking-widest">Why I built 4 portfolios in one</p>
              
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                <p>
                  Most developers build a single portfolio. But human identity is fractured—I am an engineer who loves strict logic, a designer who craves spatial aesthetics, a product builder focused on conversion, and a hacker who lives in the terminal.
                </p>
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="text-blue-400 font-bold mb-1">The IDE</div>
                    <div className="text-xs text-slate-400">Proves I can build complex state-driven web apps that feel like native software.</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="text-orange-400 font-bold mb-1">The Bento</div>
                    <div className="text-xs text-slate-400">Proves my eye for modern Apple-style design, spatial UI, and micro-interactions.</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="text-fuchsia-400 font-bold mb-1">The SaaS</div>
                    <div className="text-xs text-slate-400">Proves I understand business metrics, conversion funnels, and landing page architecture.</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="text-green-400 font-bold mb-1">The Terminal</div>
                    <div className="text-xs text-slate-400">Proves my foundation in low-level systems, CLI tools, and hacker culture.</div>
                  </div>
                </div>
                <p>
                  This isn't just a website. It's a fully functional operating system for my career, built with React, Framer Motion, and Tailwind CSS.
                </p>
              </div>

              <button 
                onClick={() => setShowExplanation(false)}
                className="mt-8 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Close File
              </button>
            </Motion>
          </Motion>
        )}
      </AnimatePresence>

    </div>
  );
}
