import React from 'react';
import { motion } from 'framer-motion';

const Text: React.FC<TextProps> = ({ as: Component = 'p', children, className = '', ...props }) => {
  const isDisplay = ['h1', 'h2', 'h3'].includes(Component as string);
  const trackingClass = isDisplay ? 'tracking-tighter' : 'tracking-normal';
  
  return React.createElement(
    Component,
    { className: `${trackingClass} ${className}`, ...props },
    children
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ as = 'p', children, className = '', variants, ...props }) => {
  const MotionComponent = motion(as as string) as React.ElementType;
  const isDisplay = ['h1', 'h2', 'h3'].includes(as as string);
  const trackingClass = isDisplay ? 'tracking-tighter' : 'tracking-normal';

  return (
    <MotionComponent className={`${trackingClass} ${className}`} variants={variants} {...props}>
      {children}
    </MotionComponent>
  );
};

export default Text;
