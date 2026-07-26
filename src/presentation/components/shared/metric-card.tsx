import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "stable";
  icon?: ReactNode;
}

export function MetricCard({ label, value, trend, icon }: MetricCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-medium ${
              trend === "up"
                ? "text-emerald-600"
                : trend === "down"
                  ? "text-destructive"
                  : "text-muted-foreground"
            }`}
          >
            {trend === "up" && <ArrowUp />}
            {trend === "down" && <ArrowDown />}
            {trend === "stable" && <Minus />}
          </span>
        )}
      </div>
    </div>
  );
}

function ArrowUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5" /><path d="M5 12l7-7 7 7" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" /><path d="M19 12l-7 7-7-7" />
    </svg>
  );
}

function Minus() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
    </svg>
  );
}
