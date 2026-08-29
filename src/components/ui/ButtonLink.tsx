import React from 'react';
import { motion } from 'framer-motion';
import { useMotion } from '../../hooks/useMotion';
import Text from './Text';

const ButtonLink: React.FC<ButtonLinkProps> = ({ url, text, padding = "px-6 py-2", className = "" }) => {
  const { springs, reduced } = useMotion();
  
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`inline-block ${padding} bg-primary text-background font-medium rounded-full shadow-sm hover:bg-white text-center cursor-pointer ${className}`}
      whileHover={!reduced ? { scale: 1.02 } : {}}
      whileTap={!reduced ? { scale: 0.97 } : {}}
      transition={springs.momentum}
    >
      {text}
    </motion.a>
  );
}

export default ButtonLink;