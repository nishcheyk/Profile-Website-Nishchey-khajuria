import React from "react";
import { motion } from "framer-motion";

const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background -z-10 pointer-events-none">
      {/* Massive soft radial blob - Orange */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(circle,_#FFEDD5_0%,_transparent_70%)] rounded-full mix-blend-multiply opacity-60" 
      />
      
      {/* Massive soft radial blob - Peach */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-[radial-gradient(circle,_#FFE4E6_0%,_transparent_70%)] rounded-full mix-blend-multiply opacity-40" 
      />

      {/* Center subtle glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
        className="absolute top-[30%] left-[30%] w-[600px] h-[600px] bg-[radial-gradient(circle,_#FEF3C7_0%,_transparent_70%)] rounded-full mix-blend-multiply opacity-30" 
      />

      {/* Optional: subtle noise overlay to give it a physical texture 
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      */}
    </div>
  );
};

export default Background;
