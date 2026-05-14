import { useState, useEffect, useCallback } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * A custom hook that calculates the time remaining until a target date.
 * Optimized to avoid redundant re-renders by comparing delta values.
 */
export function useCountdown(targetDate: string | undefined): Countdown {
  const calculateDelta = useCallback((): Countdown => {
    if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const diff = Math.max(0, target - now);
    
    const s = Math.floor(diff / 1000);
    return {
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60
    };
  }, [targetDate]);

  const [countdown, setCountdown] = useState<Countdown>(calculateDelta);

  useEffect(() => {
    if (!targetDate) return;

    // Use a precise interval to sync the countdown
    const timer = setInterval(() => {
      const next = calculateDelta();
      setCountdown((prev) => {
        const hasChanged = 
          prev.days !== next.days ||
          prev.hours !== next.hours ||
          prev.minutes !== next.minutes ||
          prev.seconds !== next.seconds;
        
        return hasChanged ? next : prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, calculateDelta]);

  return countdown;
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
