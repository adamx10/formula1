import { useState, useEffect, useCallback } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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

    // Update every second
    const timer = setInterval(() => {
      const nextDelta = calculateDelta();
      setCountdown((prev) => {
        // Only update state if values have actually changed (prevents re-renders if called too fast)
        if (
          prev.days === nextDelta.days &&
          prev.hours === nextDelta.hours &&
          prev.minutes === nextDelta.minutes &&
          prev.seconds === nextDelta.seconds
        ) {
          return prev;
        }
        return nextDelta;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, calculateDelta]);

  return countdown;
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
