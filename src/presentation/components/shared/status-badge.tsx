import { Badge } from "@/components/ui/badge";

const colorMap: Record<string, "default" | "secondary" | "destructive" | "success" | "warning" | "info"> = {
  success: "success",
  warning: "warning",
  info: "info",
  destructive: "destructive",
  secondary: "secondary",
  default: "default",
};

interface StatusBadgeProps {
  label: string;
  color?: string;
  pulse?: boolean;
}

export function StatusBadge({ label, color = "secondary", pulse }: StatusBadgeProps) {
  return (
    <Badge variant={colorMap[color] ?? "secondary"} className={pulse ? "animate-pulse" : ""}>
      {pulse && (
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {label}
    </Badge>
  );
}
