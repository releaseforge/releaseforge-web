import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className = "", children, ...props }: CardProps) {
  return (
    <div className={`flex flex-col gap-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className = "", children, ...props }: CardProps) {
  return (
    <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  );
}

function CardDescription({ className = "", children, ...props }: CardProps) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>
      {children}
    </p>
  );
}

function CardContent({ className = "", children, ...props }: CardProps) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className = "", children, ...props }: CardProps) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
