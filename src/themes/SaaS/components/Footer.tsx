import React from 'react';
import { motion } from 'framer-motion';
import { springStructural } from '../../../animations';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-24 px-6 relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* CTA Section */}
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to scale?</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springStructural}
            className="bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold shadow-2xl shadow-white/10 hover:shadow-white/20 transition-shadow"
          >
            Deploy Architecture
          </motion.button>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 border-t border-slate-800 pt-16">
          <div>
            <div className="flex items-center gap-2 mb-6 text-white font-bold">
              <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center font-serif italic text-xs">
                N
              </div>
              NishcheyCloud
            </div>
            <p className="text-sm">Engineering exceptional software at scale.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Infrastructure</a></li>
              <li><a href="/" className="hover:text-white transition-colors">AI Engine</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Customers</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Nishchey Khajuria. All rights reserved.
        </div>
        
      </div>
    </footer>
  );
}
