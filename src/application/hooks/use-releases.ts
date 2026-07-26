import { useQuery } from "@tanstack/react-query";
import { releaseRepository } from "@/data/repositories/release-repository";

export const releaseKeys = {
  byProject: (projectId: string) => ["releases", "project", projectId] as const,
  byId: (projectId: string, id: string) => ["releases", projectId, id] as const,
};

export function useReleases(projectId: string) {
  return useQuery({
    queryKey: releaseKeys.byProject(projectId),
    queryFn: () => releaseRepository.getByProject(projectId),
    enabled: !!projectId,
  });
}

export function useRelease(projectId: string, id: string) {
  return useQuery({
    queryKey: releaseKeys.byId(projectId, id),
    queryFn: () => releaseRepository.getById(projectId, id),
    enabled: !!id,
  });
}
