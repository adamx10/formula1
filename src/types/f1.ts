// ─── Driver Standings ─────────────────────────────────────────────────────────

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  };
  Constructors: Constructor[];
}

export interface DriverStandingsResponse {
  MRData: {
    StandingsTable: {
      StandingsLists: [
        {
          season: string;
          round: string;
          DriverStandings: DriverStanding[];
        }
      ];
    };
  };
}

// ─── Constructor Standings ─────────────────────────────────────────────────────

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

export interface ConstructorStandingsResponse {
  MRData: {
    StandingsTable: {
      StandingsLists: [
        {
          season: string;
          round: string;
          ConstructorStandings: ConstructorStanding[];
        }
      ];
    };
  };
}

// ─── Race Calendar ─────────────────────────────────────────────────────────────

export interface Circuit {
  circuitId: string;
  circuitName: string;
  Location: {
    locality: string;
    country: string;
  };
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time?: string;
  FirstPractice?: { date: string; time: string };
  Qualifying?: { date: string; time: string };
  Sprint?: { date: string; time: string };
}

export interface RaceScheduleResponse {
  MRData: {
    RaceTable: {
      season: string;
      Races: Race[];
    };
  };
}

// ─── Race Results ──────────────────────────────────────────────────────────────

export interface RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: DriverStanding['Driver'];
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time?: { millis: string; time: string };
  FastestLap?: {
    rank: string;
    lap: string;
    Time: { time: string };
    AverageSpeed: { units: string; speed: string };
  };
}

export interface LastRaceResultsResponse {
  MRData: {
    RaceTable: {
      season: string;
      Races: [
        Race & {
          Results: RaceResult[];
        }
      ];
    };
  };
}
