import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { SaasSection, SaasSectionHeading } from '../../../components/ui/SaasSection';

const plans = [
  {
    name: "Consulting",
    price: "Hourly",
    desc: "For architecture reviews, code audits, and AI strategy.",
    features: ["System Architecture Design", "RAG Pipeline Audit", "Performance Profiling", "Pair Programming"],
    buttonText: "Book a Session",
    popular: false
  },
  {
    name: "Project Build",
    price: "Fixed",
    period: " scope",
    desc: "For building MVP voice agents or integrating AI into your app.",
    features: ["End-to-end Development", "Voice AI Integration", "Custom LLM Orchestration", "Deployment & Handoff", "30 Days Support"],
    buttonText: "Request Estimate",
    popular: true
  },
  {
    name: "Retainer",
    price: "Monthly",
    desc: "For ongoing engineering and scalable infrastructure maintenance.",
    features: ["Dedicated Development Hours", "Priority Response", "Infrastructure Scaling", "Continuous Optimization", "Weekly Syncs"],
    buttonText: "Discuss Retainer",
    popular: false
  }
];

export const Pricing = () => {
  return (
    <SaasSection id="engagement" center>
      <SaasSectionHeading title="Engagement Models." subtitle="Whether you need a quick audit or a dedicated AI engineering partner, I'm available for select projects." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {plans.map((plan, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`relative p-8 rounded-3xl border flex flex-col h-full bg-white transition-shadow hover:shadow-2xl hover:shadow-indigo-500/10 ${
              plan.popular ? 'border-indigo-500 shadow-xl shadow-indigo-500/10' : 'border-slate-200 shadow-sm'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                Most Popular
              </div>
            )}
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
            <p className="text-slate-500 text-sm mb-6 h-10">{plan.desc}</p>
            
            <div className="mb-8">
              <span className="text-5xl font-black text-slate-900">{plan.price}</span>
              {plan.period && <span className="text-slate-500 font-medium">{plan.period}</span>}
            </div>

            <button className={`w-full py-3 rounded-full font-bold text-sm mb-8 transition-colors ${
              plan.popular 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}>
              {plan.buttonText}
            </button>

            <ul className="space-y-4 mt-auto">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-600 text-sm">
                  <FiCheck className="text-indigo-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SaasSection>
  );
};
