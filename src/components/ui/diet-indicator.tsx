import { cn } from "@/lib/utils";
import type { DietType } from "@/types";

export function DietIndicator({
  diet,
  size = "sm",
}: {
  diet: DietType;
  size?: "sm" | "md";
}) {
  const isVeg = diet === "veg";
  const box = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const dot = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border-2 rounded-sm shrink-0",
        box,
        isVeg ? "border-veg" : "border-non-veg",
      )}
      title={isVeg ? "Vegetarian" : diet === "egg" ? "Contains egg" : "Non-vegetarian"}
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span
        className={cn("rounded-full", dot, isVeg ? "bg-veg" : "bg-non-veg")}
      />
    </span>
  );
}
