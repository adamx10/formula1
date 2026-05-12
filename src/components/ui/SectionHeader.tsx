interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ label, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">{label}</p>
        <h2 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-carbon-100">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
