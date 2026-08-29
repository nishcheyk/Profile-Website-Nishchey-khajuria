import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useHorizontalScroll } from '../../../hooks/useHorizontalScroll';

interface HorizontalScrollerProps {
  children: React.ReactNode;
}

export function HorizontalScroller({ children }: HorizontalScrollerProps) {
  const { scrollContainerRef, scrollProgress } = useHorizontalScroll();

  return (
    <div className="relative w-full h-full overflow-hidden bg-stone-100">
      
      {/* Background grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Progress Indicator */}
      <div className="absolute bottom-12 left-12 z-50 flex items-center gap-4 mix-blend-difference text-white">
        <span className="font-mono text-xs tracking-widest uppercase">Progress</span>
        <div className="w-32 h-[1px] bg-white/30 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <span className="font-mono text-xs tracking-widest">{(scrollProgress * 100).toFixed(0)}%</span>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="w-full h-full overflow-x-auto overflow-y-hidden flex hide-scrollbar snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex h-full min-w-max">
          {children}
        </div>
      </div>
    </div>
  );
}
