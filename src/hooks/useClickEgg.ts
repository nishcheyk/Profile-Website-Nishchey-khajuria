import { useState, useRef, useCallback } from 'react';

export function useClickEgg(threshold: number, resetMs = 1500, showMs = 3000) {
  const [triggered, setTriggered] = useState(false);
  const countRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    countRef.current += 1;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { countRef.current = 0; }, resetMs);
    if (countRef.current >= threshold) {
      countRef.current = 0;
      setTriggered(true);
      setTimeout(() => setTriggered(false), showMs);
    }
  }, [threshold, resetMs, showMs]);

  return { triggered, handleClick };
}
