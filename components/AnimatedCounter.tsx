import React, { useEffect, useState, useRef } from 'react';

interface Props {
  value: number;
}

export const AnimatedCounter: React.FC<Props> = ({ value }) => {
  const [display, setDisplay] = useState(value);
  const startVal = useRef(value);
  const startTime = useRef<number | null>(null);
  const reqId = useRef<number | null>(null);

  useEffect(() => {
    // If value hasn't changed effectively, do nothing (initial render or same value)
    if (value === display && reqId.current === null) return;

    // Capture where we are starting from (current animated state)
    startVal.current = display;
    startTime.current = null;
    
    // Cancel any existing animation
    if (reqId.current) {
      cancelAnimationFrame(reqId.current);
    }

    const duration = 1200; // ms

    const animate = (time: number) => {
      if (!startTime.current) startTime.current = time;
      const progress = Math.min((time - startTime.current) / duration, 1);
      
      // EaseOutQuart function for smooth landing
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const current = Math.floor(startVal.current + (value - startVal.current) * ease);
      
      setDisplay(current);

      if (progress < 1) {
        reqId.current = requestAnimationFrame(animate);
      } else {
        reqId.current = null;
      }
    };
    
    reqId.current = requestAnimationFrame(animate);

    return () => {
      if (reqId.current) cancelAnimationFrame(reqId.current);
    };
  }, [value]);

  return <>{display.toLocaleString()}</>;
};
