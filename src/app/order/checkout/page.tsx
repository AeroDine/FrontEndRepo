"use client";

import Link from "next/link";
import { ChevronLeft, CreditCard, MoreVertical, Plus, Smartphone, Tag } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/lib/utils";

const PAYMENT_METHODS = [
  { id: "card", label: "Master Card", detail: "******** 8463", icon: "💳" },
  { id: "paypal", label: "PayPal", detail: "******** 8463", icon: "P" },
  { id: "apple", label: "Apple Pay", detail: "******** 8463", icon: "" },
  { id: "counter", label: "Pay at Counter", detail: "Cash or Card", icon: "🏪" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const total = useCartStore((s) => s.subtotal());
  const [selected, setSelected] = useState("card");
  const [promo, setPromo] = useState("SUMMER20");

  return (
    <MobileShell showNav={false}>
      <header className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <Link href="/order/cart" className="p-2 -ml-1">
          <ChevronLeft size={22} />
        </Link>
        <h1 className="font-bold text-lg flex-1 text-center">Checkout</h1>
        <button type="button" className="p-2" aria-label="More">
          <MoreVertical size={20} />
        </button>
      </header>

      <div className="flex-1 px-4 py-6 space-y-6 pb-28">
        <section>
          <h2 className="font-bold mb-4">Select Payment Method</h2>
          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelected(method.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-colors ${
                  selected === method.id
                    ? "border-customer-primary bg-zinc-50"
                    : "border-border"
                }`}
              >
                <span className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-lg font-bold">
                  {method.id === "card" ? <CreditCard size={20} /> : method.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{method.label}</p>
                  <p className="text-xs text-muted">{method.detail}</p>
                </div>
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selected === method.id
                      ? "border-customer-primary"
                      : "border-zinc-300"
                  }`}
                >
                  {selected === method.id && (
                    <span className="w-2.5 h-2.5 rounded-full bg-customer-primary" />
                  )}
                </span>
              </button>
            ))}
          </div>
          <Button variant="outline" fullWidth className="mt-3 rounded-2xl bg-zinc-50">
            <Plus size={18} />
            Add Payment Method
          </Button>
        </section>

        <section>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <Input
                id="promo"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="pl-10"
                placeholder="Promo code"
              />
            </div>
            <Button variant="black" className="shrink-0 px-6 rounded-xl">
              Apply
            </Button>
          </div>
        </section>
      </div>

      <div className="p-4 border-t border-border">
        <Button
          variant="black"
          size="lg"
          fullWidth
          className="rounded-2xl"
          onClick={() => router.push("/order/status")}
        >
          Pay {formatCurrency(total)}
        </Button>
      </div>
    </MobileShell>
  );
}
