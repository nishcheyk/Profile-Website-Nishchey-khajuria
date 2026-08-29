import { useSpring, MotionValue } from 'framer-motion';

// --- Apple Design Spring Configurations ---

/**
 * Critically Damped Default (Structural UI)
 * Use for moving/repositioning structural elements where overshoot looks sloppy.
 * Maps to Apple's default damping: 1.0, response: 0.4
 */
export const springStructural = {
  type: "spring",
  bounce: 0,
  duration: 0.4
};

/**
 * Momentum Spring (Physical UI)
 * Use for elements that were thrown or flicked (cards, drawers, momentum items).
 * Maps to Apple's slightly bouncy damping: 0.8, response: 0.4
 */
export const springMomentum = {
  type: "spring",
  bounce: 0.2, // ~0.8 damping
  duration: 0.4
};

/**
 * Snappy Drawer Spring
 * Fast, slight bounce for sheets and modals.
 */
export const springDrawer = {
  type: "spring",
  bounce: 0.15,
  duration: 0.3
};

/**
 * Hover State Micro-animation
 * Very fast, no bounce, for instant response on buttons/cards.
 */
export const springHover = {
  type: "spring",
  bounce: 0,
  duration: 0.15
};

// --- Reusable Variants ---

export const fadeEnter = {
  hidden: { opacity: 0, y: 15, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: springStructural
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const popInItem = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: springStructural 
  }
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: springStructural 
  }
};

// --- Custom Hooks ---

/**
 * Apple-style continuous rubber-band physics for raw motion values.
 * Provides a critically damped spring attached to a raw motion value.
 */
export function useAppleSpring(value: MotionValue<number>, isMomentum = false) {
  return useSpring(value, isMomentum ? { stiffness: 200, damping: 20 } : { stiffness: 150, damping: 15 });
}
