"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { DietIndicator } from "@/components/ui/diet-indicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DEMO_RESTAURANT,
  MENU_CATEGORIES,
  getCategoryItems,
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const itemCount = useCartStore((s) => s.itemCount());
  const items = getCategoryItems(activeCategory);

  return (
    <MobileShell>
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-bold text-lg">{DEMO_RESTAURANT.name}</h1>
            <p className="text-xs text-muted">Table {DEMO_RESTAURANT.tableNumber}</p>
          </div>
          <Link
            href="/order/cart"
            className="relative p-2.5 rounded-xl bg-primary-light text-primary"
          >
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                activeCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-stone-100 text-muted hover:bg-stone-200",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 px-4 py-4 space-y-4 pb-28">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.isAvailable ? `/order/item/${item.id}` : "#"}
            className={cn(
              "flex gap-3 p-3 rounded-2xl border border-border bg-card transition-shadow",
              item.isAvailable
                ? "hover:shadow-md active:scale-[0.99]"
                : "opacity-60 pointer-events-none",
            )}
          >
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-start gap-2">
                <DietIndicator diet={item.diet} />
                <h3 className="font-semibold text-foreground leading-tight flex-1">
                  {item.name}
                </h3>
              </div>
              <p className="text-xs text-muted line-clamp-2 mt-1">{item.description}</p>
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="font-bold text-primary">
                  {formatCurrency(item.price)}
                </span>
                {!item.isAvailable ? (
                  <Badge variant="muted">Unavailable</Badge>
                ) : (
                  <span className="text-xs font-semibold text-primary">Add +</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {itemCount > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 bg-gradient-to-t from-card via-card to-transparent">
          <Link href="/order/cart">
            <Button size="lg" fullWidth>
              View Cart ({itemCount} items)
            </Button>
          </Link>
        </div>
      )}
    </MobileShell>
  );
}
