import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CustomerBottomNav } from "./customer-bottom-nav";

export function MobileShell({
  children,
  className,
  showNav = true,
}: {
  children: ReactNode;
  className?: string;
  showNav?: boolean;
}) {
  return (
    <div className={cn("mobile-shell flex flex-col min-h-dvh", className)}>
      <div className={cn("flex-1 flex flex-col", showNav && "pb-16")}>
        {children}
      </div>
      {showNav && <CustomerBottomNav />}
    </div>
  );
}
