type BadgeVariant = 'blue' | 'yellow' | 'green' | 'muted' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANTS: Record<BadgeVariant, string> = {
  blue:    'bg-blue-500/15 text-blue-400 border-blue-500/30',
  yellow:  'bg-yellow-400/15 text-yellow-400 border-yellow-400/30',
  green:   'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  muted:   'bg-carbon-500 text-carbon-100 border-carbon-400',
  outline: 'bg-transparent text-white/50 border-carbon-400',
};

export function Badge({ children, variant = 'muted', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${VARIANTS[variant]} ${className}`}>
      {children}
    </span>
  );
}
