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
      let dx = joystickRef.current.dx * loopSpeed;
      let dy = joystickRef.current.dy * loopSpeed;
      
      if (keys.current['w'] || keys.current['arrowup']) dy -= loopSpeed;
      if (keys.current['s'] || keys.current['arrowdown']) dy += loopSpeed;
      if (keys.current['a'] || keys.current['arrowleft']) dx -= loopSpeed;
      if (keys.current['d'] || keys.current['arrowright']) dx += loopSpeed;

      if (Math.abs(dx) > Math.abs(dy)) {
        setDirection(dx > 0 ? 'RIGHT' : 'LEFT');
      } else if (Math.abs(dy) > Math.abs(dx)) {
        setDirection(dy > 0 ? 'DOWN' : 'UP');
      }

      if (dx !== 0 || dy !== 0) {
        // Normalise diagonal speed
        if (dx !== 0 && dy !== 0) {
          dx *= 0.7071;
          dy *= 0.7071;
        }
        
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
