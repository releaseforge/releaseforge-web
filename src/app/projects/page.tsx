"use client";

import Link from "next/link";
import { useProjects } from "@/application/hooks/use-projects";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/presentation/components/shared/skeleton";
import { EmptyState } from "@/presentation/components/shared/empty-state";

export default function ProjectsPage() {
  const { data: projects, isLoading, error } = useProjects();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your release and deployment projects
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center gap-2 py-16">
          <p className="text-destructive font-medium">Failed to load projects</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      )}

      {!isLoading && !error && !projects?.length && (
        <EmptyState
          icon={<ProjectIcon />}
          title="No projects yet"
          description="Create your first project to get started with release management."
        />
      )}

      {!isLoading && !error && projects && projects.length > 0 && (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{project.name}</h3>
              {project.description && (
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                Created {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  );
}
