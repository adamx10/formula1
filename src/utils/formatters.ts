export function formatRaceDate(dateStr: string, timeStr?: string): string {
  const date = timeStr
    ? new Date(`${dateStr}T${timeStr}`)
    : new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatCountdown(ms: number): { days: number; hours: number; minutes: number; seconds: number } {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function ordinal(n: number | string): string {
  const num = Number(n);
  const s = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return num + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function flagEmoji(nationality: string): string {
  const map: Record<string, string> = {
    British: '🇬🇧', Dutch: '🇳🇱', Monégasque: '🇲🇨', Spanish: '🇪🇸',
    Mexican: '🇲🇽', Australian: '🇦🇺', Canadian: '🇨🇦', German: '🇩🇪',
    Finnish: '🇫🇮', French: '🇫🇷', Danish: '🇩🇰', Chinese: '🇨🇳',
    Thai: '🇹🇭', Japanese: '🇯🇵', American: '🇺🇸', Italian: '🇮🇹',
    Argentine: '🇦🇷', Brazilian: '🇧🇷', Polish: '🇵🇱', Swiss: '🇨🇭',
    'New Zealander': '🇳🇿', Austrian: '🇦🇹', Belgian: '🇧🇪',
  };
  return map[nationality] ?? '🏁';
}
