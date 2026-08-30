import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { springStructural } from '../../../animations';

const INITIAL_METRICS = [
  { label: 'Uptime', value: '99.99%', trend: '+0.01%' },
  { label: 'Latency', value: '24ms', trend: '-2ms' },
  { label: 'Active Users', value: '1,204', trend: '+12%' }
];

export default function HeroDashboard() {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1, ...springStructural }}
      className="w-full mt-16 rounded-2xl border border-slate-200/50 bg-white/70 backdrop-blur-3xl shadow-2xl overflow-hidden relative"
    >
      <div className="h-12 border-b border-slate-200/50 bg-white/50 backdrop-blur-md flex items-center px-4 gap-2 relative z-10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-xs font-medium text-slate-500 font-mono bg-slate-100/50 px-4 py-1 rounded-md border border-slate-200/50">
          app.nishchey.dev
        </div>
      </div>

      <div className="flex h-[320px] md:h-[420px]">
        <div className="hidden md:flex w-52 lg:w-64 border-r border-slate-200/50 bg-slate-50/30 p-4 flex-col gap-2 shrink-0">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-2">Main Menu</div>
          {['Overview', 'Analytics', 'Deployments', 'Settings'].map((item, i) => (
            <motion.div
              key={item}
              whileHover={{ scale: 0.98, backgroundColor: 'rgba(79, 70, 229, 0.05)' }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors ${i === 0 ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {item}
            </motion.div>
          ))}

          <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden group cursor-pointer">
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            <div className="font-bold text-sm mb-1 relative z-10">Pro Plan Active</div>
            <div className="text-xs text-indigo-100 relative z-10">Unlimited bandwidth</div>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-8 bg-slate-50/10 flex flex-col gap-4 md:gap-6 overflow-hidden">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight">Overview</h2>
              <p className="text-xs md:text-sm text-slate-500">Real-time metrics for your infrastructure.</p>
            </div>
            <div className="flex gap-2">
              <span className="px-2 md:px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">System Healthy</span>
            </div>
          </div>

          <Reorder.Group 
            axis="x" 
            values={metrics} 
            onReorder={setMetrics} 
            className="grid grid-cols-3 gap-2 md:gap-4"
          >
            {metrics.map((metric, i) => (
              <Reorder.Item
                key={metric.label}
                value={metric}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1), ...springStructural }}
                whileDrag={{ scale: 1.05, cursor: 'grabbing', zIndex: 10, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
                whileHover={{ y: -2, cursor: 'grab', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm relative touch-none bg-opacity-70 backdrop-blur-xl"
              >
                <div className="text-xs font-medium text-slate-500 mb-1">{metric.label}</div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2">
                  <div className="text-base md:text-2xl font-black text-slate-900 tracking-tight">{metric.value}</div>
                  <div className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md w-fit">{metric.trend}</div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-1 border border-slate-200 rounded-2xl bg-white p-4 flex flex-col relative overflow-hidden"
          >
            <div className="text-sm font-bold text-slate-900 mb-4">Traffic Analysis</div>
            <svg viewBox="0 0 400 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(79, 70, 229, 0.2)" />
                  <stop offset="100%" stopColor="rgba(79, 70, 229, 0)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 0,100 L 0,80 Q 50,20 100,50 T 200,40 T 300,60 T 400,20 L 400,100 Z"
                fill="url(#gradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.path
                d="M 0,80 Q 50,20 100,50 T 200,40 T 300,60 T 400,20"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
