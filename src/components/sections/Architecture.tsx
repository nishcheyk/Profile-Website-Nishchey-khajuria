import React from 'react';
import { motion } from 'framer-motion';

export default function Architecture() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-8 font-sans text-slate-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-invert prose-slate max-w-none"
      >
        <h1 className="text-4xl font-bold text-white mb-6">ARCHITECTURE.md</h1>
        
        <h2 className="text-2xl font-bold text-indigo-400 mt-12 mb-4">Multi-Dimensional Engineering</h2>
        <p className="text-lg leading-relaxed mb-6">
          I build full-stack applications with enterprise resilience and consumer-grade aesthetics. 
          But my core differentiator is the integration of sub-100ms conversational AI and LLM orchestration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-3">Full-Stack UI/UX</h3>
            <ul className="space-y-2 text-slate-400">
              <li>• React, Next.js, and Framer Motion</li>
              <li>• Zero-layout-shift render pipelines</li>
              <li>• Critically damped spring physics</li>
              <li>• Native-feeling PWA architectures</li>
            </ul>
          </div>
          
          <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-3">AI Infrastructure</h3>
            <ul className="space-y-2 text-slate-400">
              <li>• WebRTC Audio Streaming (Twilio)</li>
              <li>• LLM Orchestration (OpenAI/FastAPI)</li>
              <li>• Vector Memory (Qdrant RAG)</li>
              <li>• Sub-100ms Voice Synthesis (ElevenLabs)</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-indigo-400 mt-12 mb-4">The Pipeline</h2>
        <div className="bg-black/50 p-6 rounded-xl border border-slate-800 font-mono text-sm overflow-x-auto text-emerald-400">
          {`Client (WebRTC) <---> FastAPI Server <---> OpenAI (LLM) + Qdrant (Memory)
      |                                           |
      v                                           v
[Audio Stream]                            [Text Stream]
      |                                           |
      +------------> ElevenLabs <-----------------+`}
        </div>

        <div className="mt-12 p-4 border-l-4 border-indigo-500 bg-indigo-500/10">
          <p className="text-indigo-200 font-medium">
            Run <code className="bg-black/30 px-2 py-1 rounded text-indigo-400">npm run whoami</code> in the terminal to see live stats.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
