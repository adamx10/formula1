import { DriverStandings } from './DriverStandings';
import { ConstructorStandings } from './ConstructorStandings';
import { useState } from 'react';

type SubTab = 'Drivers' | 'Constructors';

export function Standings() {
  const [sub, setSub] = useState<SubTab>('Drivers');

  return (
    <div>
      {/* sub-tab toggle */}
      <div className="mb-5 flex gap-1 rounded-xl bg-white/5 p-1 w-fit">
        {(['Drivers', 'Constructors'] as SubTab[]).map((t) => (
          <button
            key={t}
            id={`sub-tab-${t.toLowerCase()}`}
            onClick={() => setSub(t)}
            className={[
              'rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-200',
              sub === t
                ? 'bg-white/15 text-white shadow'
                : 'text-white/40 hover:text-white/70',
            ].join(' ')}
          >
            {t}
          </button>
        ))}
      </div>

      {sub === 'Drivers' ? <DriverStandings /> : <ConstructorStandings />}
    </div>
  );
}
