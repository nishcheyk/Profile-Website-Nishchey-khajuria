import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  {
    id: 'ide',
    name: 'IDE Theme',
    subtitle: 'A fully functional VS Code clone',
    color: '#3b82f6',
    description: 'Built to feel like a real development environment — not a mockup.',
    features: [
      {
        category: 'Authentic IDE Shell',
        items: [
          'Full Activity Bar with working Explorer, Search, Source Control, and Extensions panels.',
          'Tab system with 3D rotateY() flip animation between Preview and Source Code views.',
          'Synchronized line-number gutter that scrolls with the content area.',
          'Ctrl+K / Cmd+K Command Palette to jump between files.',
          'Ctrl+` keyboard shortcut toggles the terminal open/closed.',
          'Status bar with live GitHub branch link, file encoding, and language mode toasts.',
        ],
      },
      {
        category: 'Live Interactive Terminal',
        items: [
          'Three-tab terminal: Terminal (interactive), Output (boot log), Problems.',
          'Type `whoami` or `npm run whoami` for the full AI/Full-Stack developer USP.',
          'Type `ls` to list real projects. Type `help` for command reference.',
          'Type `clear` to reset the session.',
          'Type `echo <anything>` to echo text back.',
        ],
      },
      {
        category: 'Architecture Tab',
        items: [
          'A permanent ARCHITECTURE.md tab documents the entire portfolio system design.',
          'Explains all three themes, component hierarchy, and motion philosophy.',
        ],
      },
    ],
      eggs: [
      {
        trigger: 'Type any wrong command in the terminal (e.g. `make me coffee`)',
        effect: 'Plays the iconic "Fahhh" meme sound via HTML5 Audio.',
      },
      {
        trigger: 'Look at the Problems tab in the terminal',
        effect: '"No problems detected... except you haven\'t hired me yet."',
      },
      {
        trigger: 'Type `sudo rm -rf /` in the terminal',
        effect: 'Terminal text flashes red, a self-destruct countdown fires, and the system denies you politely.',
      },
      {
        trigger: 'Type `secrets` in the terminal',
        effect: 'Prints a hint to open the SECRETS.md tab.',
      },
    ],
  },
  {
    id: 'saas',
    name: 'SaaS Theme',
    subtitle: 'A premium B2B SaaS product landing page',
    color: '#8b5cf6',
    description: 'Positions the same portfolio as a polished enterprise software product.',
    features: [
      {
        category: 'Product-Level Design',
        items: [
          'Hero section with animated live dashboard mockup showing real AI metrics.',
          'Feature Sliders section with interactive tabs switching between code and UI examples.',
          'Integrations constellation — animated SVG connecting AI tools (OpenAI, Qdrant, ElevenLabs, Twilio).',
          'Animated pricing cards with a recommended plan highlight.',
          'Testimonials carousel with spring-physics slide transitions.',
          'Fully structured FAQ accordion with smooth height animation.',
          'Code Showcase section displaying a real RAG system snippet with syntax highlighting.',
        ],
      },
      {
        category: 'Navigation & UX',
        items: [
          'Sticky glassmorphism navbar with backdrop-blur that appears on scroll.',
          'CTA buttons use whileTap scale feedback for satisfying press feel.',
          'Footer with accessible navigation links.',
        ],
      },
    ],
      eggs: [
      {
        trigger: 'Click the "N" logo or brand name in the navbar 5 times rapidly',
        effect: 'The brand name bursts into animated rainbow letters spelling "You found me!" with a shake animation on the logo.',
      },
    ],
  },
  {
    id: 'bento',
    name: 'Bento Theme',
    subtitle: 'An Apple-inspired spatial portfolio',
    color: '#10b981',
    description: 'Inspired by Apple\'s Spatial Design language — cards with depth, tilt, and light.',
    features: [
      {
        category: 'Spatial Card System',
        items: [
          'TiltCard component responds to mouse position with real-time 3D perspective tilt.',
          'SpatialCard — glassmorphism surface with ambient border glow and backdrop blur.',
          'AmbientMetrics — floating metric panels with subtle pulse animations.',
          'DesignPhilosophy — a 3D card flip cycling through core engineering values.',
        ],
      },
      {
        category: 'Identity & Story',
        items: [
          'HeroIdentity section with animated name reveal using staggered character entrance.',
          'TrajectoryTimeline — an interactive career timeline with expand-on-hover mechanics.',
          'CinematicProjects — project cards with full-bleed image reveal on hover.',
          'SkillMatrix — filterable skills grid with category tabs.',
        ],
      },
    ],
      eggs: [
      {
        trigger: 'Click your name ("Nishchey.") in the hero section 5 times rapidly',
        effect: '28 colored confetti particles explode outward from the click point in a full 360-degree radial burst.',
      },
    ],
  },
];

const globalFeatures = [
  {
    name: 'Spark AI Assistant',
    description: 'A floating AI chat assistant (bottom right) available on all themes. Powered by Gemini. Draggable, dismissable, with a retro custom scrollbar.',
  },
  {
    name: 'Theme Switcher',
    description: 'Three distinct themes — IDE, SaaS, and Bento — each render the same portfolio content in a completely different visual language.',
  },
  {
    name: 'Bootloader',
    description: 'The portfolio opens with an animated bootloader sequence before handing control to the active theme.',
  },
  {
    name: 'prefers-reduced-motion',
    description: 'All animations respect the operating system\'s reduced-motion preference via useReducedMotion().',
  },
  {
    name: 'Zero-Emoji Policy',
    description: 'The entire codebase has been audited — absolutely no emoji characters exist anywhere in the UI.',
  },
  {
    name: 'Konami Code (Global Easter Egg)',
    description: 'Works on any theme. Type: Up Up Down Down Left Right Left Right B A — a Matrix rain overlay takes over the screen for 4 seconds with the message: "KONAMI CODE ACTIVATED. Now hire me."',
  },
];

export default function Secrets() {
  const [activeTheme, setActiveTheme] = useState('ide');
  const current = themes.find(t => t.id === activeTheme)!;

  return (
    <div className="min-h-full text-white font-mono pb-24 px-2 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10 border-b border-white/10 pb-8">
          <p className="text-[11px] text-[#64748b] uppercase tracking-widest mb-2"># SECRETS.md</p>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-3">What Makes This Portfolio Different</h1>
          <p className="text-[#64748b] text-sm max-w-2xl leading-relaxed">
            Every theme is a complete, production-quality product built from scratch. This document covers the unique mechanics, hidden interactions, and design decisions that make each one special.
          </p>
        </div>

        <div className="mb-10">
          <p className="text-[11px] text-[#64748b] uppercase tracking-widest mb-4">## Global Features</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {globalFeatures.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-lg p-4"
              >
                <p className="text-[#e2e8f0] text-sm font-semibold mb-1">{f.name}</p>
                <p className="text-[#64748b] text-xs leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-[11px] text-[#64748b] uppercase tracking-widest mb-4">## Theme Deep-Dives</p>
          <div className="flex gap-2 mb-6">
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTheme(t.id)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${activeTheme === t.id ? 'text-white' : 'text-[#64748b] hover:text-white bg-white/[0.03]'}`}
                style={activeTheme === t.id ? { backgroundColor: t.color + '33', color: t.color, border: `1px solid ${t.color}55` } : { border: '1px solid transparent' }}
              >
                {t.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTheme}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6 bg-white/[0.02] border rounded-xl p-5" style={{ borderColor: current.color + '33' }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: current.color }} />
                  <div>
                    <h2 className="text-white font-bold text-lg">{current.name}</h2>
                    <p className="text-xs" style={{ color: current.color }}>{current.subtitle}</p>
                  </div>
                </div>
                <p className="text-[#94a3b8] text-sm ml-5">{current.description}</p>
              </div>

              {current.features.map((section, si) => (
                <div key={section.category} className="mb-5">
                  <p className="text-[11px] uppercase tracking-widest mb-3" style={{ color: current.color }}>
                    ### {section.category}
                  </p>
                  <ul className="space-y-2">
                    {section.items.map((item, ii) => (
                      <motion.li
                        key={ii}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: si * 0.05 + ii * 0.04 }}
                        className="flex items-start gap-3 text-[#94a3b8] text-sm"
                      >
                        <span className="text-[#334155] mt-1 shrink-0">-</span>
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="mt-6 bg-[#0f172a] border border-yellow-500/20 rounded-xl p-5">
                <p className="text-[11px] uppercase tracking-widest text-yellow-500/70 mb-4">### Easter Eggs</p>
                <div className="space-y-4">
                  {current.eggs.map((egg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="border border-yellow-500/10 rounded-lg p-4 bg-yellow-500/[0.03]"
                    >
                      <p className="text-[11px] text-yellow-500/60 uppercase tracking-wider mb-1">Trigger</p>
                      <p className="text-[#e2e8f0] text-sm font-mono mb-3">{egg.trigger}</p>
                      <p className="text-[11px] text-yellow-500/60 uppercase tracking-wider mb-1">Effect</p>
                      <p className="text-[#94a3b8] text-sm">{egg.effect}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
