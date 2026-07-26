"use client";

import { useRouter } from "next/navigation";
import { MetricBar } from "@/presentation/features/dashboard/components/metric-bar";
import { ActiveDeployments } from "@/presentation/features/dashboard/components/active-deployments";
import { ActivityFeed } from "@/presentation/features/dashboard/components/activity-feed";
import { EnvironmentGrid } from "@/presentation/features/dashboard/components/environment-grid";
import { SectionHeader } from "@/presentation/components/shared/section-header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/presentation/components/shared/skeleton";
import {
  useDashboardMetrics,
  useActiveDeployments,
  useRecentActivity,
  useEnvironmentHealth,
} from "@/application/hooks/use-dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useDashboardMetrics();
  const { data: activeDeployments, isLoading: activeLoading } = useActiveDeployments();
  const { data: recentActivity, isLoading: activityLoading } = useRecentActivity(10);
  const { data: environments, isLoading: envsLoading } = useEnvironmentHealth();

  const hasError = metricsError;

  if (hasError) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 p-8 py-24">
        <p className="text-destructive font-medium">Failed to load dashboard</p>
        <p className="text-sm text-muted-foreground">Something went wrong. Please try again.</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-8">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of all projects, deployments, and environment health
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" onClick={() => router.push("/projects")}>
            View Projects
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <MetricBar metrics={metrics} isLoading={metricsLoading} />

      <Separator />

      {/* Active Deployments */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="Active Deployments"
          description="Deployments currently in progress"
        />
        <ActiveDeployments deployments={activeDeployments} isLoading={activeLoading} />
      </section>

      <Separator />

      {/* Recent Activity */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="Recent Activity"
          description="Latest deployment activity across all projects"
        />
        <ActivityFeed items={recentActivity} isLoading={activityLoading} />
      </section>

      <Separator />

      {/* Environment Health */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="Environment Health"
          description="Current status of all deployment environments"
        />
        <EnvironmentGrid environments={environments} isLoading={envsLoading} />
      </section>
    </div>
  );
}
