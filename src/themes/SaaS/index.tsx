import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { CodeShowcase } from './components/CodeShowcase';
import { FeatureSliders } from './components/FeatureSliders';
import { Integrations } from './components/Integrations';
import { Pricing } from './components/Pricing';

export default function SaaSTheme() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-x-hidden">
      
      {/* Animated Gradient Mesh Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-0 inset-x-0 h-[100vh] -z-10 overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100 blur-[100px] opacity-60 mix-blend-multiply animate-blob" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-100 blur-[100px] opacity-60 mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] rounded-full bg-emerald-50 blur-[120px] opacity-60 mix-blend-multiply animate-blob animation-delay-4000" />
      </motion.div>

      {/* Navigation */}
      <NavBar />

      {/* Main Content */}
      <main className="pt-24 md:pt-32 pb-16 space-y-16 md:space-y-24">
        
        <Hero />
        <CodeShowcase />
        <FeatureSliders />
        <BentoGrid />
        <Integrations />
        <Testimonials />
        <Pricing />
        <FAQ />
        
      </main>
      
      <Footer />
    </div>
  );
}
