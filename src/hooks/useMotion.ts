import { useReducedMotion } from 'framer-motion';
import {
  springStructural,
  springMomentum,
  springDrawer,
  springHover,
  staggerContainer,
  popInItem,
  fadeUpItem,
} from '../animations';

export interface MotionProps {
  initial: object;
  animate: object;
  exit?: object;
  transition: object;
}

export interface MotionVariantProps {
  variants: object;
  initial: string;
  animate: string;
  exit?: string;
}

export function useMotion() {
  const reduced = useReducedMotion();

  const none: MotionProps = {
    initial: {},
    animate: {},
    transition: { duration: 0 },
  };

  const fadeIn: MotionProps = reduced ? none : {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
    transition: { duration: 0.25, ease: 'easeOut' },
  };

  const popUp: MotionProps = reduced ? none : {
    initial: { opacity: 0, y: 16, scale: 0.96 },
    animate: { opacity: 1, y: 0,  scale: 1 },
    exit:    { opacity: 0, y: 16, scale: 0.96 },
    transition: springDrawer,
  };

  const slideDown: MotionProps = reduced ? none : {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -8 },
    transition: springDrawer,
  };

  const slideUp: MotionProps = reduced ? none : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: 20 },
    transition: springStructural,
  };

  const scaleIn: MotionProps = reduced ? none : {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.8 },
    transition: { type: 'spring', bounce: 0.4, duration: 0.4 },
  };

  const slideRight: MotionProps = reduced ? none : {
    initial: { opacity: 0, x: 40, scale: 0.95 },
    animate: { opacity: 1, x: 0,  scale: 1 },
    exit:    { opacity: 0, x: 40, scale: 0.9 },
    transition: springMomentum,
  };

  const stagger: MotionVariantProps = {
    variants: staggerContainer,
    initial: 'hidden',
    animate: 'visible',
  };

  const staggerItem: MotionVariantProps = {
    variants: fadeUpItem,
    initial: 'hidden',
    animate: 'visible',
  };

  const popItem: MotionVariantProps = {
    variants: popInItem,
    initial: 'hidden',
    animate: 'visible',
  };

  return {
    reduced,
    springs: { structural: springStructural, momentum: springMomentum, drawer: springDrawer, hover: springHover },
    fadeIn,
    popUp,
    slideDown,
    slideUp,
    scaleIn,
    slideRight,
    stagger,
    staggerItem,
    popItem,
  };
}
