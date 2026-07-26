import { projects, projectsData, type ProjectWithData } from "@/data/projects";
import type { Project, ProjectDetail } from "@/domain/types";
import { delay } from "./utils";

export const projectRepository = {
  async getAll(): Promise<Project[]> {
    await delay(400);
    return projects;
  },

  async getById(id: string): Promise<ProjectDetail | null> {
    await delay(300);
    const project = projectsData.find((p) => p.id === id);
    if (!project) return null;
    return {
      ...project,
      releaseCount: project.releases.length,
      environmentCount: project.environments.length,
      pipelineCount: project.pipelines.length,
    };
  },

  async getWithData(id: string): Promise<ProjectWithData | null> {
    await delay(200);
    return projectsData.find((p) => p.id === id) ?? null;
  },

  async getAllWithData(): Promise<ProjectWithData[]> {
    await delay(500);
    return projectsData;
  },
};
