"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { DietIndicator } from "@/components/ui/diet-indicator";
import { GST_RATE } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const subtotal = useCartStore((s) => s.subtotal());
  const tax = Math.round(subtotal * GST_RATE);
  const total = subtotal + tax;

  return (
    <MobileShell>
      <header className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <Link href="/order/menu" className="p-2 -ml-2 rounded-lg hover:bg-stone-100">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-bold text-lg">Your Cart</h1>
      </header>

      <div className="flex-1 px-4 py-4 space-y-3">
        {lines.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-muted">Your cart is empty</p>
            <Link href="/order/menu">
              <Button variant="secondary">Browse Menu</Button>
            </Link>
          </div>
        ) : (
          lines.map((line) => (
            <div
              key={line.id}
              className="p-4 rounded-2xl border border-border bg-card space-y-2"
            >
              <div className="flex items-start gap-2">
                <DietIndicator diet={line.diet} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{line.name}</h3>
                  {line.variantName && (
                    <p className="text-xs text-muted">{line.variantName}</p>
                  )}
                  {line.addOnNames.length > 0 && (
                    <p className="text-xs text-muted">
                      + {line.addOnNames.join(", ")}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  className="p-1.5 text-muted hover:text-danger"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => updateQuantity(line.id, line.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(line.id, line.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="font-bold">
                  {formatCurrency(line.unitPrice * line.quantity)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {lines.length > 0 && (
        <div className="p-4 border-t border-border space-y-4 bg-card">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">GST (5%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
          <Link href="/order/checkout">
            <Button size="lg" fullWidth>
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      )}
    </MobileShell>
  );
}
