import { useQuery } from "@tanstack/react-query";
import { projectRepository } from "@/data/repositories/project-repository";

export const projectKeys = {
  all: ["projects"] as const,
  byId: (id: string) => ["projects", id] as const,
  withData: (id: string) => ["projects", id, "with-data"] as const,
};

export function useProjects() {
  return useQuery({
    queryKey: projectKeys.all,
    queryFn: () => projectRepository.getAll(),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.byId(id),
    queryFn: () => projectRepository.getById(id),
    enabled: !!id,
  });
}

export function useProjectWithData(id: string) {
  return useQuery({
    queryKey: projectKeys.withData(id),
    queryFn: () => projectRepository.getWithData(id),
    enabled: !!id,
  });
}
