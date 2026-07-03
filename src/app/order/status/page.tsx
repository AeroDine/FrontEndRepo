"use client";

import Link from "next/link";
import {
  Bell,
  Check,
  ChevronLeft,
  ChefHat,
  RefreshCw,
  Share2,
} from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { DEMO_RESTAURANT } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const TIMELINE = [
  { label: "Order Received", time: "12:42 PM", done: true },
  { label: "Preparing", time: "Est. 12:55 PM", active: true },
  { label: "Ready / Served", time: "Pending", pending: true },
];

export default function OrderStatusPage() {
  return (
    <MobileShell showNav={false}>
      <header className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <Link href="/order/menu" className="p-2 -ml-1">
          <ChevronLeft size={22} />
        </Link>
        <h1 className="font-bold text-lg flex-1 text-center">Order #8463</h1>
        <button type="button" className="p-2" aria-label="Share">
          <Share2 size={20} />
        </button>
      </header>

      <div className="flex-1 px-5 py-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold">Preparing your order</h2>
            <p className="text-sm text-muted mt-1">
              Table {DEMO_RESTAURANT.tableNumber} • Dine-in
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
            <ChefHat size={28} />
          </div>
        </div>

        <div className="space-y-0">
          {TIMELINE.map((step, i) => (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.done
                      ? "bg-customer-accent text-white"
                      : step.active
                        ? "border-2 border-customer-accent bg-white"
                        : "border-2 border-zinc-200 bg-white"
                  }`}
                >
                  {step.done && <Check size={14} />}
                  {step.active && (
                    <span className="w-2 h-2 rounded-full bg-customer-accent" />
                  )}
                </div>
                {i < TIMELINE.length - 1 && (
                  <div
                    className={`w-0.5 flex-1 min-h-10 ${
                      step.done ? "bg-customer-accent" : "bg-zinc-200"
                    }`}
                  />
                )}
              </div>
              <div className="pb-6">
                <p
                  className={`font-semibold ${
                    step.active ? "text-customer-accent" : ""
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-sm text-muted">{step.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" fullWidth className="rounded-2xl">
            <Bell size={18} />
            Call Server
          </Button>
          <Button variant="black" fullWidth className="rounded-2xl">
            <RefreshCw size={18} />
            Reorder
          </Button>
        </div>

        <div className="p-4 rounded-2xl bg-green-50 border border-green-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-customer-accent text-white flex items-center justify-center">
            <Check size={20} />
          </div>
          <div>
            <p className="font-bold text-green-900">Payment Confirmed</p>
            <p className="text-sm text-green-700">Paid with Apple Pay • {formatCurrency(4210)}</p>
          </div>
        </div>

        <section>
          <h3 className="font-bold mb-3">Receipt Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>1 Classic Burger</span>
              <span>{formatCurrency(1850)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-border">
              <span>Total</span>
              <span>{formatCurrency(4210)}</span>
            </div>
          </div>
        </section>
      </div>
    </MobileShell>
  );
}
