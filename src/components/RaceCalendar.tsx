import { useRef } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useCountdown } from '../hooks/useCountdown';
import { formatRaceDate, pad2, flagEmoji } from '../utils/formatters';
import { Skeleton, ErrorBanner } from './Skeleton';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import type { RaceScheduleResponse, Race } from '../types/f1';

const URL = 'https://api.jolpica.com/ergast/f1/current.json';

function NextRaceCountdown({ race }: { race: Race }) {
  const raceDateTime = race.time
    ? `${race.date}T${race.time}`
    : `${race.date}T12:00:00Z`;

  const { days, hours, minutes, seconds } = useCountdown(raceDateTime);

  return (
    <div className="anim-card mb-8 overflow-hidden rounded-sm border border-blue-500/30  from-blue-500/10 via-carbon-800 to-transparent p-6 blue-glow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">
          Next Round
        </span>
      </div>
      <div className="mb-4">
        <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight">{race.raceName}</h2>
        <p className="text-sm text-carbon-200 mt-1">
          {flagEmoji(race.Circuit.Location.country)}{' '}
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
            className="flex flex-col items-center rounded-sm border border-carbon-500 bg-carbon-900 px-4 py-2"
          >
            <span className="num text-2xl font-bold tabular-nums text-white">
              {pad2(value)}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-carbon-400 font-bold">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RaceCalendar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const state = useFetch<RaceScheduleResponse>(URL);

  useGSAP(() => {
    if (state.status === 'success') {
      gsap.fromTo('.calendar-row',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: 'power2.out' }
      );
    }
  }, { scope: containerRef, dependencies: [state.status] });

  if (state.status === 'loading') return <Skeleton rows={12} />;
  if (state.status === 'error') return <ErrorBanner message={state.message} />;

  const races = state.data.MRData.RaceTable.Races;
  const today = new Date();
  const nextRace = races.find((r) => new Date(r.date) >= today);

  return (
    <div ref={containerRef} className="pb-12">
      {nextRace && <NextRaceCountdown race={nextRace} />}

      <div className="space-y-1.5">
        {races.map((race) => {
          const isPast = new Date(race.date) < today;
          const isNext = race.round === nextRace?.round;

          return (
            <div
              key={race.round}
              className={[
                'calendar-row flex items-center gap-4 rounded-sm border px-4 py-3.5 transition-all duration-300 will-change-transform',
                isNext
                  ? 'border-blue-500/40 bg-blue-500/5 shadow-lg shadow-blue-500/5'
                  : isPast
                  ? 'border-carbon-500/50 bg-carbon-800/40 opacity-40'
                  : 'border-carbon-500 bg-carbon-900/50 hover:border-carbon-400 hover:bg-carbon-800',
              ].join(' ')}
            >
              <span className="w-8 shrink-0 text-center num text-xs font-bold text-carbon-400">
                R{race.round}
              </span>

              <span className="text-xl shrink-0">
                {flagEmoji(race.Circuit.Location.country)}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      'truncate text-sm font-bold tracking-wide uppercase',
                      isPast ? 'text-carbon-300' : 'text-white',
                    ].join(' ')}
                  >
                    {race.raceName.replace(' Grand Prix', ' GP')}
                  </span>
                  {isNext && (
                    <span className="shrink-0 rounded-full bg-blue-500 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-white">
                      Next
                    </span>
                  )}
                  {race.Sprint && !isPast && (
                    <span className="shrink-0 rounded-full border border-purple-500/50 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-purple-400">
                      Sprint
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-carbon-400 font-medium truncate uppercase tracking-wider">
                  {race.Circuit.circuitName}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="num text-xs font-bold text-carbon-200">
                  {formatRaceDate(race.date)}
                </p>
                <p className="text-[9px] text-carbon-400 uppercase font-bold tracking-tighter">
                  {race.Circuit.Location.locality}
                </p>
              </div>

              <div
                className={[
                  'h-1.5 w-1.5 shrink-0 rounded-full',
                  isPast ? 'bg-carbon-600' : isNext ? 'bg-blue-500 shadow-[0_0_8px_#0077ff]' : 'bg-carbon-500',
                ].join(' ')}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
