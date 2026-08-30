import React, { useEffect, useState, useRef, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import Bootloader from "./pages/Bootloader";
import SparkAssistant from "./features/Spark";
import { ToastProvider } from "./components/ui/Toast";
import { ThemeSkeleton } from "./components/ui/ThemeSkeleton";
import { VFSProvider } from "./context/VFSContext";
import "./App.css";
import { useKeyDown } from "./hooks/useKeyDown";

const IDETheme = lazy(() => import('./themes/IDE'));
const SaaSTheme = lazy(() => import('./themes/SaaS/index'));
const TerminalTheme = lazy(() => import('./themes/Terminal'));
const GameTheme = lazy(() => import('./themes/Game/index'));
const InterviewTheme = lazy(() => import('./themes/Interview/index'));
const CinematicTheme = lazy(() => import('./themes/Cinematic/index'));

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a'
];

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / 16);
    const drops = Array(cols).fill(1);
    const chars = 'アイウエオカキクケコ01ABCDEFGHIJKLMNOPQRSTUVWXYZ</>{}[]';
    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = '14px monospace';
      drops.forEach((y, x) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, x * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[x] = 0;
        drops[x]++;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function App() {
  const [konamiActive, setKonamiActive] = useState(false);
  const seqRef = useRef<string[]>([]);

  useKeyDown((e) => {
    seqRef.current = [...seqRef.current, e.key].slice(-KONAMI.length);
    if (seqRef.current.join(',') === KONAMI.join(',')) {
      setKonamiActive(true);
      new Audio('/fahhh.mp3').play().catch(() => {});
      setTimeout(() => setKonamiActive(false), 4000);
    }
  });

  const location = useLocation();

  return (
    <VFSProvider>
      <ToastProvider>
        <ErrorBoundary>
          <Suspense fallback={<ThemeSkeleton />}>
            <Routes>
              <Route path="/" element={<Bootloader />} />
              <Route path="/ide" element={<IDETheme />} />
              <Route path="/saas" element={<SaaSTheme />} />
              <Route path="/terminal" element={<TerminalTheme />} />
              <Route path="/game" element={<GameTheme />} />
              <Route path="/interview" element={<InterviewTheme />} />
              <Route path="/cinematic" element={<CinematicTheme />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>

          {location.pathname === '/' && <SparkAssistant />}

          <AnimatePresence>
            {konamiActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] overflow-hidden bg-black flex flex-col items-center justify-center"
              >
                <MatrixRain />
                <div className="relative z-10 text-center">
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', bounce: 0.4 }}
                    className="text-green-400 font-mono text-3xl font-bold mb-2"
                  >
                    KONAMI CODE ACTIVATED
                  </motion.p>
                  <p className="text-green-400/60 font-mono text-sm">You found the secret. Now hire me.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ErrorBoundary>
      </ToastProvider>
    </VFSProvider>
  );
}

export default App;
