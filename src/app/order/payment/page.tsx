"use client";

import Link from "next/link";
import { ArrowLeft, CreditCard, Smartphone } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { GST_RATE } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

type PaymentMethod = "upi" | "card";

export default function PaymentPage() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const tax = Math.round(subtotal * GST_RATE);
  const total = subtotal + tax;

  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [processing, setProcessing] = useState(false);

  const handlePay = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1800));
    clearCart();
    router.push("/order/status?order=ORD-0042");
  };

  if (lines.length === 0 && !processing) {
    return (
      <MobileShell className="items-center justify-center p-6">
        <p className="text-muted mb-4">Nothing to pay</p>
        <Link href="/order/menu">
          <Button>Back to Menu</Button>
        </Link>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <header className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <Link href="/order/checkout" className="p-2 -ml-2 rounded-lg hover:bg-stone-100">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-bold text-lg">Payment</h1>
      </header>

      <div className="flex-1 px-4 py-6 space-y-6">
        <div className="text-center py-4">
          <p className="text-sm text-muted">Amount to pay</p>
          <p className="text-4xl font-extrabold text-primary mt-1">
            {formatCurrency(total)}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Choose payment method</h2>
          {[
            {
              id: "upi" as const,
              icon: Smartphone,
              title: "UPI",
              desc: "PhonePe, GPay, Paytm, BHIM",
            },
            {
              id: "card" as const,
              icon: CreditCard,
              title: "Debit / Credit Card",
              desc: "Secured by Razorpay",
            },
          ].map(({ id, icon: Icon, title, desc }) => (
            <button
              key={id}
              type="button"
              onClick={() => setMethod(id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-colors",
                method === id
                  ? "border-primary bg-primary-light/40"
                  : "border-border hover:border-primary/30",
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  method === id ? "bg-primary text-white" : "bg-stone-100 text-muted",
                )}
              >
                <Icon size={24} />
              </div>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-xs text-muted">{desc}</p>
              </div>
            </button>
          ))}
        </div>

        {method === "upi" && (
          <div className="p-4 rounded-2xl bg-stone-50 border border-border text-center space-y-2">
            <div className="w-32 h-32 mx-auto bg-white rounded-xl border-2 border-dashed border-border flex items-center justify-center text-xs text-muted">
              UPI QR
            </div>
            <p className="text-xs text-muted">
              Scan with any UPI app or tap Proceed to simulate payment
            </p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border space-y-2">
        <Button size="lg" fullWidth onClick={handlePay} disabled={processing}>
          {processing ? "Processing..." : `Pay ${formatCurrency(total)}`}
        </Button>
        <p className="text-center text-[10px] text-muted">
          Powered by Razorpay · Your payment is secure
        </p>
      </div>
    </MobileShell>
  );
}
