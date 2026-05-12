import { useState, useEffect } from 'react';

export interface Countdown { days: number; hours: number; minutes: number; seconds: number; }

export function useCountdown(targetDate: string | undefined): Countdown {
  const calc = (): Countdown => {
    if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
    const s = Math.floor(diff / 1000);
    return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
  };

  const [cd, setCd] = useState<Countdown>(calc);

  useEffect(() => {
    if (!targetDate) return;
    const id = setInterval(() => setCd(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return cd;
}

export function pad2(n: number): string { return String(n).padStart(2, '0'); }
