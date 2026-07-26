import { StatusBadge } from "@/presentation/components/shared/status-badge";
import { RelativeTime } from "@/presentation/components/shared/relative-time";
import { Skeleton } from "@/presentation/components/shared/skeleton";
import { EmptyState } from "@/presentation/components/shared/empty-state";
import { DEPLOYMENT_STATUS_META } from "@/domain/constants";
import type { Deployment } from "@/domain/types";

interface ActiveDeploymentsProps {
  deployments: (Deployment & { projectName: string; releaseVersion: string; environmentName: string })[] | undefined;
  isLoading: boolean;
}

export function ActiveDeployments({ deployments, isLoading }: ActiveDeploymentsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!deployments || deployments.length === 0) {
    return (
      <EmptyState
        icon={<RocketIcon />}
        title="No active deployments"
        description="All clear — there are no deployments running right now."
      />
    );
  }

  return (
    <div className="space-y-2">
      {deployments.map((dep) => {
        const meta = DEPLOYMENT_STATUS_META[dep.status];
        return (
          <div
            key={dep.id}
            className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm transition-colors hover:border-primary/30"
          >
            <div className="flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{dep.projectName}</span>
                <span className="font-mono text-xs text-muted-foreground">{dep.releaseVersion}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Deploying to {dep.environmentName}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <StatusBadge label={meta.label} color={meta.color} pulse />
              <RelativeTime timestamp={dep.startedAt ?? dep.createdAt} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RocketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
