import React from 'react';
import { motion } from 'framer-motion';
import { SaasSection, SaasSectionHeading } from '../../../components/ui/SaasSection';
import { skills } from '../../../data/constants';

// We take a subset of top skills to display as SaaS integrations
const integrations = skills.slice(0, 8).map(s => ({
  icon: <img src={s.image} alt={s.alt} className="w-10 h-10 object-contain grayscale opacity-80" />,
  name: s.title,
  color: 'text-slate-500' // Generic color for the orbit line styling
}));

export const Integrations = () => {
  return (
    <SaasSection center>
      <SaasSectionHeading title="Plays well with others." subtitle="Seamlessly integrate with your favorite tools and platforms in minutes." />

      <div className="relative w-full max-w-4xl">
        <div className="hidden md:flex items-center justify-center h-[400px] relative">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="w-32 h-32 rounded-3xl bg-indigo-600 text-white flex items-center justify-center text-4xl font-serif italic shadow-2xl shadow-indigo-600/40 z-10 relative"
          >
            N
          </motion.div>

          {integrations.map((integration, i) => {
            const angle = (i * 360) / integrations.length;
            const radius = 180;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            return (
              <React.Fragment key={i}>
                <motion.svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 0 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                >
                  <line
                    x1="50%" y1="50%"
                    x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4"
                    className="text-slate-200"
                  />
                </motion.svg>
                <motion.div
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  whileInView={{ opacity: 1, x, y, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.2 + (i * 0.1) }}
                  className={`absolute w-20 h-20 bg-white rounded-2xl shadow-xl shadow-slate-200/50 flex items-center justify-center border border-slate-100 ${integration.color} hover:scale-110 transition-transform cursor-pointer`}
                >
                  {integration.icon}
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex md:hidden flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="w-20 h-20 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-serif italic shadow-2xl shadow-indigo-600/40"
          >
            N
          </motion.div>
          <div className="grid grid-cols-3 gap-4 w-full">
            {integrations.map((integration, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`w-full aspect-square bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-1 border border-slate-100 ${integration.color}`}
              >
                {integration.icon}
                <span className="text-xs text-slate-500 font-medium">{integration.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SaasSection>
  );
};
