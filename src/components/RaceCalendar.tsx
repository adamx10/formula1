import { useFetch } from '../hooks/useFetch';
import { useCountdown } from '../hooks/useCountdown';
import { formatRaceDate, pad2 } from '../utils/formatters';
import { Skeleton, ErrorBanner } from './Skeleton';
import type { RaceScheduleResponse, Race } from '../types/f1';

const URL = 'https://api.jolpica.com/ergast/f1/current.json';

const COUNTRY_FLAG: Record<string, string> = {
  Australia: '🇦🇺', Bahrain: '🇧🇭', 'Saudi Arabia': '🇸🇦', Japan: '🇯🇵',
  China: '🇨🇳', USA: '🇺🇸', 'United States': '🇺🇸', Italy: '🇮🇹',
  Monaco: '🇲🇨', Canada: '🇨🇦', Spain: '🇪🇸', Austria: '🇦🇹',
  'United Kingdom': '🇬🇧', Hungary: '🇭🇺', Belgium: '🇧🇪',
  Netherlands: '🇳🇱', Singapore: '🇸🇬', Azerbaijan: '🇦🇿',
  Mexico: '🇲🇽', Brazil: '🇧🇷', 'Abu Dhabi': '🇦🇪', Qatar: '🇶🇦',
  UAE: '🇦🇪',
};

function NextRaceCountdown({ race }: { race: Race }) {
  const raceDateTime = race.time
    ? `${race.date}T${race.time}`
    : `${race.date}T12:00:00Z`;

  const { days, hours, minutes, seconds } = useCountdown(raceDateTime);

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-[#e10600]/30 bg-gradient-to-br from-[#e10600]/10 via-[#1a0000]/60 to-transparent p-5">
      <div className="mb-1 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e10600] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e10600]" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-[#e10600]">
          Next Race
        </span>
      </div>
      <div className="mb-3">
        <h2 className="text-lg font-black text-white">{race.raceName}</h2>
        <p className="text-sm text-white/50">
          {COUNTRY_FLAG[race.Circuit.Location.country] ?? '🏁'}{' '}
          {race.Circuit.Location.locality}, {race.Circuit.Location.country} ·{' '}
          {formatRaceDate(race.date, race.time)}
        </p>
      </div>
      <div className="flex gap-3">
        {[
          { label: 'Days', value: days },
          { label: 'Hrs', value: hours },
          { label: 'Min', value: minutes },
          { label: 'Sec', value: seconds },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 min-w-[3.5rem]"
          >
            <span className="text-2xl font-black tabular-nums text-white">
              {pad2(value)}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RaceCalendar() {
  const state = useFetch<RaceScheduleResponse>(URL);

  if (state.status === 'loading') return <Skeleton rows={8} />;
  if (state.status === 'error') return <ErrorBanner message={state.message} />;

  const races = state.data.MRData.RaceTable.Races;
  const today = new Date();

  // Find the first upcoming race
  const nextRace = races.find((r) => new Date(r.date) >= today);

  return (
    <div>
      {nextRace && <NextRaceCountdown race={nextRace} />}

      <div className="space-y-1.5">
        {races.map((race) => {
          const isPast = new Date(race.date) < today;
          const isNext = race.round === nextRace?.round;

          return (
            <div
              key={race.round}
              className={[
                'flex items-center gap-4 rounded-xl border px-4 py-3 transition-all duration-200',
                isNext
                  ? 'border-[#e10600]/40 bg-[#e10600]/8 shadow-lg shadow-red-900/20'
                  : isPast
                  ? 'border-white/5 bg-white/2 opacity-40'
                  : 'border-white/8 bg-white/4 hover:border-white/15',
              ].join(' ')}
            >
              {/* round number */}
              <span className="w-6 shrink-0 text-center text-xs font-bold text-white/30">
                R{race.round}
              </span>

              {/* flag */}
              <span className="text-xl">
                {COUNTRY_FLAG[race.Circuit.Location.country] ?? '🏁'}
              </span>

              {/* name + circuit */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      'truncate text-sm font-semibold',
                      isPast ? 'text-white/50' : 'text-white',
                    ].join(' ')}
                  >
                    {race.raceName.replace(' Grand Prix', ' GP')}
                  </span>
                  {isNext && (
                    <span className="shrink-0 rounded bg-[#e10600] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                      Next
                    </span>
                  )}
                  {race.Sprint && !isPast && (
                    <span className="shrink-0 rounded bg-purple-600/70 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                      Sprint
                    </span>
                  )}
                </div>
                <div className="text-xs text-white/30">
                  {race.Circuit.circuitName}
                </div>
              </div>

              {/* date */}
              <span className="shrink-0 text-right text-xs text-white/40">
                {formatRaceDate(race.date)}
              </span>

              {/* status dot */}
              <span
                className={[
                  'h-2 w-2 shrink-0 rounded-full',
                  isPast ? 'bg-white/20' : isNext ? 'bg-[#e10600] shadow-sm shadow-red-500' : 'bg-white/10',
                ].join(' ')}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
