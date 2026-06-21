import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "veg" | "non-veg" | "success" | "warning" | "muted";
}

const variants = {
  default: "bg-primary-light text-primary-dark",
  veg: "bg-green-50 text-veg border border-green-200",
  "non-veg": "bg-red-50 text-non-veg border border-red-200",
  success: "bg-green-50 text-success",
  warning: "bg-amber-50 text-amber-700",
  muted: "bg-stone-100 text-muted",
};

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
