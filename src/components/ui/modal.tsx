"use client";

import { useEffect, useId, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalSize = "sm" | "md" | "lg" | "xl";

const sizes: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  className,
}: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-zinc-950/50 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative w-full bg-white shadow-2xl shadow-zinc-900/20 flex flex-col max-h-[92dvh]",
          "rounded-t-3xl sm:rounded-3xl animate-modal-in",
          sizes[size],
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-border shrink-0">
          <div className="min-w-0">
            <h2 id={titleId} className="text-lg font-bold tracking-tight text-foreground">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-muted mt-1 leading-relaxed">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted hover:bg-zinc-50 hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">{children}</div>

        {footer && (
          <div className="shrink-0 px-5 sm:px-6 py-4 border-t border-border bg-zinc-50/80 rounded-b-3xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
