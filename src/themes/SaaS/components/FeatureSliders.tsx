import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiShield, FiZap, FiCpu } from 'react-icons/fi';

const features = [
  {
    icon: <FiZap className="w-6 h-6 text-amber-500" />,
    title: "Sub-100ms Voice Latency",
    desc: "Optimized WebRTC streams and WebSocket connections ensure conversations flow naturally without awkward robotic delays.",
    bg: "bg-amber-50",
    border: "border-amber-100"
  },
  {
    icon: <FiShield className="w-6 h-6 text-emerald-500" />,
    title: "Contextual RAG Memory",
    desc: "Vectorized conversation history using Qdrant ensures your agent remembers past interactions with pixel-perfect accuracy.",
    bg: "bg-emerald-50",
    border: "border-emerald-100"
  },
  {
    icon: <FiCpu className="w-6 h-6 text-purple-500" />,
    title: "Human-like Interruptibility",
    desc: "Advanced Voice Activity Detection (VAD) allows users to cut off the AI mid-sentence, instantly halting synthesis.",
    bg: "bg-purple-50",
    border: "border-purple-100"
  }
];

export const FeatureSliders = () => {
  return (
    <section className="py-32 px-6 lg:px-12 w-full max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Side: Sticky Text */}
        <div className="lg:w-1/3 text-left">
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built for conversation.</h2>
            <p className="text-xl text-slate-500 mb-8">
              Everything you need to deploy human-like voice agents that understand nuance, context, and timing.
            </p>
            <ul className="space-y-4">
              {['Twilio Media Streams', 'ElevenLabs Synthesis', 'OpenAI Realtime API'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <FiCheckCircle className="text-indigo-600" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Sliding Cards */}
        <div className="lg:w-2/3 flex flex-col gap-8 w-full">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", damping: 25, stiffness: 120, delay: i * 0.15 }}
              className={`p-8 rounded-3xl border bg-white shadow-xl shadow-slate-200/50 flex gap-6 items-start ${feature.border}`}
            >
              <div className={`p-4 rounded-2xl shrink-0 ${feature.bg}`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
