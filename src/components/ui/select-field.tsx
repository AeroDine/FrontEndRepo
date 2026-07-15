import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, label, error, id, children, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={cn(
          "w-full h-11 px-4 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-shadow appearance-none",
          "bg-[length:16px] bg-[right_12px_center] bg-no-repeat",
          "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%2371717a%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22m4 6 4 4 4-4%22/%3E%3C/svg%3E')]",
          error && "border-danger focus:ring-danger/30",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  ),
);

SelectField.displayName = "SelectField";
