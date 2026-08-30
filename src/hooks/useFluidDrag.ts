import { useMotionValue, useTransform, useSpring, MotionValue } from "framer-motion";

export const appleSpring = {
  type: "spring",
  damping: 1, // Critically damped, no overshoot
  stiffness: 200, // Apple's response ~0.4s
  mass: 1
};

export const appleBounce = {
  type: "spring",
  damping: 0.8, // Under-damped, slight bounce for momentum
  stiffness: 250,
  mass: 1
};

export function useFluidDrag(
  x: MotionValue<number>, 
  y: MotionValue<number>, 
  bounds?: { left: number; right: number; top: number; bottom: number }
) {
  // Add a slight resistance scaling (rubber banding) past the boundaries
  // This is typically handled by Framer Motion's `dragElastic` automatically,
  // but we provide a spring wrapper for the motion values to ensure 
  // interruptibility and velocity handoff on release.
  
  const springX = useSpring(x, appleSpring);
  const springY = useSpring(y, appleSpring);

  return {
    x: springX,
    y: springY,
    dragOptions: {
      drag: true,
      dragElastic: 0.1, // Apple's stiff rubber-banding
      dragMomentum: true,
      dragTransition: { bounceStiffness: 600, bounceDamping: 20 },
      dragConstraints: bounds,
    }
  };
}
