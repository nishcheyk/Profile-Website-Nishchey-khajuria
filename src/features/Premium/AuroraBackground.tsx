import React from 'react';
import { motion } from 'framer-motion';

const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden pointer-events-none">
      
      {/* Dark overlay to keep text legible */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Animated glowing orbs */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] sm:w-[50vw] sm:h-[50vw] rounded-full blur-[100px] opacity-40 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(0,0,0,0) 70%)' }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-20%', '20%', '-20%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-0 w-[70vw] h-[70vw] sm:w-[40vw] sm:h-[40vw] rounded-full blur-[100px] opacity-40 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.8) 0%, rgba(0,0,0,0) 70%)' }}
        animate={{
          x: ['20%', '-20%', '20%'],
          y: ['-20%', '20%', '-20%'],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/4 w-[90vw] h-[90vw] sm:w-[60vw] sm:h-[60vw] rounded-full blur-[100px] opacity-30 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(0,0,0,0) 70%)' }}
        animate={{
          x: ['-10%', '30%', '-10%'],
          y: ['20%', '-20%', '20%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />
    </div>
  );
};

export default AuroraBackground;
