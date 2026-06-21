"use client";

import { useState } from "react";
import { MerchantShell } from "@/components/layout/merchant-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MERCHANT_ORDERS } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";

export default function OrdersPage() {
  const [filter, setFilter] = useState<"ALL" | "DINE_IN" | "TAKEAWAY">("ALL");
  const orders = MERCHANT_ORDERS.filter(
    (o) => filter === "ALL" || o.type === filter,
  );

  return (
    <MerchantShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Active Orders</h1>
          <div className="flex gap-2">
            {(["ALL", "DINE_IN", "TAKEAWAY"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors",
                  filter === f
                    ? "bg-primary text-white"
                    : "bg-stone-100 text-muted hover:bg-stone-200",
                )}
              >
                {f === "ALL" ? "All" : f === "DINE_IN" ? "Dine-in" : "Takeaway"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-lg">{order.orderNumber}</p>
                  <p className="text-sm text-muted">
                    {order.type === "DINE_IN"
                      ? `Table ${order.tableNumber}`
                      : `Pickup · ${order.pickupCode}`}
                  </p>
                </div>
                <Badge
                  variant={
                    order.elapsedMinutes >= 25
                      ? "non-veg"
                      : order.elapsedMinutes >= 15
                        ? "warning"
                        : "default"
                  }
                >
                  {order.elapsedMinutes}m
                </Badge>
              </div>

              <ul className="text-sm space-y-1">
                {order.items.map((item) => (
                  <li key={item} className="text-muted">
                    · {item}
                  </li>
                ))}
              </ul>

              {order.notes && (
                <p className="text-xs p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                  Note: {order.notes}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Badge variant={order.status === "READY" ? "success" : "warning"}>
                  {order.status}
                </Badge>
                <span className="font-bold">{formatCurrency(order.total)}</span>
              </div>

              {order.type === "TAKEAWAY" && order.status === "READY" && (
                <Button size="sm" fullWidth>
                  Handover Complete
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </MerchantShell>
  );
}
