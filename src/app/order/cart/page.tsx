"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Clock, Minus, Plus, Trash2, UtensilsCrossed } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { DEMO_RESTAURANT } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { getMenuItem } from "@/lib/mock-data";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const total = useCartStore((s) => s.subtotal());

  return (
    <MobileShell>
      <header className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <Link href="/order/menu" className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="font-bold text-lg flex-1 text-center pr-10">Review Order</h1>
      </header>

      <div className="flex-1 px-4 py-4 space-y-4 pb-28">
        <div className="p-4 rounded-2xl border border-border bg-zinc-50 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-medium">
              <UtensilsCrossed size={16} />
              Table {DEMO_RESTAURANT.tableNumber}
            </span>
            <span className="flex items-center gap-2 text-customer-accent font-medium">
              <Clock size={16} />
              15–20 min
            </span>
          </div>
          <Link href="/order/menu">
            <Button variant="outline" fullWidth className="rounded-xl bg-white">
              + Add more items
            </Button>
          </Link>
        </div>

        <h2 className="font-bold">Your Items</h2>

        {lines.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-muted">Your cart is empty</p>
            <Link href="/order/menu">
              <Button variant="outline">Browse Menu</Button>
            </Link>
          </div>
        ) : (
          lines.map((line) => {
            const item = getMenuItem(line.itemId);
            return (
              <div
                key={line.id}
                className="p-4 rounded-2xl border border-border flex gap-3"
              >
                {item && (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <Image src={item.imageUrl} alt={line.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{line.name}</h3>
                  {line.variantName && (
                    <p className="text-xs text-muted">{line.variantName}</p>
                  )}
                  <button type="button" className="text-xs text-primary font-medium mt-0.5">
                    Edit
                  </button>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold">{formatCurrency(line.unitPrice * line.quantity)}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        className="p-1.5 text-muted"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="flex items-center gap-2 border border-border rounded-lg px-1">
                        <button type="button" onClick={() => updateQuantity(line.id, line.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{line.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(line.id, line.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {lines.length > 0 && (
        <div className="fixed bottom-16 inset-x-0 z-20 max-w-[430px] mx-auto px-4">
          <Link href="/order/checkout">
            <Button variant="black" size="lg" fullWidth className="rounded-2xl">
              <span className="flex-1 text-left">Proceed to Payment</span>
              <span>{formatCurrency(total)}</span>
            </Button>
          </Link>
        </div>
      )}
    </MobileShell>
  );
}
