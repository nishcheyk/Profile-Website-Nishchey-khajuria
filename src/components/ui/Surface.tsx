import React from 'react';
import { motion } from 'framer-motion';
import { useMotion } from '../../hooks/useMotion';

const Surface: React.FC<SurfaceProps> = ({ children, className = '', hoverable = false, ...props }) => {
  const { springs, reduced } = useMotion();

  return (
    <motion.div
      className={`bg-surface border border-surfaceBorder rounded-2xl shadow-sm overflow-hidden ${className}`}
      whileHover={hoverable && !reduced ? { scale: 1.02 } : {}}
      whileTap={hoverable && !reduced ? { scale: 0.97 } : {}}
      transition={springs.momentum}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Surface;
