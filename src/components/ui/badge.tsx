import type { ReactNode } from "react";

const variants = {
  default: "border-transparent bg-primary text-primary-foreground shadow-sm",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  destructive: "border-transparent bg-destructive text-destructive-foreground shadow-sm",
  outline: "text-foreground",
  success: "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400",
  warning: "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400",
  info: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400",
} as const;

type BadgeVariant = keyof typeof variants;

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export { Badge, type BadgeVariant };
