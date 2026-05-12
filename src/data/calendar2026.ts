export interface Race {
  round: number;
  name: string;
  shortName: string;
  country: string;
  flag: string;
  circuit: string;
  locality: string;
  date: string; // ISO YYYY-MM-DD
  time?: string; // UTC
  hasSprint?: boolean;
}

export const CALENDAR_2026: Race[] = [
  { round: 1, name: 'Australian Grand Prix', shortName: 'Australia', country: 'Australia', flag: '🇦🇺', circuit: 'Albert Park Circuit', locality: 'Melbourne', date: '2026-03-22' },
  { round: 2, name: 'Chinese Grand Prix', shortName: 'China', country: 'China', flag: '🇨🇳', circuit: 'Shanghai International Circuit', locality: 'Shanghai', date: '2026-04-05', hasSprint: true },
  { round: 3, name: 'Japanese Grand Prix', shortName: 'Japan', country: 'Japan', flag: '🇯🇵', circuit: 'Suzuka Circuit', locality: 'Suzuka', date: '2026-04-12' },
  { round: 4, name: 'Bahrain Grand Prix', shortName: 'Bahrain', country: 'Bahrain', flag: '🇧🇭', circuit: 'Bahrain International Circuit', locality: 'Sakhir', date: '2026-04-26' },
  { round: 5, name: 'Saudi Arabian Grand Prix', shortName: 'Saudi Arabia', country: 'Saudi Arabia', flag: '🇸🇦', circuit: 'Jeddah Corniche Circuit', locality: 'Jeddah', date: '2026-05-03' },
  { round: 6, name: 'Miami Grand Prix', shortName: 'Miami', country: 'USA', flag: '🇺🇸', circuit: 'Miami International Autodrome', locality: 'Miami', date: '2026-05-10', hasSprint: true },
  { round: 7, name: 'Emilia Romagna Grand Prix', shortName: 'Imola', country: 'Italy', flag: '🇮🇹', circuit: 'Autodromo Enzo e Dino Ferrari', locality: 'Imola', date: '2026-05-24' },
  { round: 8, name: 'Monaco Grand Prix', shortName: 'Monaco', country: 'Monaco', flag: '🇲🇨', circuit: 'Circuit de Monaco', locality: 'Monte Carlo', date: '2026-05-31' },
  { round: 9, name: 'Spanish Grand Prix', shortName: 'Spain', country: 'Spain', flag: '🇪🇸', circuit: 'Circuit de Barcelona-Catalunya', locality: 'Barcelona', date: '2026-06-07' },
  { round: 10, name: 'Canadian Grand Prix', shortName: 'Canada', country: 'Canada', flag: '🇨🇦', circuit: 'Circuit Gilles Villeneuve', locality: 'Montreal', date: '2026-06-14' },
  { round: 11, name: 'Austrian Grand Prix', shortName: 'Austria', country: 'Austria', flag: '🇦🇹', circuit: 'Red Bull Ring', locality: 'Spielberg', date: '2026-06-28', hasSprint: true },
  { round: 12, name: 'British Grand Prix', shortName: 'Britain', country: 'UK', flag: '🇬🇧', circuit: 'Silverstone Circuit', locality: 'Silverstone', date: '2026-07-05' },
  { round: 13, name: 'Belgian Grand Prix', shortName: 'Belgium', country: 'Belgium', flag: '🇧🇪', circuit: 'Circuit de Spa-Francorchamps', locality: 'Spa', date: '2026-07-26' },
  { round: 14, name: 'Hungarian Grand Prix', shortName: 'Hungary', country: 'Hungary', flag: '🇭🇺', circuit: 'Hungaroring', locality: 'Budapest', date: '2026-08-02' },
  { round: 15, name: 'Dutch Grand Prix', shortName: 'Netherlands', country: 'Netherlands', flag: '🇳🇱', circuit: 'Circuit Zandvoort', locality: 'Zandvoort', date: '2026-08-30' },
  { round: 16, name: 'Italian Grand Prix', shortName: 'Italy', country: 'Italy', flag: '🇮🇹', circuit: 'Autodromo Nazionale Monza', locality: 'Monza', date: '2026-09-06' },
  { round: 17, name: 'Azerbaijan Grand Prix', shortName: 'Azerbaijan', country: 'Azerbaijan', flag: '🇦🇿', circuit: 'Baku City Circuit', locality: 'Baku', date: '2026-09-20' },
  { round: 18, name: 'Singapore Grand Prix', shortName: 'Singapore', country: 'Singapore', flag: '🇸🇬', circuit: 'Marina Bay Street Circuit', locality: 'Singapore', date: '2026-10-04' },
  { round: 19, name: 'United States Grand Prix', shortName: 'USA', country: 'USA', flag: '🇺🇸', circuit: 'Circuit of the Americas', locality: 'Austin', date: '2026-10-18', hasSprint: true },
  { round: 20, name: 'Mexico City Grand Prix', shortName: 'Mexico', country: 'Mexico', flag: '🇲🇽', circuit: 'Autodromo Hermanos Rodriguez', locality: 'Mexico City', date: '2026-10-25' },
  { round: 21, name: 'São Paulo Grand Prix', shortName: 'Brazil', country: 'Brazil', flag: '🇧🇷', circuit: 'Autodromo Jose Carlos Pace', locality: 'São Paulo', date: '2026-11-08', hasSprint: true },
  { round: 22, name: 'Las Vegas Grand Prix', shortName: 'Las Vegas', country: 'USA', flag: '🇺🇸', circuit: 'Las Vegas Strip Circuit', locality: 'Las Vegas', date: '2026-11-21' },
  { round: 23, name: 'Qatar Grand Prix', shortName: 'Qatar', country: 'Qatar', flag: '🇶🇦', circuit: 'Lusail International Circuit', locality: 'Lusail', date: '2026-11-29', hasSprint: true },
  { round: 24, name: 'Abu Dhabi Grand Prix', shortName: 'Abu Dhabi', country: 'UAE', flag: '🇦🇪', circuit: 'Yas Marina Circuit', locality: 'Abu Dhabi', date: '2026-12-06' },
];

export function getNextRace(): Race | undefined {
  const today = new Date();
  return CALENDAR_2026.find((r) => new Date(r.date) >= today);
}

export function getLastRace(): Race | undefined {
  const today = new Date();
  const past = CALENDAR_2026.filter((r) => new Date(r.date) < today);
  return past[past.length - 1];
}

export function isRacePast(race: Race): boolean {
  return new Date(race.date) < new Date();
}
