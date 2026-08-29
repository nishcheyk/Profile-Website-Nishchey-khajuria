import { useState, useEffect } from 'react';

function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export function useTime(intervalMs = 10000) {
  const [time, setTime] = useState(getTime);
  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return time;
}
