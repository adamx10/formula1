import { useFetch } from '../hooks/useFetch';
import { getTeamColors } from '../utils/teamColors';
import { flagEmoji } from '../utils/formatters';
import { Skeleton, ErrorBanner } from './Skeleton';
import type { DriverStandingsResponse } from '../types/f1';

const URL = 'https://api.jolpica.com/ergast/f1/current/driverStandings.json';

export function DriverStandings() {
  const state = useFetch<DriverStandingsResponse>(URL);

  if (state.status === 'loading') return <Skeleton rows={10} />;
  if (state.status === 'error') return <ErrorBanner message={state.message} />;

  const standings =
    state.data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? [];

  const maxPoints = Number(standings[0]?.points ?? 1);

  return (
    <div className="space-y-2">
      {standings.map((s, i) => {
        const constructorId = s.Constructors[0]?.constructorId ?? '';
        const { primary } = getTeamColors(constructorId);
        const pct = (Number(s.points) / maxPoints) * 100;
        const isTop3 = i < 3;

        return (
          <div
            key={s.Driver.driverId}
            className={[
              'group relative overflow-hidden rounded-xl border transition-all duration-300',
              'hover:-translate-y-0.5 hover:shadow-lg',
              isTop3 ? 'border-white/15 bg-white/8' : 'border-white/8 bg-white/4',
            ].join(' ')}
            style={
              isTop3
                ? { boxShadow: `0 0 24px 0 ${primary}22` }
                : undefined
            }
          >
            {/* team accent bar */}
            <div
              className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
              style={{ background: primary }}
            />

            <div className="flex items-center gap-4 px-5 py-3 pl-6">
              {/* position */}
              <span
                className={[
                  'w-7 shrink-0 text-center text-lg font-black tabular-nums',
                  i === 0
                    ? 'text-yellow-400'
                    : i === 1
                    ? 'text-slate-300'
                    : i === 2
                    ? 'text-amber-600'
                    : 'text-white/40',
                ].join(' ')}
              >
                {s.position}
              </span>

              {/* driver */}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-white/40">
                    {flagEmoji(s.Driver.nationality)}
                  </span>
                  <span className="truncate font-semibold text-white">
                    {s.Driver.givenName}{' '}
                    <span className="font-black">{s.Driver.familyName}</span>
                  </span>
                  <span
                    className="hidden shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider sm:block"
                    style={{ background: `${primary}33`, color: primary }}
                  >
                    {s.Driver.code}
                  </span>
                </div>
                <div className="mt-1 text-xs text-white/30">
                  {s.Constructors[0]?.name}
                </div>
              </div>

              {/* points + bar */}
              <div className="hidden w-40 flex-col gap-1.5 sm:flex">
                <div
                  className="h-1.5 rounded-full"
                  style={{ background: `${primary}22` }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: primary }}
                  />
                </div>
              </div>

              <span className="w-16 shrink-0 text-right text-base font-black tabular-nums text-white">
                {s.points}
                <span className="text-xs font-normal text-white/40"> pts</span>
              </span>

              <span className="hidden w-12 shrink-0 text-right text-xs text-white/40 sm:block">
                {s.wins} W
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
