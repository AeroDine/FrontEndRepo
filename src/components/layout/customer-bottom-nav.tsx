"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/order/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/order/cart", label: "Cart", icon: ShoppingBag },
];

export function CustomerBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 max-w-[430px] mx-auto bg-white border-t border-border px-8 py-3 flex justify-around">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-0.5 text-[11px] font-medium",
              active ? "text-foreground" : "text-muted",
            )}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
