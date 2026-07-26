import { StatusBadge } from "@/presentation/components/shared/status-badge";
import { RelativeTime } from "@/presentation/components/shared/relative-time";
import { Skeleton } from "@/presentation/components/shared/skeleton";
import { EmptyState } from "@/presentation/components/shared/empty-state";
import { DEPLOYMENT_STATUS_META } from "@/domain/constants";
import type { ActivityItem } from "@/domain/types";

interface ActivityFeedProps {
  items: ActivityItem[] | undefined;
  isLoading: boolean;
}

const activityIcons: Record<string, string> = {
  deployment_started: "↑",
  deployment_succeeded: "✓",
  deployment_failed: "✗",
  release_created: "+",
  release_deployed: "→",
  rollback: "↩",
};

export function ActivityFeed({ items, isLoading }: ActivityFeedProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <EmptyState
        icon={<ActivityIcon />}
        title="No recent activity"
        description="Deployment activity will appear here as it happens."
      />
    );
  }

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const meta = DEPLOYMENT_STATUS_META[item.status as keyof typeof DEPLOYMENT_STATUS_META] ?? { label: item.status, color: "secondary" };
        return (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {activityIcons[item.type] ?? "•"}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{item.projectName}</span>
                <span className="font-mono text-xs text-muted-foreground">{item.releaseVersion}</span>
                <span className="text-xs text-muted-foreground">→</span>
                <span className="text-xs text-muted-foreground">{item.environmentName}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                <span>{item.userName}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge label={meta.label} color={meta.color} />
              <RelativeTime timestamp={item.timestamp} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ActivityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
