import { useFetch } from '../hooks/useFetch';
import { getTeamColors } from '../utils/teamColors';
import { flagEmoji, formatRaceDate } from '../utils/formatters';
import { Skeleton, ErrorBanner } from './Skeleton';
import type { LastRaceResultsResponse, RaceResult } from '../types/f1';

const URL = 'https://api.jolpica.com/ergast/f1/current/last/results.json';

const TROPHY: Record<string, string> = { '1': '🥇', '2': '🥈', '3': '🥉' };

function PodiumCard({ result, highlight }: { result: RaceResult; highlight?: boolean }) {
  const id = result.Constructor.constructorId;
  const { primary } = getTeamColors(id);

  return (
    <div
      className={[
        'relative flex flex-col items-center rounded-2xl border p-4 text-center transition-all duration-300',
        highlight
          ? 'border-yellow-400/30 bg-yellow-400/5 shadow-xl shadow-yellow-400/10 scale-105'
          : 'border-white/10 bg-white/4',
      ].join(' ')}
      style={{ borderTopColor: primary, borderTopWidth: 2 }}
    >
      <div className="mb-1 text-3xl">{TROPHY[result.position] ?? result.position}</div>
      <div className="text-xs text-white/40">{flagEmoji(result.Driver.nationality)}</div>
      <div className="mt-1 font-black text-white leading-tight">
        {result.Driver.familyName}
      </div>
      <div className="text-xs text-white/40">{result.Constructor.name}</div>
      {result.Time && (
        <div
          className="mt-2 rounded-full px-2 py-0.5 text-xs font-mono font-semibold"
          style={{ background: `${primary}22`, color: primary }}
        >
          {result.Time.time}
        </div>
      )}
    </div>
  );
}

export function LastRace() {
  const state = useFetch<LastRaceResultsResponse>(URL);

  if (state.status === 'loading') return <Skeleton rows={12} />;
  if (state.status === 'error') return <ErrorBanner message={state.message} />;

  const race = state.data.MRData.RaceTable.Races[0];
  if (!race) return <ErrorBanner message="No race data found." />;

  const results = race.Results;
  const podium = results.slice(0, 3);
  const rest = results.slice(3);

  return (
    <div className="space-y-6">
      {/* Race header */}
      <div className="rounded-2xl border border-white/10 bg-white/4 px-5 py-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-white/40">
          Round {race.round} · {race.season}
        </div>
        <h2 className="mt-1 text-xl font-black text-white">{race.raceName}</h2>
        <p className="text-sm text-white/50">
          {race.Circuit.circuitName} · {formatRaceDate(race.date)}
        </p>
      </div>

      {/* Podium */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
          Podium
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {/* Reorder: 2nd, 1st, 3rd */}
          <PodiumCard result={podium[1]} />
          <PodiumCard result={podium[0]} highlight />
          <PodiumCard result={podium[2]} />
        </div>
      </div>

      {/* Full results */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
          Full Results
        </h3>
        <div className="space-y-1">
          {rest.map((r) => {
            const id = r.Constructor.constructorId;
            const { primary } = getTeamColors(id);
            const dnf = r.status !== 'Finished' && !r.status.startsWith('+');

            return (
              <div
                key={r.Driver.driverId}
                className="flex items-center gap-3 rounded-lg border border-white/6 bg-white/3 px-4 py-2.5 transition-colors hover:border-white/12"
              >
                <span className="w-5 shrink-0 text-center text-sm font-bold text-white/40">
                  {r.positionText === 'R' ? '–' : r.position}
                </span>
                <div
                  className="h-3 w-0.5 shrink-0 rounded-full"
                  style={{ background: primary }}
                />
                <span className="text-xs text-white/40">
                  {flagEmoji(r.Driver.nationality)}
                </span>
                <span className="flex-1 text-sm font-semibold text-white">
                  {r.Driver.givenName[0]}. {r.Driver.familyName}
                </span>
                <span className="hidden text-xs text-white/30 sm:block">
                  {r.Constructor.name}
                </span>
                <span
                  className={[
                    'shrink-0 text-xs font-mono',
                    dnf ? 'text-red-400' : 'text-white/50',
                  ].join(' ')}
                >
                  {dnf ? 'DNF' : r.Time?.time ?? r.status}
                </span>
                <span className="w-10 shrink-0 text-right text-xs font-bold text-white">
                  {r.points !== '0' ? `+${r.points}` : ''}
                </span>
                {r.FastestLap?.rank === '1' && (
                  <span title="Fastest Lap" className="text-xs text-purple-400">⚡</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
