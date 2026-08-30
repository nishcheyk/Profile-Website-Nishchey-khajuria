import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { SaasSection, SaasSectionHeading } from '../../../components/ui/SaasSection';

const plans = [
  {
    name: "Consulting",
    priceMonthly: 150,
    priceAnnual: 120,
    desc: "Hourly rate for architecture consulting & debugging.",
    features: ["System Architecture", "Code Review", "AI Integration Strategy", "Performance Audit"],
    buttonText: "Book Session",
    popular: false,
    link: "mailto:nishcheykhajuria@gmail.com"
  },
  {
    name: "Project Build",
    priceMonthly: 4999,
    priceAnnual: 3999,
    desc: "End-to-end development of MVPs and scalable platforms.",
    features: ["Full Stack Development", "Custom UI/UX", "Database Design", "Cloud Deployment", "30-Day Support"],
    buttonText: "Request Quote",
    popular: true,
    link: "mailto:nishcheykhajuria@gmail.com"
  },
  {
    name: "Retainer",
    priceMonthly: 3000,
    priceAnnual: 2500,
    desc: "Ongoing development and priority maintenance.",
    features: ["Dedicated Hours", "Priority Response", "Continuous Integration", "Feature Expansion", "Infrastructure Scaling"],
    buttonText: "Hire Me",
    popular: false,
    link: "mailto:nishcheykhajuria@gmail.com"
  }
];

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <SaasSection id="engagement" center>
      <SaasSectionHeading title="Simple, transparent pricing." subtitle="Choose the perfect plan for your needs. Always know what you'll pay." />

      <div className="flex justify-center items-center gap-4 mb-12">
        <span className={`text-sm font-bold ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
        <div 
          className="w-14 h-8 bg-slate-200 rounded-full p-1 cursor-pointer flex relative shadow-inner"
          onClick={() => setIsAnnual(!isAnnual)}
        >
          <motion.div 
            className="w-6 h-6 bg-white rounded-full shadow-sm"
            animate={{ x: isAnnual ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
        <span className={`text-sm font-bold flex items-center gap-2 ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
          Annually <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {plans.map((plan, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`relative p-8 rounded-3xl border flex flex-col h-full bg-white/70 backdrop-blur-xl transition-shadow hover:shadow-2xl hover:shadow-indigo-500/10 ${
              plan.popular ? 'border-indigo-500 shadow-xl shadow-indigo-500/10' : 'border-slate-200 shadow-sm'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                Most Popular
              </div>
            )}
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
            <p className="text-slate-500 text-sm mb-6 h-10">{plan.desc}</p>
            
            <div className="mb-8 flex items-baseline gap-1 relative overflow-hidden h-16">
              <span className="text-xl font-bold text-slate-400 self-start mt-2">$</span>
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={isAnnual ? 'annual' : 'monthly'}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className="text-5xl font-black text-slate-900 absolute left-4"
                >
                  {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                </motion.span>
              </AnimatePresence>
              <span className="text-slate-500 font-medium ml-20">/mo</span>
            </div>

            <button className={`w-full py-3 rounded-full font-bold text-sm mb-8 transition-colors ${
              plan.popular 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200' 
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
