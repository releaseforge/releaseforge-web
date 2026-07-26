import { useQuery } from "@tanstack/react-query";
import { deploymentRepository } from "@/data/repositories/deployment-repository";
import { projectRepository } from "@/data/repositories/project-repository";
import type { DashboardMetrics } from "@/domain/types";

function computeMetrics(): Promise<DashboardMetrics> {
  return (async () => {
    const projects = await projectRepository.getAll();
    const active = await deploymentRepository.getActive();
    const activity = await deploymentRepository.getRecentActivity(100);
    const health = await deploymentRepository.getEnvironmentHealth();

    const succeeded = activity.filter((a) => a.status === "Succeeded").length;
    const failed = activity.filter((a) => a.status === "Failed" || a.status === "RolledBack").length;
    const total = succeeded + failed;
    const successRate = total === 0 ? 100 : Math.round((succeeded / total) * 100);

    const recentSuccesses = activity.slice(0, 20).filter((a) => a.status === "Succeeded").length;
    const recentFailures = activity.slice(0, 20).filter((a) => a.status === "Failed" || a.status === "RolledBack").length;
    const recentTotal = recentSuccesses + recentFailures;
    const recentRate = recentTotal === 0 ? 100 : Math.round((recentSuccesses / recentTotal) * 100);

    return {
      activeDeployments: active.length,
      successRate,
      successRateTrend: recentRate >= successRate ? "up" : "down" as const,
      totalEnvironments: health.length,
      healthyEnvironments: health.filter((h) => h.status === "healthy").length,
      pendingApprovals: 3,
    };
  })();
}

export const dashboardKeys = {
  all: ["dashboard"] as const,
  metrics: () => ["dashboard", "metrics"] as const,
  activity: () => ["dashboard", "activity"] as const,
  health: () => ["dashboard", "health"] as const,
};

export function useDashboardMetrics() {
  return useQuery({
    queryKey: dashboardKeys.metrics(),
    queryFn: computeMetrics,
  });
}

export function useActiveDeployments() {
  return useQuery({
    queryKey: [...dashboardKeys.all, "active"],
    queryFn: () => deploymentRepository.getActive(),
    refetchInterval: 10_000,
  });
}

export function useRecentActivity(limit = 10) {
  return useQuery({
    queryKey: [...dashboardKeys.all, "recent", limit],
    queryFn: () => deploymentRepository.getRecentActivity(limit),
  });
}

export function useEnvironmentHealth() {
  return useQuery({
    queryKey: dashboardKeys.health(),
    queryFn: () => deploymentRepository.getEnvironmentHealth(),
  });
}
