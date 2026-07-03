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
  { href: "/merchant/kitchen", label: "KDS", icon: ChefHat },
  { href: "/merchant/menu", label: "Menu Management", icon: UtensilsCrossed },
  { href: "/merchant/reports", label: "Order History & Reports", icon: BarChart3 },
  { href: "/merchant/settings", label: "Settings & Subscription", icon: Settings },
];

export function MerchantShell({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "min-h-screen flex",
        dark ? "bg-merchant-surface text-white" : "bg-zinc-100",
      )}
    >
      <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:fixed lg:inset-y-0 bg-merchant-sidebar text-white">
        <div className="p-5 border-b border-white/10">
          <AeroDineLogo variant="light" size="sm" />
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-white"
                    : "text-zinc-400 hover:bg-merchant-sidebar-hover hover:text-white",
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-600 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">Rahul S.</p>
            <p className="text-xs text-zinc-500">Owner</p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-60 flex-1 flex flex-col min-h-screen">
        <header className="lg:hidden sticky top-0 z-20 bg-merchant-sidebar text-white px-4 py-3 flex items-center justify-between">
          <AeroDineLogo variant="light" size="sm" />
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-white/10"
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
