import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMotion } from '../../hooks/useMotion';
import Text from '../ui/Text';

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Career", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { springs } = useMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <nav className="fixed w-full z-50 top-0 bg-background/50 backdrop-blur-xl border-b border-surfaceBorder transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold tracking-tighter hover:text-accent transition-colors">
              Nishchey Khajuria
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-1 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive ? "text-primary" : "text-secondary hover:text-primary"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-surface border border-surfaceBorder rounded-full -z-10"
                      transition={springs.drawer}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-secondary hover:text-primary focus:outline-none relative"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="block text-2xl"
                >
                  {isMobileMenuOpen ? "✕" : "☰"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, transformOrigin: "top right" }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={springs.drawer}
            className="sm:hidden absolute top-16 right-4 w-64 bg-background/90 backdrop-blur-2xl border border-surfaceBorder rounded-2xl shadow-xl overflow-hidden origin-top-right p-2"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive ? "bg-surface text-primary" : "text-secondary hover:bg-surfaceBorder/50 hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
