import { useFetch } from '../hooks/useFetch';
import { getTeamColors } from '../utils/teamColors';
import { Skeleton, ErrorBanner } from './Skeleton';
import type { ConstructorStandingsResponse } from '../types/f1';

const URL = 'https://api.jolpica.com/ergast/f1/current/constructorStandings.json';

const TEAM_ICONS: Record<string, string> = {
  red_bull: '🐂', ferrari: '🐎', mercedes: '⭐', mclaren: '🟠',
  aston_martin: '💚', alpine: '🔵', williams: '🔷', rb: '🔴',
  kick_sauber: '🍀', haas: '⚪',
};

export function ConstructorStandings() {
  const state = useFetch<ConstructorStandingsResponse>(URL);

  if (state.status === 'loading') return <Skeleton rows={10} />;
  if (state.status === 'error') return <ErrorBanner message={state.message} />;

  const standings =
    state.data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings ?? [];

  const maxPoints = Number(standings[0]?.points ?? 1);

  return (
    <div className="space-y-2">
      {standings.map((s, i) => {
        const id = s.Constructor.constructorId;
        const { primary, secondary } = getTeamColors(id);
        const pct = (Number(s.points) / maxPoints) * 100;

        return (
          <div
            key={id}
            className="group relative overflow-hidden rounded-xl border border-white/8 bg-white/4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={i === 0 ? { boxShadow: `0 0 28px 0 ${primary}30` } : undefined}
          >
            {/* gradient stripe across top */}
            <div
              className="absolute inset-x-0 top-0 h-px opacity-60"
              style={{ background: `linear-gradient(90deg, ${primary}, ${secondary})` }}
            />

            <div className="flex items-center gap-4 px-5 py-3.5">
              {/* position */}
              <span
                className={[
                  'w-6 shrink-0 text-center text-lg font-black',
                  i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-600' : 'text-white/40',
                ].join(' ')}
              >
                {s.position}
              </span>

              {/* team badge */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg"
                style={{ background: `${primary}22`, border: `1px solid ${primary}44` }}
              >
                {TEAM_ICONS[id] ?? '🏎️'}
              </div>

              {/* name */}
              <div className="min-w-0 flex-1">
                <div className="font-bold text-white">{s.Constructor.name}</div>
                <div className="text-xs text-white/30">{s.Constructor.nationality}</div>
              </div>

              {/* bar */}
              <div className="hidden w-44 flex-col gap-1.5 sm:flex">
                <div className="h-1.5 rounded-full" style={{ background: `${primary}22` }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${primary}, ${secondary})` }}
                  />
                </div>
              </div>

              <span className="w-16 shrink-0 text-right text-base font-black tabular-nums text-white">
                {s.points}
                <span className="text-xs font-normal text-white/40"> pts</span>
              </span>

              <span className="hidden w-10 shrink-0 text-right text-xs text-white/40 sm:block">
                {s.wins} W
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
