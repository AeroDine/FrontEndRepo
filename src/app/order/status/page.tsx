"use client";

import Link from "next/link";
import { CheckCircle2, Clock, ChefHat, Flame } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DEMO_RESTAURANT } from "@/lib/mock-data";
import type { OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

const STEPS: { status: OrderStatus; label: string; icon: typeof Clock }[] = [
  { status: "PLACED", label: "Order placed", icon: CheckCircle2 },
  { status: "PREPARING", label: "Preparing", icon: ChefHat },
  { status: "READY", label: "Ready to serve", icon: Flame },
  { status: "COMPLETED", label: "Completed", icon: CheckCircle2 },
];

function StatusContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") ?? "ORD-0042";
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>("PLACED");

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStatus("PREPARING"), 4000),
      setTimeout(() => setCurrentStatus("READY"), 12000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const currentIndex = STEPS.findIndex((s) => s.status === currentStatus);

  return (
    <MobileShell>
      <div className="flex-1 px-6 py-8 space-y-8 animate-slide-up">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 text-success flex items-center justify-center">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="text-2xl font-extrabold">Order Confirmed!</h1>
          <p className="text-muted text-sm">
            {DEMO_RESTAURANT.name} · Table {DEMO_RESTAURANT.tableNumber}
          </p>
          <Badge variant="success" className="text-sm px-3 py-1">
            {orderNumber}
          </Badge>
        </div>

        <div className="p-5 rounded-2xl bg-stone-50 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Live order status</h2>
            <span className="text-xs text-muted animate-pulse-soft">Updating live</span>
          </div>
          <div className="space-y-4">
            {STEPS.map((step, index) => {
              const done = index <= currentIndex;
              const active = index === currentIndex;
              const Icon = step.icon;
              return (
                <div key={step.status} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      done
                        ? active
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : "bg-success text-white"
                        : "bg-stone-200 text-muted",
                    )}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p
                      className={cn(
                        "font-semibold text-sm",
                        done ? "text-foreground" : "text-muted",
                      )}
                    >
                      {step.label}
                    </p>
                    {active && currentStatus !== "COMPLETED" && (
                      <p className="text-xs text-primary font-medium">
                        Estimated ~15 min
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border text-sm space-y-2">
          <p className="font-semibold">What&apos;s next?</p>
          <p className="text-muted text-xs leading-relaxed">
            Your order is being prepared. You&apos;ll receive a WhatsApp confirmation
            with your receipt. Sit back — we&apos;ll bring it to your table.
          </p>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <Button variant="outline" fullWidth size="lg">
          Share on WhatsApp
        </Button>
        <Link href="/order/welcome" className="block">
          <Button variant="ghost" fullWidth size="sm">
            Order again
          </Button>
        </Link>
      </div>
    </MobileShell>
  );
}

export default function OrderStatusPage() {
  return (
    <Suspense
      fallback={
        <MobileShell className="items-center justify-center">
          <p className="text-muted">Loading order status...</p>
        </MobileShell>
      }
    >
      <StatusContent />
    </Suspense>
  );
}
