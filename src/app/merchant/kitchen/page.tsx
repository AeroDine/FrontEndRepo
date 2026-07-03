"use client";

import { MerchantShell } from "@/components/layout/merchant-shell";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const COLUMNS = [
  {
    title: "NEW",
    count: 4,
    badge: "bg-red-500",
    orders: [
      {
        id: "8824",
        meta: "Table T4 · Dine-in · Server: Amit",
        timer: "04:20",
        timerColor: "text-red-500",
        items: [
          { name: "2x Paneer Butter Masala", tags: ["Extra Spicy", "Dairy"] },
          { name: "4x Butter Naan", tags: [] },
        ],
      },
      {
        id: "8825",
        meta: "Takeaway · Zomato",
        timer: "01:15",
        timerColor: "text-red-400",
        items: [{ name: "1x Veg Biryani", tags: [] }],
      },
    ],
  },
  {
    title: "PREPARING",
    count: 2,
    badge: "bg-amber-500",
    orders: [
      {
        id: "8822",
        meta: "Table T12 · Dine-in · Server: Priya",
        timer: "12:45",
        timerColor: "text-amber-400",
        items: [
          { name: "2x Tomato Soup", done: true },
          { name: "1x Tandoori Chicken (Half)", tags: ["Station: Tandoor"] },
        ],
      },
    ],
  },
  {
    title: "READY",
    count: 1,
    badge: "bg-green-500",
    orders: [
      {
        id: "8820",
        meta: "Takeaway · Swiggy",
        status: "Waiting",
        completed: true,
      },
    ],
  },
];

export default function KitchenPage() {
  return (
    <MerchantShell dark>
      <div className="p-6 space-y-6 min-h-screen text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Kitchen Display</h1>
            <select className="text-sm text-zinc-400 mt-1 bg-transparent">
              <option>AeroDine Cafe — Downtown</option>
            </select>
          </div>
          <div className="flex gap-2">
            {["All Stations", "Tandoor", "Pantry", "Bar"].map((s, i) => (
              <button
                key={s}
                type="button"
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  i === 0 ? "bg-primary text-white" : "bg-merchant-card text-zinc-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 pb-16">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold">{col.title}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${col.badge}`}>
                  {col.count}
                </span>
              </div>
              <div className="space-y-3">
                {col.orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-merchant-card border border-white/5 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">#{order.id}</p>
                        <p className="text-xs text-zinc-400">{order.meta}</p>
                      </div>
                      {"timer" in order && (
                        <span className={`font-mono font-bold ${order.timerColor}`}>
                          {order.timer}
                        </span>
                      )}
                      {"status" in order && (
                        <span className="text-xs bg-zinc-700 px-2 py-1 rounded">{order.status}</span>
                      )}
                    </div>
                    {"items" in order &&
                      order.items.map((item) => (
                        <div
                          key={item.name}
                          className={`text-sm ${"done" in item && item.done ? "line-through text-zinc-500" : ""}`}
                        >
                          <div className="flex items-center gap-2">
                            {"done" in item && item.done && <Check size={14} className="text-green-500" />}
                            {item.name}
                          </div>
                          {"tags" in item &&
                            item.tags?.map((t) => (
                              <span
                                key={t}
                                className="inline-block mt-1 mr-1 text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300"
                              >
                                {t}
                              </span>
                            ))}
                        </div>
                      ))}
                    {"completed" in order && order.completed && (
                      <div className="text-center py-6">
                        <Check size={40} className="mx-auto text-green-500 mb-2" />
                        <p className="font-semibold text-green-400">Order Completed</p>
                      </div>
                    )}
                    {col.title === "NEW" && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 border-zinc-600 text-zinc-300">
                          Recall
                        </Button>
                        <Button size="sm" className="flex-1">Start Preparing</Button>
                      </div>
                    )}
                    {col.title === "PREPARING" && (
                      <Button variant="customer" size="sm" fullWidth>
                        BUMP TO READY
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 lg:left-60 right-0 p-4 bg-merchant-sidebar border-t border-white/10 flex items-center justify-between text-sm">
          <span className="text-green-400 font-medium">● Kitchen Active</span>
          <span className="text-zinc-400">Completed Today: 42</span>
          <Button variant="outline" size="sm" className="border-zinc-600 text-zinc-300">
            Print Last KOT
          </Button>
        </div>
      </div>
    </MerchantShell>
  );
}
