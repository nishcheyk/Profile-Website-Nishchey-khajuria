import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'info' | 'success' | 'error' | 'warning';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  show: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i',
};

const COLORS: Record<ToastType, { bg: string; border: string; icon: string; bar: string }> = {
  success: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: 'bg-emerald-500', bar: 'bg-emerald-500' },
  error:   { bg: 'bg-red-500/10',     border: 'border-red-500/30',     icon: 'bg-red-500',     bar: 'bg-red-500' },
  warning: { bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   icon: 'bg-amber-500',   bar: 'bg-amber-500' },
  info:    { bg: 'bg-indigo-500/10',  border: 'border-indigo-500/30',  icon: 'bg-indigo-500',  bar: 'bg-indigo-500' },
};

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const c = COLORS[item.type];
  const duration = item.duration ?? 3500;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.9 }}
      transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
      className={`relative flex items-start gap-3 w-80 px-4 py-3.5 rounded-2xl ${c.bg} border ${c.border} backdrop-blur-2xl shadow-2xl shadow-black/30 overflow-hidden cursor-pointer`}
      onClick={() => onDismiss(item.id)}
    >
      <div className={`w-6 h-6 rounded-full ${c.icon} flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5`}>
        {ICONS[item.type]}
      </div>
      <p className="text-white/90 text-sm leading-relaxed flex-1 pr-1">{item.message}</p>
      <motion.div
        className={`absolute bottom-0 left-0 h-[2px] ${c.bar}`}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
      />
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const show = useCallback((message: string, type: ToastType = 'info', duration = 3500) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev.slice(-4), { id, message, type, duration }]);
    timers.current[id] = setTimeout(() => dismiss(id), duration);
  }, [dismiss]);

  const ctx: ToastContextValue = {
    show,
    success: (m, d) => show(m, 'success', d),
    error:   (m, d) => show(m, 'error', d),
    warning: (m, d) => show(m, 'warning', d),
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <div className="fixed bottom-24 right-4 z-[99999] flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence initial={false} mode="sync">
          {toasts.map(t => (
            <div key={t.id} className="pointer-events-auto">
              <ToastCard item={t} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
}
