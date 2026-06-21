"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChefHat,
  ClipboardList,
  LayoutDashboard,
  Menu,
  Settings,
  UtensilsCrossed,
  BarChart3,
} from "lucide-react";
import { AeroDineLogo } from "@/components/brand/aerodine-logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/merchant/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/merchant/orders", label: "Active Orders", icon: ClipboardList },
  { href: "/merchant/kitchen", label: "Kitchen", icon: ChefHat },
  { href: "/merchant/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/merchant/reports", label: "Reports", icon: BarChart3 },
  { href: "/merchant/settings", label: "Settings", icon: Settings },
];

export function MerchantShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-stone-100 lg:flex">
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <AeroDineLogo showTagline />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-light text-primary-dark"
                    : "text-muted hover:bg-stone-50 hover:text-foreground",
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-64 flex-1 flex flex-col min-h-screen">
        <header className="lg:hidden sticky top-0 z-20 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <AeroDineLogo size="sm" />
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-stone-100"
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>
        </header>

        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-card border-t border-border px-2 py-2 flex justify-around">
          {navItems.slice(0, 5).map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium min-w-14",
                  active ? "text-primary" : "text-muted",
                )}
              >
                <Icon size={20} />
                {label.split(" ")[0]}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">{children}</main>
      </div>
    </div>
  );
}
