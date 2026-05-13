import { useRef } from 'react';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import { CALENDAR_2026, isRacePast, getNextRace } from '../data/calendar2026.ts';
import { useCountdown, pad2 } from '../hooks/useCountdown';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Badge } from '../components/ui/Badge';

function RaceRow({ race, isNext }: { race: (typeof CALENDAR_2026)[0]; isNext: boolean }) {
  const past = isRacePast(race);
  const d = new Date(race.date);
  const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  return (
    <div className={`anim-card flex items-center gap-4 rounded-sm border px-4 py-3.5 transition-all
      ${isNext ? 'border-blue-500/40 bg-blue-500/5' : past ? 'border-carbon-500/50 bg-carbon-800/40 opacity-50' : 'border-carbon-500 bg-carbon-800 hover:border-carbon-400'}`}>
      <span className="num text-xs font-bold text-carbon-300 w-6 text-center shrink-0">R{race.round}</span>
      <span className="text-xl shrink-0">{race.flag}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-sm font-semibold ${past ? 'text-carbon-100' : 'text-white'}`}>
            {race.shortName} GP
          </span>
          {isNext && <Badge variant="blue">Next</Badge>}
          {race.hasSprint && <Badge variant="outline">Sprint</Badge>}
          {past && <Badge variant="muted">Done</Badge>}
        </div>
        <p className="text-xs text-carbon-200 truncate">{race.circuit}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="num text-sm font-semibold text-carbon-100">{dateStr}</p>
        <p className="text-[10px] text-carbon-300">{race.locality}</p>
      </div>
    </div>
  );
}

function NextRaceCountdown() {
  const next = getNextRace();
  const { days, hours, minutes, seconds } = useCountdown(next?.date);
  if (!next) return null;

  return (
    <div className="mb-6 rounded-sm border border-blue-500/30 bg-carbon-800 p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 mb-1">
        <span className="pulse-dot inline-block mr-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
        Countdown · Round {next.round}
      </p>
      <h2 className="font-display text-2xl font-black uppercase text-white mb-3">{next.name}</h2>
      <div className="flex gap-2">
        {[['Days', days], ['Hrs', hours], ['Min', minutes], ['Sec', seconds]].map(([l, v]) => (
          <div key={l as string} className="flex flex-col items-center border border-carbon-500 bg-carbon-900 rounded-sm px-3 py-2 min-w-14">
            <span className="num text-2xl font-bold text-white">{pad2(v as number)}</span>
            <span className="text-[9px] uppercase tracking-wider text-carbon-200">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SchedulePage() {
  const ref = useRef<HTMLDivElement>(null);
  const nextRace = getNextRace();
  const pastCount = CALENDAR_2026.filter(isRacePast).length;

  useGSAP(() => {
    gsap.fromTo('.anim-card', { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.4, ease: 'power2.out' });
  }, { scope: ref });

  return (
    <div ref={ref}>
      <SectionHeader
        label="2026 Season"
        title="Race Calendar"
        subtitle={`${pastCount} completed · ${24 - pastCount} remaining`}
      />
      <NextRaceCountdown />
      <div className="space-y-1.5">
        {CALENDAR_2026.map((race) => (
          <RaceRow key={race.round} race={race} isNext={race.round === nextRace?.round} />
        ))}
      </div>
    </div>
  );
}
