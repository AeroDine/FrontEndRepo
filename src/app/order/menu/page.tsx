"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { DietIndicator } from "@/components/ui/diet-indicator";
import { Badge } from "@/components/ui/badge";
import {
  DEMO_RESTAURANT,
  MENU_CATEGORIES,
  MENU_ITEMS,
  getCategoryItems,
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("cat-all");
  const itemCount = useCartStore((s) => s.itemCount());
  const total = useCartStore((s) => s.subtotal());

  const items =
    activeCategory === "cat-all"
      ? MENU_ITEMS
      : getCategoryItems(activeCategory);
  const specials = MENU_ITEMS.filter((i) => i.categoryId === "cat-popular");
  const mains = MENU_ITEMS.filter((i) => i.categoryId === "cat-mains");

  return (
    <MobileShell>
      <header className="sticky top-0 z-10 bg-white border-b border-border px-5 pt-5 pb-3">
        <p className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
          {DEMO_RESTAURANT.name}
        </p>
        <div className="flex items-center justify-between mt-1">
          <h1 className="text-2xl font-extrabold">Digital Menu</h1>
          <div className="flex gap-2">
            <button type="button" className="p-2.5 rounded-full border border-border" aria-label="Search">
              <Search size={18} />
            </button>
            <button type="button" className="p-2.5 rounded-full border border-border" aria-label="Filter">
              <SlidersHorizontal size={18} />
            </button>
          </div>
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
                  ? "bg-customer-primary text-white"
                  : "bg-zinc-100 text-foreground",
              )}
            >
              {cat.name}
              {cat.name === "Popular" && " 🔥"}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 px-5 py-5 space-y-8 pb-32">
        {(activeCategory === "cat-all" || activeCategory === "cat-popular") && (
          <section>
            <h2 className="font-bold text-lg mb-3">Chef&apos;s Specials</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
              {specials.map((item) => (
                <Link
                  key={item.id}
                  href={`/order/item/${item.id}`}
                  className="shrink-0 w-72 rounded-2xl border border-border overflow-hidden bg-white shadow-sm"
                >
                  <div className="relative h-40">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    {item.rating && (
                      <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-white/95 text-xs font-bold flex items-center gap-1">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        {item.rating}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold">{item.name}</h3>
                      <span className="font-bold shrink-0">{formatCurrency(item.price)}</span>
                    </div>
                    <p className="text-xs text-muted mt-1 line-clamp-2">{item.description}</p>
                    <Badge className="mt-2" variant="default">POPULAR</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-bold text-lg mb-3">Mains</h2>
          <div className="space-y-4">
            {(activeCategory === "cat-all" ? mains : items).map((item) => (
              <Link
                key={item.id}
                href={`/order/item/${item.id}`}
                className="flex gap-4 items-center"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <DietIndicator diet={item.diet} />
                  </div>
                  <p className="text-sm font-bold mt-0.5">{formatCurrency(item.price)}</p>
                </div>
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {itemCount > 0 && (
        <div className="fixed bottom-16 inset-x-0 z-20 max-w-[430px] mx-auto px-5">
          <Link
            href="/order/cart"
            className="flex items-center justify-between bg-customer-accent text-white rounded-2xl px-5 py-4 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-sm font-bold">
                {itemCount}
              </span>
              <span className="font-bold">View Cart</span>
            </div>
            <span className="font-bold">{formatCurrency(total)}</span>
          </Link>
        </div>
      )}
    </MobileShell>
  );
}
