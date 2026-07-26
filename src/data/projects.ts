import type { Environment, Pipeline, Project, Release, Deployment } from "@/domain/types";
import { users } from "./users";

function daysAgo(d: number): string {
  return new Date(Date.now() - d * 86_400_000).toISOString();
}

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 3_600_000).toISOString();
}

function minutesAgo(m: number): string {
  return new Date(Date.now() - m * 60_000).toISOString();
}

/* ─── Shared environments ─── */

export const environments: Environment[] = [
  { id: "env-dev", projectId: "", name: "Development", slug: "dev", sortOrder: 0 },
  { id: "env-qa", projectId: "", name: "QA", slug: "qa", sortOrder: 1 },
  { id: "env-uat", projectId: "", name: "UAT", slug: "uat", sortOrder: 2 },
  { id: "env-stg", projectId: "", name: "Staging", slug: "stg", sortOrder: 3 },
  { id: "env-prod", projectId: "", name: "Production", slug: "prod", sortOrder: 4 },
];

/* ─── ReleaseForge (Platform) ─── */
const proj1Envs = environments.map(e => ({ ...e, projectId: "proj-1" }));
const proj1Releases: (Release & { deployments: Deployment[] })[] = [
  {
    id: "rel-1-4", projectId: "proj-1", version: "3.0.0", title: "AI-powered deployment recommendations",
    description: "Machine learning model analyzes deployment patterns and suggests optimal release windows, rollback risk scores, and canary traffic splits.",
    status: "InProgress", createdBy: "user-1", createdAt: hoursAgo(6), releasedAt: null,
    deployments: [
      { id: "dep-1-4a", releaseId: "rel-1-4", environmentId: "env-dev", status: "Succeeded", triggeredBy: "user-1", createdAt: hoursAgo(6), startedAt: hoursAgo(6), completedAt: hoursAgo(5), duration: 3600 },
      { id: "dep-1-4b", releaseId: "rel-1-4", environmentId: "env-qa", status: "InProgress", triggeredBy: "user-1", createdAt: hoursAgo(3), startedAt: hoursAgo(3), completedAt: null, duration: null },
      { id: "dep-1-4c", releaseId: "rel-1-4", environmentId: "env-uat", status: "Pending", triggeredBy: "user-4", createdAt: hoursAgo(1), startedAt: null, completedAt: null, duration: null },
    ],
  },
  {
    id: "rel-1-3", projectId: "proj-1", version: "2.5.1", title: "Hotfix: Pipeline executor timeout",
    description: "Critical fix for pipeline execution hanging on large deployment batches. Increases default timeout from 30s to 120s and adds exponential backoff retry.",
    status: "Deployed", createdBy: "user-2", createdAt: daysAgo(3), releasedAt: daysAgo(2),
    deployments: [
      { id: "dep-1-3a", releaseId: "rel-1-3", environmentId: "env-dev", status: "Succeeded", triggeredBy: "user-2", createdAt: daysAgo(3), startedAt: daysAgo(3), completedAt: daysAgo(3), duration: 240 },
      { id: "dep-1-3b", releaseId: "rel-1-3", environmentId: "env-qa", status: "Succeeded", triggeredBy: "user-2", createdAt: daysAgo(3), startedAt: daysAgo(3), completedAt: daysAgo(3), duration: 180 },
      { id: "dep-1-3c", releaseId: "rel-1-3", environmentId: "env-stg", status: "Succeeded", triggeredBy: "user-4", createdAt: daysAgo(2), startedAt: daysAgo(2), completedAt: daysAgo(2), duration: 300 },
      { id: "dep-1-3d", releaseId: "rel-1-3", environmentId: "env-prod", status: "Succeeded", triggeredBy: "user-4", createdAt: daysAgo(2), startedAt: daysAgo(2), completedAt: daysAgo(2), duration: 420 },
    ],
  },
  {
    id: "rel-1-2", projectId: "proj-1", version: "2.4.0", title: "Multi-region deployment support",
    description: "Deploy to multiple geographic regions with traffic splitting, canary analysis, and automated rollback on error rate spikes.",
    status: "Deployed", createdBy: "user-1", createdAt: daysAgo(14), releasedAt: daysAgo(10),
    deployments: [
      { id: "dep-1-2a", releaseId: "rel-1-2", environmentId: "env-dev", status: "Succeeded", triggeredBy: "user-1", createdAt: daysAgo(14), startedAt: daysAgo(14), completedAt: daysAgo(14), duration: 180 },
      { id: "dep-1-2b", releaseId: "rel-1-2", environmentId: "env-qa", status: "Succeeded", triggeredBy: "user-1", createdAt: daysAgo(13), startedAt: daysAgo(13), completedAt: daysAgo(13), duration: 240 },
      { id: "dep-1-2c", releaseId: "rel-1-2", environmentId: "env-prod", status: "Succeeded", triggeredBy: "user-3", createdAt: daysAgo(10), startedAt: daysAgo(10), completedAt: daysAgo(10), duration: 600 },
    ],
  },
  {
    id: "rel-1-1", projectId: "proj-1", version: "2.3.0", title: "Dashboard analytics & reporting",
    description: "Real-time analytics dashboard with deployment metrics, success rates, rollback frequency, and team velocity tracking.",
    status: "RolledBack", createdBy: "user-3", createdAt: daysAgo(30), releasedAt: daysAgo(28),
    deployments: [
      { id: "dep-1-1a", releaseId: "rel-1-1", environmentId: "env-dev", status: "Succeeded", triggeredBy: "user-3", createdAt: daysAgo(30), startedAt: daysAgo(30), completedAt: daysAgo(30), duration: 120 },
      { id: "dep-1-1b", releaseId: "rel-1-1", environmentId: "env-qa", status: "Succeeded", triggeredBy: "user-3", createdAt: daysAgo(29), startedAt: daysAgo(29), completedAt: daysAgo(29), duration: 180 },
      { id: "dep-1-1c", releaseId: "rel-1-1", environmentId: "env-prod", status: "RolledBack", triggeredBy: "user-2", createdAt: daysAgo(28), startedAt: daysAgo(28), completedAt: daysAgo(27), duration: 240 },
    ],
  },
];

/* ─── CRM Platform ─── */
const proj2Envs = [
  { id: "env-crm-dev", projectId: "proj-2", name: "Development", slug: "dev", sortOrder: 0 },
  { id: "env-crm-stg", projectId: "proj-2", name: "Staging", slug: "stg", sortOrder: 1 },
  { id: "env-crm-prod", projectId: "proj-2", name: "Production", slug: "prod", sortOrder: 2 },
];

const proj2Releases: (Release & { deployments: Deployment[] })[] = [
  {
    id: "rel-2-3", projectId: "proj-2", version: "4.1.0", title: "Lead scoring engine v2",
    description: "AI-driven lead scoring using behavioral data, email engagement, and third-party intent signals. Includes A/B test framework for scoring models.",
    status: "Deployed", createdBy: "user-2", createdAt: daysAgo(5), releasedAt: daysAgo(3),
    deployments: [
      { id: "dep-2-3a", releaseId: "rel-2-3", environmentId: "env-crm-dev", status: "Succeeded", triggeredBy: "user-2", createdAt: daysAgo(5), startedAt: daysAgo(5), completedAt: daysAgo(5), duration: 300 },
      { id: "dep-2-3b", releaseId: "rel-2-3", environmentId: "env-crm-stg", status: "Succeeded", triggeredBy: "user-4", createdAt: daysAgo(4), startedAt: daysAgo(4), completedAt: daysAgo(4), duration: 240 },
      { id: "dep-2-3c", releaseId: "rel-2-3", environmentId: "env-crm-prod", status: "Succeeded", triggeredBy: "user-1", createdAt: daysAgo(3), startedAt: daysAgo(3), completedAt: daysAgo(3), duration: 480 },
    ],
  },
  {
    id: "rel-2-2", projectId: "proj-2", version: "4.0.0", title: "Sales pipeline overhaul",
    description: "Complete rebuild of the sales pipeline view with drag-and-drop, custom stages, forecasting, and Slack integration for deal updates.",
    status: "Deployed", createdBy: "user-1", createdAt: daysAgo(21), releasedAt: daysAgo(18),
    deployments: [
      { id: "dep-2-2a", releaseId: "rel-2-2", environmentId: "env-crm-dev", status: "Succeeded", triggeredBy: "user-1", createdAt: daysAgo(21), startedAt: daysAgo(21), completedAt: daysAgo(21), duration: 480 },
      { id: "dep-2-2b", releaseId: "rel-2-2", environmentId: "env-crm-prod", status: "Succeeded", triggeredBy: "user-3", createdAt: daysAgo(18), startedAt: daysAgo(18), completedAt: daysAgo(18), duration: 600 },
    ],
  },
  {
    id: "rel-2-1", projectId: "proj-2", version: "3.5.0", title: "Email automation sequences",
    description: "Visual email sequence builder with triggers, conditions, A/B testing, and analytics. Supports plain-text, HTML, and dynamic content blocks.",
    status: "RolledBack", createdBy: "user-4", createdAt: daysAgo(45), releasedAt: daysAgo(42),
    deployments: [
      { id: "dep-2-1a", releaseId: "rel-2-1", environmentId: "env-crm-dev", status: "Succeeded", triggeredBy: "user-4", createdAt: daysAgo(45), startedAt: daysAgo(45), completedAt: daysAgo(45), duration: 300 },
      { id: "dep-2-1b", releaseId: "rel-2-1", environmentId: "env-crm-prod", status: "Failed", triggeredBy: "user-2", createdAt: daysAgo(42), startedAt: daysAgo(42), completedAt: daysAgo(42), duration: 180 },
    ],
  },
];

/* ─── Billing API ─── */
const proj3Envs = [
  { id: "env-bill-dev", projectId: "proj-3", name: "Development", slug: "dev", sortOrder: 0 },
  { id: "env-bill-stg", projectId: "proj-3", name: "Staging", slug: "stg", sortOrder: 1 },
  { id: "env-bill-prod", projectId: "proj-3", name: "Production", slug: "prod", sortOrder: 2 },
];

const proj3Releases: (Release & { deployments: Deployment[] })[] = [
  {
    id: "rel-3-3", projectId: "proj-3", version: "2.1.0", title: "Usage-based billing engine",
    description: "New consumption-based billing with metered usage tracking, tiered pricing, and real-time quota monitoring. Supports webhook callbacks for overage alerts.",
    status: "Draft", createdBy: "user-3", createdAt: hoursAgo(12), releasedAt: null,
    deployments: [],
  },
  {
    id: "rel-3-2", projectId: "proj-3", version: "2.0.0", title: "Subscription management API",
    description: "RESTful subscription lifecycle API with plan changes, proration, coupons, and dunning management. Stripe and Chargebee adapters included.",
    status: "Deployed", createdBy: "user-1", createdAt: daysAgo(10), releasedAt: daysAgo(7),
    deployments: [
      { id: "dep-3-2a", releaseId: "rel-3-2", environmentId: "env-bill-dev", status: "Succeeded", triggeredBy: "user-1", createdAt: daysAgo(10), startedAt: daysAgo(10), completedAt: daysAgo(10), duration: 600 },
      { id: "dep-3-2b", releaseId: "rel-3-2", environmentId: "env-bill-stg", status: "Succeeded", triggeredBy: "user-3", createdAt: daysAgo(9), startedAt: daysAgo(9), completedAt: daysAgo(9), duration: 360 },
      { id: "dep-3-2c", releaseId: "rel-3-2", environmentId: "env-bill-prod", status: "Succeeded", triggeredBy: "user-4", createdAt: daysAgo(7), startedAt: daysAgo(7), completedAt: daysAgo(7), duration: 900 },
    ],
  },
  {
    id: "rel-3-1", projectId: "proj-3", version: "1.0.0", title: "Initial billing platform",
    description: "Minimum viable billing system supporting invoices, payment processing, and basic subscription management.",
    status: "Deployed", createdBy: "user-4", createdAt: daysAgo(90), releasedAt: daysAgo(85),
    deployments: [
      { id: "dep-3-1a", releaseId: "rel-3-1", environmentId: "env-bill-prod", status: "Succeeded", triggeredBy: "user-4", createdAt: daysAgo(85), startedAt: daysAgo(85), completedAt: daysAgo(85), duration: 1200 },
    ],
  },
];

/* ─── Customer Portal ─── */
const proj4Envs = [
  { id: "env-portal-dev", projectId: "proj-4", name: "Development", slug: "dev", sortOrder: 0 },
  { id: "env-portal-qa", projectId: "proj-4", name: "QA", slug: "qa", sortOrder: 1 },
  { id: "env-portal-prod", projectId: "proj-4", name: "Production", slug: "prod", sortOrder: 2 },
];

const proj4Releases: (Release & { deployments: Deployment[] })[] = [
  {
    id: "rel-4-2", projectId: "proj-4", version: "1.5.0", title: "SSO and team management",
    description: "Enterprise SSO with SAML/OIDC support, role-based access control, team invite flows, and audit logging for all admin actions.",
    status: "InProgress", createdBy: "user-2", createdAt: daysAgo(2), releasedAt: null,
    deployments: [
      { id: "dep-4-2a", releaseId: "rel-4-2", environmentId: "env-portal-dev", status: "Succeeded", triggeredBy: "user-2", createdAt: daysAgo(2), startedAt: daysAgo(2), completedAt: daysAgo(2), duration: 600 },
      { id: "dep-4-2b", releaseId: "rel-4-2", environmentId: "env-portal-qa", status: "InProgress", triggeredBy: "user-4", createdAt: hoursAgo(4), startedAt: hoursAgo(4), completedAt: null, duration: null },
    ],
  },
  {
    id: "rel-4-1", projectId: "proj-4", version: "1.4.0", title: "Dark mode and accessibility",
    description: "Full dark mode support, WCAG 2.1 AA compliance, keyboard navigation overhaul, screen reader improvements, and reduced motion support.",
    status: "Deployed", createdBy: "user-1", createdAt: daysAgo(20), releasedAt: daysAgo(17),
    deployments: [
      { id: "dep-4-1a", releaseId: "rel-4-1", environmentId: "env-portal-dev", status: "Succeeded", triggeredBy: "user-1", createdAt: daysAgo(20), startedAt: daysAgo(20), completedAt: daysAgo(20), duration: 180 },
      { id: "dep-4-1b", releaseId: "rel-4-1", environmentId: "env-portal-prod", status: "Succeeded", triggeredBy: "user-2", createdAt: daysAgo(17), startedAt: daysAgo(17), completedAt: daysAgo(17), duration: 360 },
    ],
  },
];

/* ─── Inventory Service ─── */
const proj5Envs = [
  { id: "env-inv-dev", projectId: "proj-5", name: "Development", slug: "dev", sortOrder: 0 },
  { id: "env-inv-stg", projectId: "proj-5", name: "Staging", slug: "stg", sortOrder: 1 },
  { id: "env-inv-prod", projectId: "proj-5", name: "Production", slug: "prod", sortOrder: 2 },
];

const proj5Releases: (Release & { deployments: Deployment[] })[] = [
  {
    id: "rel-5-3", projectId: "proj-5", version: "1.2.0", title: "Real-time stock sync",
    description: "WebSocket-based real-time inventory sync across warehouses with conflict resolution, optimistic locking, and audit trail.",
    status: "Planned", createdBy: "user-3", createdAt: daysAgo(1), releasedAt: null,
    deployments: [],
  },
  {
    id: "rel-5-2", projectId: "proj-5", version: "1.1.0", title: "Warehouse management system",
    description: "Multi-warehouse support with bin locations, pick-pack-ship workflows, barcode scanning integration, and carrier label generation.",
    status: "Deployed", createdBy: "user-4", createdAt: daysAgo(15), releasedAt: daysAgo(12),
    deployments: [
      { id: "dep-5-2a", releaseId: "rel-5-2", environmentId: "env-inv-dev", status: "Succeeded", triggeredBy: "user-4", createdAt: daysAgo(15), startedAt: daysAgo(15), completedAt: daysAgo(15), duration: 540 },
      { id: "dep-5-2b", releaseId: "rel-5-2", environmentId: "env-inv-prod", status: "Succeeded", triggeredBy: "user-3", createdAt: daysAgo(12), startedAt: daysAgo(12), completedAt: daysAgo(12), duration: 720 },
    ],
  },
  {
    id: "rel-5-1", projectId: "proj-5", version: "1.0.0", title: "Inventory API MVP",
    description: "Core inventory CRUD API with SKU management, stock levels, low-stock alerts, and supplier catalog integration.",
    status: "Deployed", createdBy: "user-1", createdAt: daysAgo(60), releasedAt: daysAgo(55),
    deployments: [
      { id: "dep-5-1a", releaseId: "rel-5-1", environmentId: "env-inv-dev", status: "Succeeded", triggeredBy: "user-1", createdAt: daysAgo(60), startedAt: daysAgo(60), completedAt: daysAgo(60), duration: 300 },
      { id: "dep-5-1b", releaseId: "rel-5-1", environmentId: "env-inv-prod", status: "Succeeded", triggeredBy: "user-2", createdAt: daysAgo(55), startedAt: daysAgo(55), completedAt: daysAgo(55), duration: 480 },
    ],
  },
];

/* ─── Exported project data ─── */

export const projects: Project[] = [
  { id: "proj-1", name: "ReleaseForge", slug: "releaseforge", description: "Internal release management and deployment orchestration platform powering our entire engineering organization.", createdAt: daysAgo(180), updatedAt: hoursAgo(2) },
  { id: "proj-2", name: "CRM Platform", slug: "crm-platform", description: "Enterprise customer relationship management with lead tracking, pipeline management, and email automation.", createdAt: daysAgo(150), updatedAt: hoursAgo(6) },
  { id: "proj-3", name: "Billing API", slug: "billing-api", description: "Subscription billing, invoicing, payment processing, and usage metering service handling $2M+ monthly revenue.", createdAt: daysAgo(120), updatedAt: daysAgo(3) },
  { id: "proj-4", name: "Customer Portal", slug: "customer-portal", description: "Self-service customer dashboard with ticket management, documentation, and account settings.", createdAt: daysAgo(90), updatedAt: hoursAgo(8) },
  { id: "proj-5", name: "Inventory Service", slug: "inventory-service", description: "Real-time inventory management with multi-warehouse support, stock optimization, and supplier integration.", createdAt: daysAgo(60), updatedAt: daysAgo(1) },
];

export interface ProjectWithData extends Project {
  environments: Environment[];
  pipelines: Pipeline[];
  releases: (Release & { deployments: Deployment[] })[];
}

export const projectsData: ProjectWithData[] = [
  {
    ...projects[0], environments: proj1Envs,
    pipelines: [
      { id: "pipe-1-1", projectId: "proj-1", name: "CI/CD Build & Deploy", createdAt: daysAgo(160) },
      { id: "pipe-1-2", projectId: "proj-1", name: "Database Migration Pipeline", createdAt: daysAgo(140) },
      { id: "pipe-1-3", projectId: "proj-1", name: "Security Scan & Compliance", createdAt: daysAgo(100) },
    ],
    releases: proj1Releases,
  },
  {
    ...projects[1], environments: proj2Envs,
    pipelines: [
      { id: "pipe-2-1", projectId: "proj-2", name: "CI/CD Build & Deploy", createdAt: daysAgo(130) },
      { id: "pipe-2-2", projectId: "proj-2", name: "Database Migration Pipeline", createdAt: daysAgo(100) },
    ],
    releases: proj2Releases,
  },
  {
    ...projects[2], environments: proj3Envs,
    pipelines: [
      { id: "pipe-3-1", projectId: "proj-3", name: "CI/CD Build & Deploy", createdAt: daysAgo(100) },
      { id: "pipe-3-2", projectId: "proj-3", name: "Compliance Check Pipeline", createdAt: daysAgo(80) },
    ],
    releases: proj3Releases,
  },
  {
    ...projects[3], environments: proj4Envs,
    pipelines: [
      { id: "pipe-4-1", projectId: "proj-4", name: "CI/CD Build & Deploy", createdAt: daysAgo(70) },
    ],
    releases: proj4Releases,
  },
  {
    ...projects[4], environments: proj5Envs,
    pipelines: [
      { id: "pipe-5-1", projectId: "proj-5", name: "CI/CD Build & Deploy", createdAt: daysAgo(50) },
    ],
    releases: proj5Releases,
  },
];
