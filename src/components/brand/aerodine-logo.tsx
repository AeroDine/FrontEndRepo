import { cn } from "@/lib/utils";
import { UtensilsCrossed } from "lucide-react";

export function AeroDineLogo({
  className,
  showTagline = false,
  size = "md",
  variant = "default",
}: {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light" | "dark";
}) {
  const iconSize = size === "sm" ? 18 : size === "lg" ? 28 : 22;
  const textSize =
    size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";
  const isLight = variant === "light";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-lg",
          size === "sm" ? "w-8 h-8" : size === "lg" ? "w-11 h-11" : "w-9 h-9",
          isLight
            ? "bg-white/10 text-white"
            : "bg-primary text-white shadow-sm",
        )}
      >
        <UtensilsCrossed size={iconSize} strokeWidth={2.5} />
      </div>
      <div>
        <span
          className={cn(
            "font-bold tracking-tight",
            textSize,
            isLight ? "text-white" : "text-foreground",
          )}
        >
          AeroDine
        </span>
        {showTagline && (
          <p
            className={cn(
              "text-xs font-medium",
              isLight ? "text-white/70" : "text-muted",
            )}
          >
            QR Restaurant Ordering
          </p>
        )}
      </div>
    </div>
  );
}
