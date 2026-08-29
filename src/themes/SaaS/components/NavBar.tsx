import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { VscChevronLeft, VscMenu, VscClose } from 'react-icons/vsc';
import { springStructural } from '../../../animations';
import { useClickEgg } from '../../../hooks/useClickEgg';

export const NavBar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { triggered: showEasterEgg, handleClick: handleLogoClick } = useClickEgg(5);

  const rainbow = ['#f43f5e','#fb923c','#facc15','#4ade80','#38bdf8','#818cf8','#e879f9'];

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Tech Stack', href: '#skills' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springStructural}
      className="fixed top-0 inset-x-0 h-16 md:h-20 bg-white/50 backdrop-blur-2xl border-b border-slate-200/50 z-50 px-4 md:px-6 lg:px-12 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
        >
          <VscChevronLeft size={18} />
        </motion.button>
        <div className="font-bold text-lg md:text-xl tracking-tight flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          <motion.div
            animate={showEasterEgg ? { rotate: [0, 15, -15, 15, -15, 0], scale: [1, 1.3, 1] } : {}}
            className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-serif italic text-base md:text-lg shadow-lg shadow-indigo-600/20"
          >
            N
          </motion.div>
          <AnimatePresence mode="wait">
            {showEasterEgg ? (
              <motion.span key="rainbow" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-bold">
                {['Y','o','u',' ','f','o','u','n','d',' ','m','e','!'].map((ch, i) => (
                  <span key={i} style={{ color: rainbow[i % rainbow.length] }}>{ch}</span>
                ))}
              </motion.span>
            ) : (
              <motion.span key="normal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Nishchey<span className="text-slate-400 font-normal">Cloud</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-8 justify-center gap-8 text-sm font-medium text-slate-500">
        {navLinks.map(link => (
          <a key={link.label} href={link.href} className="hover:text-slate-900 transition-colors">{link.label}</a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <a href="https://github.com/nishcheyk" target="_blank" rel="noreferrer" className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
          GitHub
        </a>
        <motion.a
          href="mailto:nishcheykhajuria@gmail.com"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden sm:block bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-xl shadow-slate-900/20 hover:shadow-slate-900/40 transition-shadow"
        >
          Contact
        </motion.a>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-600 hover:text-slate-900 transition-colors p-1"
        >
          {mobileMenuOpen ? <VscClose size={22} /> : <VscMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-slate-200 py-4 px-4 flex flex-col gap-3 md:hidden shadow-xl"
          >
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 font-medium py-2 border-b border-slate-100 last:border-0 hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="https://github.com/nishcheyk" target="_blank" rel="noreferrer" className="text-slate-700 font-medium py-2 border-b border-slate-100">GitHub</a>
            <a
              href="mailto:nishcheykhajuria@gmail.com"
              className="mt-1 bg-slate-900 text-white px-4 py-2.5 rounded-full text-sm font-medium text-center"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
