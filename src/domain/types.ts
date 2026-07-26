export type ReleaseStatus = "Draft" | "Planned" | "InProgress" | "Deployed" | "RolledBack" | "Cancelled";
export type DeploymentStatus = "Pending" | "InProgress" | "Succeeded" | "Failed" | "Cancelled" | "RolledBack";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface ProjectDetail extends Project {
  releaseCount: number;
  environmentCount: number;
  pipelineCount: number;
}

export interface Release {
  id: string;
  projectId: string;
  version: string;
  title: string;
  description: string | null;
  status: ReleaseStatus;
  createdBy: string;
  createdAt: string;
  releasedAt: string | null;
}

export interface Environment {
  id: string;
  projectId: string;
  name: string;
  slug: string;
  sortOrder: number;
}

export interface Pipeline {
  id: string;
  projectId: string;
  name: string;
  createdAt: string;
}

export interface Deployment {
  id: string;
  releaseId: string;
  environmentId: string;
  status: DeploymentStatus;
  triggeredBy: string;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  duration: number | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface DashboardMetrics {
  activeDeployments: number;
  successRate: number;
  successRateTrend: "up" | "down" | "stable";
  totalEnvironments: number;
  healthyEnvironments: number;
  pendingApprovals: number;
}

export interface ActivityItem {
  id: string;
  type: "deployment_started" | "deployment_succeeded" | "deployment_failed" | "release_created" | "release_deployed" | "rollback";
  projectId: string;
  projectName: string;
  releaseVersion: string;
  environmentName: string;
  environmentSlug: string;
  status: DeploymentStatus | ReleaseStatus;
  userId: string;
  userName: string;
  timestamp: string;
  duration: number | null;
}

export interface EnvironmentHealth {
  environmentId: string;
  environmentName: string;
  environmentSlug: string;
  status: "healthy" | "degraded" | "down" | "inactive";
  lastDeployment: string | null;
  lastDeploymentStatus: DeploymentStatus | null;
  projectName: string;
}
