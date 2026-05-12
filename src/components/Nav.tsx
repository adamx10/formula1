const TABS = ['Standings', 'Calendar', 'Last Race'] as const;
export type Tab = (typeof TABS)[number];

interface NavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export function Nav({ active, onChange }: NavProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black tracking-tighter text-white">F1</span>
            <span className="rounded bg-[#e10600] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
              LIVE
            </span>
          </div>
          <span className="hidden text-xs text-white/40 sm:block">
            {new Date().getFullYear()} Season
          </span>
        </div>

        {/* Tabs */}
        <nav className="flex gap-1 rounded-xl bg-white/5 p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              id={`nav-${tab.toLowerCase().replace(/ /g, '-')}`}
              onClick={() => onChange(tab)}
              className={[
                'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200',
                active === tab
                  ? 'bg-[#e10600] text-white shadow-lg shadow-red-600/30'
                  : 'text-white/50 hover:text-white',
              ].join(' ')}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
