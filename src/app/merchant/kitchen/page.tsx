"use client";

import { useState } from "react";
import { MerchantShell } from "@/components/layout/merchant-shell";
import { Button } from "@/components/ui/button";
import { MERCHANT_ORDERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const STATUS_FLOW: OrderStatus[] = ["PLACED", "PREPARING", "READY"];

function nextStatus(current: OrderStatus): OrderStatus | null {
  const idx = STATUS_FLOW.indexOf(current);
  if (idx < 0 || idx >= STATUS_FLOW.length - 1) return null;
  return STATUS_FLOW[idx + 1];
}

export default function KitchenPage() {
  const [tickets, setTickets] = useState(MERCHANT_ORDERS);

  const updateStatus = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next = nextStatus(t.status);
        return next ? { ...t, status: next } : t;
      }),
    );
  };

  const sorted = [...tickets]
    .filter((t) => t.status !== "COMPLETED")
    .sort((a, b) => a.elapsedMinutes - b.elapsedMinutes);

  return (
    <MerchantShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Kitchen Display</h1>
          <p className="text-sm text-muted">Oldest orders first · Tap to update status</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sorted.map((ticket) => {
            const next = nextStatus(ticket.status);
            const urgent = ticket.elapsedMinutes >= 25;
            const warning = ticket.elapsedMinutes >= 15;

            return (
              <div
                key={ticket.id}
                className={cn(
                  "p-5 rounded-2xl bg-card border-2 shadow-sm space-y-3 transition-colors",
                  urgent
                    ? "border-non-veg bg-red-50/50"
                    : warning
                      ? "border-amber-400 bg-amber-50/30"
                      : "border-border",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold">{ticket.orderNumber}</span>
                  <span
                    className={cn(
                      "text-sm font-bold",
                      urgent ? "text-non-veg" : warning ? "text-amber-600" : "text-muted",
                    )}
                  >
                    {ticket.elapsedMinutes} min
                  </span>
                </div>

                <div className="flex gap-2">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-stone-100">
                    {ticket.type === "DINE_IN" ? `T${ticket.tableNumber}` : "TAKEAWAY"}
                  </span>
                  {ticket.pickupCode && (
                    <span className="text-xs font-bold px-2 py-1 rounded bg-primary-light text-primary-dark">
                      #{ticket.pickupCode}
                    </span>
                  )}
                </div>

                <ul className="space-y-1">
                  {ticket.items.map((item) => (
                    <li key={item} className="text-sm font-medium">
                      {item}
                    </li>
                  ))}
                </ul>

                {ticket.notes && (
                  <p className="text-xs font-semibold text-amber-800 bg-amber-100 p-2 rounded-lg">
                    {ticket.notes}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold uppercase text-muted">
                    {ticket.status}
                  </span>
                  {next && (
                    <Button size="sm" onClick={() => updateStatus(ticket.id)}>
                      Mark {next}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MerchantShell>
  );
}
