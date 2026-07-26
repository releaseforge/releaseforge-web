import { projectsData } from "@/data/projects";
import type { Release, Deployment } from "@/domain/types";
import { delay } from "./utils";

export const releaseRepository = {
  async getByProject(projectId: string): Promise<Release[]> {
    await delay(350);
    const project = projectsData.find((p) => p.id === projectId);
    if (!project) return [];
    return project.releases.map(({ deployments: _, ...r }) => r);
  },

  async getById(projectId: string, id: string): Promise<(Release & { deployments: Deployment[] }) | null> {
    await delay(250);
    const project = projectsData.find((p) => p.id === projectId);
    if (!project) return null;
    return project.releases.find((r) => r.id === id) ?? null;
  },

  async getAllWithDeployments(): Promise<(Release & { deployments: Deployment[]; projectName: string })[]> {
    await delay(400);
    const all: (Release & { deployments: Deployment[]; projectName: string })[] = [];
    for (const project of projectsData) {
      for (const release of project.releases) {
        all.push({ ...release, projectName: project.name });
      }
    }
    return all;
  },
};
