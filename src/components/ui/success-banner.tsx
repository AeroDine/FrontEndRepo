import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SuccessBanner({
  title,
  message,
  className,
}: {
  title: string;
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900",
        className,
      )}
    >
      <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-sm">{title}</p>
        {message && <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">{message}</p>}
      </div>
    </div>
  );
}
