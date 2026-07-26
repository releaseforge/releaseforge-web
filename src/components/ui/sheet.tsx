"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentId: string;
}

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheet() {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("useSheet must be used within Sheet");
  return ctx;
}

interface SheetProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Sheet({ children, open: controlledOpen, onOpenChange }: SheetProps) {
  const id = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const onOpenChange_ = useCallback(
    (v: boolean) => {
      onOpenChange?.(v);
      if (controlledOpen === undefined) setUncontrolledOpen(v);
    },
    [onOpenChange, controlledOpen]
  );

  return (
    <SheetContext.Provider value={{ open, onOpenChange: onOpenChange_, contentId: id }}>
      {children}
    </SheetContext.Provider>
  );
}

function SheetTrigger({ children }: { children: ReactNode }) {
  const { onOpenChange } = useSheet();
  return (
    <button type="button" onClick={() => onOpenChange(true)}>
      {children}
    </button>
  );
}

function SheetContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open, onOpenChange, contentId } = useSheet();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        id={contentId}
        role="dialog"
        aria-modal="true"
        className={`relative z-50 flex w-full max-w-lg flex-col border-l bg-background shadow-lg ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

function SheetHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 p-6 pb-0 ${className}`}>
      {children}
    </div>
  );
}

function SheetTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-lg font-semibold text-foreground ${className}`}>
      {children}
    </h2>
  );
}

function SheetDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}

function SheetFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-end gap-2 border-t bg-background p-4 sticky bottom-0 ${className}`}>
      {children}
    </div>
  );
}

function SheetClose({ children }: { children: ReactNode }) {
  const { onOpenChange } = useSheet();
  return (
    <button type="button" onClick={() => onOpenChange(false)}>
      {children}
    </button>
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
};
