export interface Driver {
  id: string;
  number: number;
  code: string;
  firstName: string;
  lastName: string;
  nationality: string;
  flag: string;
  teamId: string;
  isChampion?: boolean;
  dob: string;
  standing?: number;
  points?: number;
  wins?: number;
  podiums?: number;
}

export const DRIVERS: Driver[] = [
  // McLaren
  {
    id: 'norris', number: 4, code: 'NOR', firstName: 'Lando', lastName: 'Norris',
    nationality: 'British', flag: '🇬🇧', teamId: 'mclaren', isChampion: true,
    dob: '1999-11-13', standing: 1, points: 150, wins: 3, podiums: 6,
  },
  {
    id: 'piastri', number: 81, code: 'PIA', firstName: 'Oscar', lastName: 'Piastri',
    nationality: 'Australian', flag: '🇦🇺', teamId: 'mclaren',
    dob: '2001-04-06', standing: 3, points: 115, wins: 1, podiums: 4,
  },
  // Ferrari
  {
    id: 'leclerc', number: 16, code: 'LEC', firstName: 'Charles', lastName: 'Leclerc',
    nationality: 'Monégasque', flag: '🇲🇨', teamId: 'ferrari',
    dob: '1997-10-16', standing: 4, points: 98, wins: 1, podiums: 3,
  },
  {
    id: 'hamilton', number: 44, code: 'HAM', firstName: 'Lewis', lastName: 'Hamilton',
    nationality: 'British', flag: '🇬🇧', teamId: 'ferrari',
    dob: '1985-01-07', standing: 5, points: 87, wins: 0, podiums: 2,
  },
  // Red Bull
  {
    id: 'verstappen', number: 1, code: 'VER', firstName: 'Max', lastName: 'Verstappen',
    nationality: 'Dutch', flag: '🇳🇱', teamId: 'red_bull',
    dob: '1997-09-30', standing: 2, points: 129, wins: 1, podiums: 5,
  },
  {
    id: 'lawson', number: 30, code: 'LAW', firstName: 'Liam', lastName: 'Lawson',
    nationality: 'New Zealander', flag: '🇳🇿', teamId: 'red_bull',
    dob: '2002-02-11', standing: 9, points: 36, wins: 0, podiums: 0,
  },
  // Mercedes
  {
    id: 'russell', number: 63, code: 'RUS', firstName: 'George', lastName: 'Russell',
    nationality: 'British', flag: '🇬🇧', teamId: 'mercedes',
    dob: '1998-02-15', standing: 6, points: 79, wins: 0, podiums: 2,
  },
  {
    id: 'antonelli', number: 12, code: 'ANT', firstName: 'Kimi', lastName: 'Antonelli',
    nationality: 'Italian', flag: '🇮🇹', teamId: 'mercedes',
    dob: '2006-08-25', standing: 8, points: 42, wins: 0, podiums: 1,
  },
  // Aston Martin
  {
    id: 'alonso', number: 14, code: 'ALO', firstName: 'Fernando', lastName: 'Alonso',
    nationality: 'Spanish', flag: '🇪🇸', teamId: 'aston_martin',
    dob: '1981-07-29', standing: 7, points: 55, wins: 0, podiums: 1,
  },
  {
    id: 'stroll', number: 18, code: 'STR', firstName: 'Lance', lastName: 'Stroll',
    nationality: 'Canadian', flag: '🇨🇦', teamId: 'aston_martin',
    dob: '1998-10-29', standing: 12, points: 12, wins: 0, podiums: 0,
  },
  // Williams
  {
    id: 'sainz', number: 55, code: 'SAI', firstName: 'Carlos', lastName: 'Sainz',
    nationality: 'Spanish', flag: '🇪🇸', teamId: 'williams',
    dob: '1994-09-01', standing: 10, points: 34, wins: 0, podiums: 1,
  },
  {
    id: 'albon', number: 23, code: 'ALB', firstName: 'Alexander', lastName: 'Albon',
    nationality: 'Thai', flag: '🇹🇭', teamId: 'williams',
    dob: '1996-03-23', standing: 14, points: 24, wins: 0, podiums: 0,
  },
  // Alpine
  {
    id: 'gasly', number: 10, code: 'GAS', firstName: 'Pierre', lastName: 'Gasly',
    nationality: 'French', flag: '🇫🇷', teamId: 'alpine',
    dob: '1996-02-07', standing: 11, points: 23, wins: 0, podiums: 0,
  },
  {
    id: 'doohan', number: 7, code: 'DOO', firstName: 'Jack', lastName: 'Doohan',
    nationality: 'Australian', flag: '🇦🇺', teamId: 'alpine',
    dob: '2003-01-20', standing: 17, points: 12, wins: 0, podiums: 0,
  },
  // RB
  {
    id: 'tsunoda', number: 22, code: 'TSU', firstName: 'Yuki', lastName: 'Tsunoda',
    nationality: 'Japanese', flag: '🇯🇵', teamId: 'rb',
    dob: '2000-05-11', standing: 13, points: 14, wins: 0, podiums: 0,
  },
  {
    id: 'hadjar', number: 6, code: 'HAD', firstName: 'Isack', lastName: 'Hadjar',
    nationality: 'French', flag: '🇫🇷', teamId: 'rb',
    dob: '2004-09-28', standing: 16, points: 8, wins: 0, podiums: 0,
  },
  // Haas
  {
    id: 'ocon', number: 31, code: 'OCO', firstName: 'Esteban', lastName: 'Ocon',
    nationality: 'French', flag: '🇫🇷', teamId: 'haas',
    dob: '1996-09-17', standing: 15, points: 12, wins: 0, podiums: 0,
  },
  {
    id: 'bearman', number: 87, code: 'BEA', firstName: 'Oliver', lastName: 'Bearman',
    nationality: 'British', flag: '🇬🇧', teamId: 'haas',
    dob: '2005-05-08', standing: 19, points: 6, wins: 0, podiums: 0,
  },
  // Audi/Sauber
  {
    id: 'hulkenberg', number: 27, code: 'HUL', firstName: 'Nico', lastName: 'Hülkenberg',
    nationality: 'German', flag: '🇩🇪', teamId: 'sauber',
    dob: '1987-08-19', standing: 18, points: 6, wins: 0, podiums: 0,
  },
  {
    id: 'bortoleto', number: 5, code: 'BOR', firstName: 'Gabriel', lastName: 'Bortoleto',
    nationality: 'Brazilian', flag: '🇧🇷', teamId: 'sauber',
    dob: '2004-10-14', standing: 20, points: 2, wins: 0, podiums: 0,
  },
  // Cadillac
  {
    id: 'herta', number: 2, code: 'HER', firstName: 'Colton', lastName: 'Herta',
    nationality: 'American', flag: '🇺🇸', teamId: 'cadillac',
    dob: '2000-03-30', standing: 21, points: 3, wins: 0, podiums: 0,
  },
  {
    id: 'armstrong', number: 72, code: 'ARM', firstName: 'Marcus', lastName: 'Armstrong',
    nationality: 'New Zealander', flag: '🇳🇿', teamId: 'cadillac',
    dob: '2000-12-21', standing: 22, points: 0, wins: 0, podiums: 0,
  },
];

export function getDriver(id: string): Driver | undefined {
  return DRIVERS.find((d) => d.id === id);
}

export function getTeamDrivers(teamId: string): Driver[] {
  return DRIVERS.filter((d) => d.teamId === teamId);
}
