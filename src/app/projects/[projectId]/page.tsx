"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useProjectWithData } from "@/application/hooks/use-projects";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/presentation/components/shared/skeleton";
import { StatusBadge } from "@/presentation/components/shared/status-badge";
import { SectionHeader } from "@/presentation/components/shared/section-header";
import { EmptyState } from "@/presentation/components/shared/empty-state";
import { RELEASE_STATUS_META, DEPLOYMENT_STATUS_META, RELEASE_TRANSITIONS } from "@/domain/constants";
import type { Deployment, Release } from "@/domain/types";

function BoardSkeleton() {
  return (
    <div className="rounded-lg border">
      <div className="border-b bg-muted/50 p-4 flex gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {[1, 2, 3].map((row) => (
        <div key={row} className="border-b last:border-0 p-4 flex gap-6">
          {[1, 2, 3, 4, 5].map((col) => (
            <Skeleton key={col} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const { data: project, isLoading, error } = useProjectWithData(projectId);

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-8">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <Separator />
        <BoardSkeleton />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 p-8 py-24">
        <p className="text-destructive font-medium">Failed to load project</p>
        <p className="text-sm text-muted-foreground">{error?.message ?? "Project not found"}</p>
        <Button variant="outline" onClick={() => router.push("/projects")}>
          Back to Projects
        </Button>
      </div>
    );
  }

  const sortedReleases = [...project.releases].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const sortedEnvs = [...project.environments].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Link
            href="/projects"
            className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Projects
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          {project.description && (
            <p className="text-sm text-muted-foreground">{project.description}</p>
          )}
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span>{project.releases.length} releases</span>
            <span>{project.environments.length} environments</span>
            <span>{project.pipelines.length} pipelines</span>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Releases Board */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="Releases"
          description="Release pipeline across environments"
        />

        {sortedReleases.length === 0 ? (
          <EmptyState
            icon={<ReleaseIcon />}
            title="No releases yet"
            description="Create your first release to start tracking deployments."
          />
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Version</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  {sortedEnvs.map((env) => (
                    <th key={env.id} className="px-4 py-3 text-center font-medium text-muted-foreground">
                      {env.name}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedReleases.map((release) => {
                  const meta = RELEASE_STATUS_META[release.status];
                  return (
                    <tr key={release.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs font-medium">{release.version}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium">{release.title}</p>
                        {release.description && (
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {release.description}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge label={meta.label} color={meta.color} />
                      </td>
                      {sortedEnvs.map((env) => {
                        const dep = release.deployments.find((d) => d.environmentId === env.id);
                        return (
                          <td key={env.id} className="px-4 py-3 text-center">
                            {dep ? (
                              <StatusBadge
                                label={DEPLOYMENT_STATUS_META[dep.status].label}
                                color={DEPLOYMENT_STATUS_META[dep.status].color}
                              />
                            ) : (
                              <span className="text-muted-foreground text-xs">—</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.push(`/releases/${project.id}/${release.id}`)}
                          >
                            View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function ReleaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
