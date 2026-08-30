import { useState, useEffect, useRef } from 'react';

export const useGameLoop = (speed = 5) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState<'UP'|'DOWN'|'LEFT'|'RIGHT'>('DOWN');
  const [isMoving, setIsMoving] = useState(false);
  
  const keys = useRef<{ [key: string]: boolean }>({});
  const joystickRef = useRef({ dx: 0, dy: 0 });
  const posRef = useRef({ x: 0, y: 0 });

  const setJoystickInput = (dx: number, dy: number) => {
    joystickRef.current = { dx, dy };
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId: number;

    const gameLoop = () => {
      const loopSpeed = speed;
      let rawDx = joystickRef.current.dx * loopSpeed;
      let rawDy = joystickRef.current.dy * loopSpeed;
      
      if (keys.current['w'] || keys.current['arrowup']) rawDy -= loopSpeed;
      if (keys.current['s'] || keys.current['arrowdown']) rawDy += loopSpeed;
      if (keys.current['a'] || keys.current['arrowleft']) rawDx -= loopSpeed;
      if (keys.current['d'] || keys.current['arrowright']) rawDx += loopSpeed;

      if (Math.abs(rawDx) > Math.abs(rawDy)) {
        setDirection(rawDx > 0 ? 'RIGHT' : 'LEFT');
      } else if (Math.abs(rawDy) > Math.abs(rawDx)) {
        setDirection(rawDy > 0 ? 'DOWN' : 'UP');
      }

      if (rawDx !== 0 || rawDy !== 0) {
        // Normalise diagonal speed for input
        if (rawDx !== 0 && rawDy !== 0) {
          rawDx *= 0.7071;
          rawDy *= 0.7071;
        }

        // Remap to isometric coordinates
        // For a rotateZ(-45deg) map:
        // Screen Right (+dx) -> Map (+x, -y)
        // Screen Down (+dy) -> Map (+x, +y)
        const dx = rawDx + rawDy;
        const dy = -rawDx + rawDy;
        
        posRef.current = {
          x: posRef.current.x + dx,
          y: posRef.current.y + dy
        };
        
        // Boundaries (assuming a 2000x2000 map, starting at 0,0 center)
        const MAP_SIZE = 1000;
        posRef.current.x = Math.max(-MAP_SIZE, Math.min(MAP_SIZE, posRef.current.x));
        posRef.current.y = Math.max(-MAP_SIZE, Math.min(MAP_SIZE, posRef.current.y));

        setPos({ ...posRef.current });
        setIsMoving(true);
      } else {
        setIsMoving(false);
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return { pos, direction, isMoving, setJoystickInput };
};
