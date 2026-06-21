"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEMO_RESTAURANT, GST_RATE } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export default function CheckoutPage() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.subtotal());
  const tax = Math.round(subtotal * GST_RATE);
  const total = subtotal + tax;

  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [optOutSms, setOptOutSms] = useState(false);

  const handleContinue = () => {
    if (phone.length < 10) return;
    sessionStorage.setItem(
      "aerodine-checkout",
      JSON.stringify({ phone, notes, optOutSms }),
    );
    router.push("/order/payment");
  };

  if (lines.length === 0) {
    return (
      <MobileShell className="items-center justify-center p-6">
        <p className="text-muted mb-4">Cart is empty</p>
        <Link href="/order/menu">
          <Button>Back to Menu</Button>
        </Link>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <header className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <Link href="/order/cart" className="p-2 -ml-2 rounded-lg hover:bg-stone-100">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-bold text-lg">Checkout</h1>
      </header>

      <div className="flex-1 px-4 py-5 space-y-5 overflow-y-auto">
        <div className="p-4 rounded-2xl bg-primary-light/50 border border-primary/20">
          <p className="text-xs font-semibold text-primary-dark uppercase tracking-wide">
            Dine-in · Table {DEMO_RESTAURANT.tableNumber}
          </p>
          <p className="text-sm text-muted mt-1">{DEMO_RESTAURANT.name}</p>
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold text-sm">Order summary</h2>
          {lines.map((line) => (
            <div key={line.id} className="flex justify-between text-sm">
              <span className="text-muted">
                {line.quantity}× {line.name}
                {line.variantName ? ` (${line.variantName})` : ""}
              </span>
              <span className="font-medium">
                {formatCurrency(line.unitPrice * line.quantity)}
              </span>
            </div>
          ))}
          <div className="pt-2 border-t border-border space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">GST</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <Input
          id="phone"
          label="Phone number"
          type="tel"
          placeholder="10-digit mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
        />

        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-1.5">
            Special notes (optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Less spicy, no onion..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
          <input
            type="checkbox"
            checked={optOutSms}
            onChange={(e) => setOptOutSms(e.target.checked)}
            className="accent-primary"
          />
          Opt out of SMS/WhatsApp notifications
        </label>
      </div>

      <div className="p-4 border-t border-border">
        <Button
          size="lg"
          fullWidth
          disabled={phone.length < 10}
          onClick={handleContinue}
        >
          Continue to Pay · {formatCurrency(total)}
        </Button>
      </div>
    </MobileShell>
  );
}
