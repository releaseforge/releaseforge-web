import { Skeleton } from "@/presentation/components/shared/skeleton";
import { EmptyState } from "@/presentation/components/shared/empty-state";
import { StatusBadge } from "@/presentation/components/shared/status-badge";
import type { EnvironmentHealth } from "@/domain/types";

interface EnvironmentGridProps {
  environments: EnvironmentHealth[] | undefined;
  isLoading: boolean;
}

const statusMeta: Record<string, { label: string; color: string }> = {
  healthy: { label: "Healthy", color: "success" },
  degraded: { label: "Deploying", color: "warning" },
  down: { label: "Unhealthy", color: "destructive" },
  inactive: { label: "Inactive", color: "secondary" },
};

const statusDotColor: Record<string, string> = {
  healthy: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-destructive",
  inactive: "bg-muted-foreground",
};

export function EnvironmentGrid({ environments, isLoading }: EnvironmentGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!environments || environments.length === 0) {
    return (
      <EmptyState
        icon={<LayersIcon />}
        title="No environments configured"
        description="Create environments to track deployment health across your infrastructure."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {environments.map((env) => {
        const meta = statusMeta[env.status] ?? { label: env.status, color: "secondary" };
        return (
          <div
            key={`${env.projectName}-${env.environmentId}`}
            className="rounded-xl border bg-card p-4 shadow-sm transition-colors hover:border-primary/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${statusDotColor[env.status]}`} />
                <span className="font-medium text-sm">{env.environmentName}</span>
              </div>
              <StatusBadge label={meta.label} color={meta.color} />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {env.projectName}
            </p>
            {env.lastDeployment && (
              <p className="mt-2 text-xs text-muted-foreground border-t pt-2">
                Last deployed{" "}
                {new Date(env.lastDeployment).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
