export interface ProjectDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface ProjectDetailDto extends ProjectDto {
  releaseCount: number;
  environmentCount: number;
  pipelineCount: number;
}

export interface CreateProjectCommand {
  name: string;
  description?: string | null;
}

export interface UpdateProjectCommand {
  id: string;
  name: string;
  description?: string | null;
}

export interface ReleaseDto {
  id: string;
  projectId: string;
  version: string;
  title: string;
  description: string | null;
  status: ReleaseStatus;
  createdAt: string;
  releasedAt: string | null;
}

export type ReleaseStatus =
  | "Draft"
  | "Planned"
  | "InProgress"
  | "Deployed"
  | "RolledBack"
  | "Cancelled";

export interface CreateReleaseCommand {
  projectId: string;
  version: string;
  title: string;
  description?: string | null;
}

export interface UpdateReleaseCommand {
  id: string;
  version: string;
  title: string;
  description?: string | null;
}

export interface EnvironmentDto {
  id: string;
  projectId: string;
  name: string;
  slug: string;
  sortOrder: number;
}

export interface CreateEnvironmentCommand {
  projectId: string;
  name: string;
}

export interface UpdateEnvironmentCommand {
  id: string;
  name: string;
  sortOrder: number;
}

export interface PipelineDto {
  id: string;
  projectId: string;
  name: string;
  createdAt: string;
}

export interface CreatePipelineCommand {
  projectId: string;
  name: string;
}

export interface UpdatePipelineCommand {
  id: string;
  name: string;
}

export interface DeploymentDto {
  id: string;
  releaseId: string;
  environmentId: string;
  status: DeploymentStatus;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
}

export type DeploymentStatus =
  | "Pending"
  | "InProgress"
  | "Succeeded"
  | "Failed"
  | "Cancelled"
  | "RolledBack";

export interface CreateDeploymentCommand {
  releaseId: string;
  environmentId: string;
}
