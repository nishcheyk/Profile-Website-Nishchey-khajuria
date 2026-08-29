import React from "react";
import { motion } from "framer-motion";
import { useMotion } from "../../hooks/useMotion";

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ defaultText, defaultIcon, onClick, style }) => {
  const { springs, reduced } = useMotion();

  return (
    <motion.button 
      onClick={onClick} 
      style={style}
      className="flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-full font-medium shadow-sm hover:bg-white cursor-pointer transition-colors"
      whileHover={!reduced ? { scale: 1.02 } : {}}
      whileTap={!reduced ? { scale: 0.97 } : {}}
      transition={springs.momentum}
    >
      {defaultIcon && <span>{defaultIcon}</span>}
      <span>{defaultText}</span>
    </motion.button>
  );
};

export default AnimatedButton;
