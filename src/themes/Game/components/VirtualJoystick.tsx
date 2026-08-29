import React from 'react';
import { motion, PanInfo } from 'framer-motion';

interface JoystickProps {
  onMove: (dx: number, dy: number) => void;
  onEnd: () => void;
}

export default function VirtualJoystick({ onMove, onEnd }: JoystickProps) {
  const handleDrag = (_: any, info: PanInfo) => {
    // Max drag radius is 40px
    const maxRadius = 40;
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    const scale = distance > maxRadius ? maxRadius / distance : 1;
    
    // Normalize to -1 to 1 range
    const dx = (info.offset.x * scale) / maxRadius;
    const dy = (info.offset.y * scale) / maxRadius;
    
    onMove(dx, dy);
  };

  return (
    <div className="fixed bottom-12 left-12 z-50 md:hidden">
      {/* Joystick Base */}
      <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        {/* The Stick */}
        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={() => {
            onEnd();
          }}
          className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-lg shadow-lg border border-white/60 flex items-center justify-center"
        >
          <div className="w-6 h-6 rounded-full bg-white/80" />
        </motion.div>
      </div>
    </div>
  );
}
