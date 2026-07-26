interface RelativeTimeProps {
  timestamp: string;
}

function getRelativeTime(timestamp: string): string {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

export function RelativeTime({ timestamp }: RelativeTimeProps) {
  return (
    <time dateTime={timestamp} className="text-xs text-muted-foreground whitespace-nowrap">
      {getRelativeTime(timestamp)}
    </time>
  );
}
