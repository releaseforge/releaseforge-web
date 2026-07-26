import { projectsData } from "@/data/projects";
import { environments } from "@/data/projects";
import { users } from "@/data/users";
import type { Deployment, ActivityItem, EnvironmentHealth } from "@/domain/types";
import { delay } from "./utils";

export const deploymentRepository = {
  async getActive(): Promise<(Deployment & { projectName: string; releaseVersion: string; environmentName: string })[]> {
    await delay(300);
    const active: (Deployment & { projectName: string; releaseVersion: string; environmentName: string })[] = [];
    for (const project of projectsData) {
      for (const release of project.releases) {
        for (const dep of release.deployments) {
          if (dep.status === "InProgress" || dep.status === "Pending") {
            const env = environments.find((e) => e.id === dep.environmentId);
            active.push({
              ...dep,
              projectName: project.name,
              releaseVersion: release.version,
              environmentName: env?.name ?? "Unknown",
            });
          }
        }
      }
    }
    return active.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getRecentActivity(limit = 10): Promise<ActivityItem[]> {
    await delay(350);
    const items: ActivityItem[] = [];
    for (const project of projectsData) {
      for (const release of project.releases) {
        for (const dep of release.deployments) {
          const user = users.find((u) => u.id === dep.triggeredBy);
          const env = environments.find((e) => e.id === dep.environmentId);
          let type: ActivityItem["type"] = "deployment_succeeded";
          if (dep.status === "InProgress") type = "deployment_started";
          else if (dep.status === "Failed") type = "deployment_failed";
          else if (dep.status === "RolledBack") type = "rollback";

          items.push({
            id: dep.id,
            type,
            projectId: project.id,
            projectName: project.name,
            releaseVersion: release.version,
            environmentName: env?.name ?? "Unknown",
            environmentSlug: env?.slug ?? "unknown",
            status: dep.status,
            userId: dep.triggeredBy,
            userName: user?.name ?? "Unknown",
            timestamp: dep.completedAt ?? dep.startedAt ?? dep.createdAt,
            duration: dep.duration,
          });
        }
      }
    }
    return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
  },

  async getEnvironmentHealth(): Promise<EnvironmentHealth[]> {
    await delay(300);
    const healthMap = new Map<string, EnvironmentHealth>();

    for (const project of projectsData) {
      for (const env of project.environments) {
        const projectReleases = project.releases
          .flatMap((r) => r.deployments.map((d) => ({ ...d, releaseVersion: r.version })))
          .filter((d) => d.environmentId === env.id)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        const lastDep = projectReleases[0] ?? null;

        let status: EnvironmentHealth["status"] = "inactive";
        if (lastDep) {
          if (lastDep.status === "Failed" || lastDep.status === "RolledBack") status = "down";
          else if (lastDep.status === "InProgress") status = "degraded";
          else if (lastDep.status === "Succeeded") status = "healthy";
        }

        const key = `${project.id}-${env.id}`;
        healthMap.set(key, {
          environmentId: env.id,
          environmentName: env.name,
          environmentSlug: env.slug,
          status,
          lastDeployment: lastDep?.createdAt ?? null,
          lastDeploymentStatus: lastDep?.status ?? null,
          projectName: project.name,
        });
      }
    }

    return Array.from(healthMap.values());
  },
};
