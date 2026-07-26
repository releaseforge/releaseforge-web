import type { DeploymentStatus, ReleaseStatus } from "./types";

export const RELEASE_STATUS_META: Record<ReleaseStatus, { label: string; color: string }> = {
  Draft: { label: "Draft", color: "secondary" },
  Planned: { label: "Planned", color: "info" },
  InProgress: { label: "In Progress", color: "warning" },
  Deployed: { label: "Deployed", color: "success" },
  RolledBack: { label: "Rolled Back", color: "destructive" },
  Cancelled: { label: "Cancelled", color: "destructive" },
};

export const DEPLOYMENT_STATUS_META: Record<DeploymentStatus, { label: string; color: string }> = {
  Pending: { label: "Pending", color: "secondary" },
  InProgress: { label: "In Progress", color: "warning" },
  Succeeded: { label: "Succeeded", color: "success" },
  Failed: { label: "Failed", color: "destructive" },
  Cancelled: { label: "Cancelled", color: "destructive" },
  RolledBack: { label: "Rolled Back", color: "info" },
};

export const RELEASE_TRANSITIONS: Record<ReleaseStatus, { label: string; action: string }[]> = {
  Draft: [{ label: "Plan", action: "plan" }],
  Planned: [{ label: "Start", action: "start" }],
  InProgress: [{ label: "Deploy", action: "deploy" }, { label: "Cancel", action: "cancel" }],
  Deployed: [{ label: "Rollback", action: "rollback" }],
  RolledBack: [],
  Cancelled: [],
};
