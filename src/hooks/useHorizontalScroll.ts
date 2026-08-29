import { useEffect, useRef, useState } from 'react';

export function useHorizontalScroll() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent default vertical scrolling
      e.preventDefault();
      
      // Map vertical scroll to horizontal scroll
      container.scrollLeft += e.deltaY;

      // Calculate progress
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? container.scrollLeft / maxScroll : 0;
      setScrollProgress(progress);
    };

    // Use passive: false so we can preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return { scrollContainerRef, scrollProgress };
}
