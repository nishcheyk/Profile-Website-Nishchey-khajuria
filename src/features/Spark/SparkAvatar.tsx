import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface SparkAvatarProps {
  isOpen: boolean;
  isThinking: boolean;
  onClick: () => void;
}

export function SparkAvatar({ isOpen, isThinking, onClick }: SparkAvatarProps) {
  const [positionX, setPositionX] = useState(0); // Offset from original position
  const [isWalking, setIsWalking] = useState(false);
  const [facingLeft, setFacingLeft] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const wander = async () => {
      if (isOpen) {
        // If chat opens, sprint back to base
        setIsWalking(true);
        setFacingLeft(false);
        await controls.start({ x: 0, transition: { duration: 0.5, ease: 'easeOut' } });
        setPositionX(0);
        setIsWalking(false);
        setFacingLeft(true);
        return;
      }

      // Randomly pick a new X offset (from -600 to 0)
      const targetX = -Math.floor(Math.random() * (window.innerWidth - 200));
      const distance = Math.abs(targetX - positionX);
      const duration = distance / 100; // 100px per second

      // Turn to face direction
      setFacingLeft(targetX < positionX);
      setIsWalking(true);

      // Walk to target
      await controls.start({ x: targetX, transition: { duration, ease: 'linear' } });
      setPositionX(targetX);
      setIsWalking(false);

      // Idle for 2-5 seconds
      timeout = setTimeout(wander, 2000 + Math.random() * 3000);
    };

    if (!isOpen) {
      timeout = setTimeout(wander, 2000);
    } else {
      wander();
    }

    return () => clearTimeout(timeout);
  }, [isOpen, positionX, controls]);

  return (
    <motion.div
      className="w-16 h-16 cursor-pointer pointer-events-auto relative origin-bottom"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      animate={controls}
    >
      {/* Container for flipping */}
      <motion.div
        className="w-full h-full"
        animate={{ scaleX: facingLeft ? -1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Minecraft Style Blocky Dog */}
        <motion.svg
          viewBox="0 0 64 64"
          className="w-full h-full drop-shadow-lg"
          animate={isWalking ? { y: [0, -4, 0] } : (isThinking ? { y: [0, -2, 0] } : { y: 0 })}
          transition={{ repeat: Infinity, duration: isWalking ? 0.3 : 1 }}
        >
          <g fill="#d97706">
            {/* Back Leg Left */}
            <motion.rect x="16" y="44" width="6" height="12"
              animate={isWalking ? { rotate: [-15, 15, -15], originY: '44px' } : {}}
              transition={{ repeat: Infinity, duration: 0.4 }}
            />
            {/* Front Leg Left */}
            <motion.rect x="36" y="44" width="6" height="12"
              animate={isWalking ? { rotate: [15, -15, 15], originY: '44px' } : {}}
              transition={{ repeat: Infinity, duration: 0.4 }}
            />
          </g>

          <g fill="#fbbf24">
            {/* Body */}
            <rect x="14" y="28" width="34" height="18" rx="2" />

            {/* Tail */}
            <motion.rect x="8" y="28" width="6" height="6"
              animate={isWalking || isThinking ? { rotate: [-20, 20, -20], originX: '14px', originY: '34px' } : {}}
              transition={{ repeat: Infinity, duration: 0.2 }}
            />

            {/* Back Leg Right */}
            <motion.rect x="24" y="44" width="6" height="12"
              animate={isWalking ? { rotate: [15, -15, 15], originY: '44px' } : {}}
              transition={{ repeat: Infinity, duration: 0.4 }}
            />
            {/* Front Leg Right */}
            <motion.rect x="44" y="44" width="6" height="12"
              animate={isWalking ? { rotate: [-15, 15, -15], originY: '44px' } : {}}
              transition={{ repeat: Infinity, duration: 0.4 }}
            />

            {/* Head */}
            <motion.g animate={isThinking ? { rotate: [0, 5, -5, 0], originX: '48px', originY: '24px' } : {}} transition={{ repeat: Infinity, duration: 1.5 }}>
              <rect x="42" y="14" width="18" height="18" rx="2" />
              {/* Ear */}
              <rect x="44" y="16" width="6" height="10" fill="#d97706" />
              {/* Snout */}
              <rect x="54" y="22" width="10" height="8" fill="#fef3c7" rx="1" />
              {/* Nose */}
              <rect x="60" y="22" width="4" height="4" fill="#1e1e1e" />
              {/* Eye */}
              <rect x="52" y="18" width="4" height="4" fill="#1e1e1e" />
            </motion.g>
          </g>
        </motion.svg>
      </motion.div>

      {/* Status indicator */}
      {isThinking && (
        <div className="absolute -top-4 right-0 flex gap-1 bg-white p-1 rounded-full border border-slate-200">
          <motion.div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} />
          <motion.div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.3 }} />
          <motion.div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.6 }} />
        </div>
      )}
    </motion.div>
  );
}
