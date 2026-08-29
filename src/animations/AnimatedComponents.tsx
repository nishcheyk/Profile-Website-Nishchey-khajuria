import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpItem, popInItem } from './index';
import { useMotion } from '../hooks/useMotion';

export const Motion: React.FC<any> = ({ children, className = '', as = 'div', ...props }) => {
  const MotionComponent = motion(as as any);
  return (
    <MotionComponent className={className} {...props}>
      {children}
    </MotionComponent>
  );
};

interface AnimProps {
  children: React.ReactNode;
  className?: string;
  as?: string;
}

function makeWrapper(getProps: (m: ReturnType<typeof useMotion>) => object) {
  return function Wrapper({ children, className = '', as = 'div', ...rest }: AnimProps & any) {
    const m = useMotion();
    const animProps = getProps(m);
    const MotionComponent = motion(as as any);
    return (
      <MotionComponent {...animProps} className={className} {...rest}>
        {children}
      </MotionComponent>
    );
  };
}

export const FadeIn   = makeWrapper(m => m.fadeIn);
export const PopUp    = makeWrapper(m => m.popUp);
export const SlideUp  = makeWrapper(m => m.slideUp);
export const SlideDown = makeWrapper(m => m.slideDown);
export const ScaleIn  = makeWrapper(m => m.scaleIn);
export const SlideRight = makeWrapper(m => m.slideRight);

export const StaggerContainer: React.FC<any> = ({ children, className = '', as = 'div', ...props }) => {
  const MotionComponent = motion(as as any);
  return (
    <MotionComponent
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export const AnimatedItem: React.FC<any> = ({
  children,
  animation = 'fadeUp',
  className = '',
  as = 'div',
  ...props
}) => {
  const MotionComponent = motion(as as any);
  return (
    <MotionComponent variants={animation === 'fadeUp' ? fadeUpItem : popInItem} className={className} {...props}>
      {children}
    </MotionComponent>
  );
};
