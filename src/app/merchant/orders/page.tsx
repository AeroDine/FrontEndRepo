"use client";

import { Bell, Plus, Search, SlidersHorizontal } from "lucide-react";
import { MerchantShell } from "@/components/layout/merchant-shell";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const COLUMNS = [
  {
    title: "NEW ORDERS",
    count: 2,
    color: "bg-red-100 text-red-800",
    orders: [
      {
        id: "ORD-8824",
        type: "Dine-in",
        table: "T4",
        time: "2 mins ago",
        sla: "14:00",
        total: 850,
        items: ["2x Paneer Butter Masala", "4x Butter Naan", "1x Fresh Lime Soda"],
        note: "Make the paneer extra spicy, no ice in soda.",
      },
      {
        id: "ORD-8825",
        type: "Takeaway",
        time: "5 mins ago",
        sla: "20:00",
        total: 450,
        items: ["1x Veg Biryani", "2x Gulab Jamun"],
        tags: ["Paid via UPI", "Zomato"],
      },
    ],
  },
  {
    title: "PREPARING",
    count: 3,
    color: "bg-amber-100 text-amber-800",
    orders: [
      {
        id: "ORD-8822",
        type: "Dine-in",
        table: "T12",
        time: "12 mins ago",
        status: "Cooking",
        items: ["~~2x Tomato Soup~~", "1x Tandoori Chicken (Half)"],
      },
    ],
  },
  {
    title: "READY",
    count: 1,
    color: "bg-green-100 text-green-800",
    orders: [
      {
        id: "ORD-8820",
        type: "Takeaway",
        time: "25 mins ago",
        status: "Ready for Pickup",
        rider: "Rider Assigned — Arriving in 2 mins",
        packed: "3 items packed",
      },
    ],
  },
];

export default function OrdersPage() {
  return (
    <MerchantShell>
      <div className="p-6 lg:p-8 space-y-6 min-h-screen">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Active Orders</h1>
            <select className="text-sm text-muted mt-1 bg-transparent">
              <option>AeroDine Cafe — Downtown</option>
            </select>
          </div>
          <button type="button" className="p-2.5 rounded-xl border border-border bg-white">
            <Bell size={20} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1 p-1 bg-white rounded-xl border border-border">
            {["All Orders (24)", "Dine-in (18)", "Takeaway (6)"].map((tab, i) => (
              <button
                key={tab}
                type="button"
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  i === 0 ? "bg-zinc-100" : "text-muted"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-48 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              placeholder="Search order ID, table..."
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-border text-sm"
            />
          </div>
          <Button variant="outline" size="sm">
            <SlidersHorizontal size={16} />
            Filter
          </Button>
          <Button size="sm">
            <Plus size={16} />
            New Order
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 pb-20">
          {COLUMNS.map((col) => (
            <div key={col.title} className="space-y-3">
              <div className={`px-3 py-2 rounded-lg text-xs font-bold ${col.color}`}>
                {col.title} ({col.count})
              </div>
              {col.orders.map((order) => (
                <div key={order.id} className="p-4 rounded-2xl bg-white border border-border space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm">#{order.id}</p>
                      <p className="text-xs text-muted">
                        {"table" in order && order.table
                          ? `Table ${order.table}`
                          : order.type}{" "}
                        · {order.time}
                      </p>
                    </div>
                    {"total" in order && (
                      <span className="font-bold text-sm">{formatCurrency(order.total)}</span>
                    )}
                  </div>
                  {"items" in order && (
                    <ul className="text-xs space-y-1 text-muted">
                      {order.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {"note" in order && order.note && (
                    <p className="text-xs p-2 rounded-lg bg-amber-50 text-amber-800">{order.note}</p>
                  )}
                  {"tags" in order && order.tags && (
                    <div className="flex gap-2">
                      {order.tags.map((t) => (
                        <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {"rider" in order && (
                    <p className="text-xs p-2 rounded-lg bg-zinc-50">{order.rider}</p>
                  )}
                  <div className="flex gap-2">
                    {col.title === "NEW ORDERS" && (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">Reject</Button>
                        <Button size="sm" className="flex-1">Accept & Print</Button>
                      </>
                    )}
                    {col.title === "PREPARING" && (
                      <Button variant="outline" size="sm" fullWidth>Mark Ready</Button>
                    )}
                    {col.title === "READY" && (
                      <Button variant="customer" size="sm" fullWidth>Handed Over</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 lg:left-60 right-0 p-4 bg-white border-t border-border flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            Select All (0 selected)
          </label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Cancel Orders</Button>
            <Button variant="outline" size="sm" disabled>Print KOTs</Button>
          </div>
        </div>
      </div>
    </MerchantShell>
  );
}
