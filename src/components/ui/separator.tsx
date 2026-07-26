import type { HTMLAttributes } from "react";

function Separator({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={`shrink-0 bg-border h-[1px] w-full ${className}`}
      {...props}
    />
  );
}

export { Separator };
