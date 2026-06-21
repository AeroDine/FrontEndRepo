import { cn } from "@/lib/utils";
import { UtensilsCrossed } from "lucide-react";

export function AeroDineLogo({
  className,
  showTagline = false,
  size = "md",
}: {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const iconSize = size === "sm" ? 20 : size === "lg" ? 32 : 24;
  const textSize =
    size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-xl";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
        <UtensilsCrossed size={iconSize} strokeWidth={2.5} />
      </div>
      <div>
        <span className={cn("font-extrabold tracking-tight text-foreground", textSize)}>
          Aero<span className="text-primary">Dine</span>
        </span>
        {showTagline && (
          <p className="text-xs text-muted font-medium">QR Restaurant Ordering</p>
        )}
      </div>
    </div>
  );
}
