interface SkeletonProps { rows?: number; className?: string; height?: string; }

export function Skeleton({ rows = 1, className = '', height = 'h-12' }: SkeletonProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`${height} rounded-sm bg-carbon-600 animate-pulse`}
          style={{ animationDelay: `${i * 60}ms`, opacity: 1 - i * 0.08 }}
        />
      ))}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-blue-500/30 bg-blue-500/8 px-4 py-3 text-sm text-blue-400">
      <span className="text-lg">⚠</span>
      <span>{message}</span>
    </div>
  );
}
