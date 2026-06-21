"use client";

import Image from "next/image";
import { Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { MerchantShell } from "@/components/layout/merchant-shell";
import { Button } from "@/components/ui/button";
import { DietIndicator } from "@/components/ui/diet-indicator";
import { Badge } from "@/components/ui/badge";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function MenuManagementPage() {
  const [availability, setAvailability] = useState<Record<string, boolean>>(
    Object.fromEntries(MENU_ITEMS.map((i) => [i.id, i.isAvailable])),
  );

  const toggle = (id: string) => {
    setAvailability((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <MerchantShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Menu Management</h1>
            <p className="text-sm text-muted">Toggle availability in real time</p>
          </div>
          <Button>
            <Plus size={18} />
            Add Item
          </Button>
        </div>

        {MENU_CATEGORIES.map((cat) => {
          const items = MENU_ITEMS.filter((i) => i.categoryId === cat.id);
          if (items.length === 0) return null;

          return (
            <div key={cat.id} className="space-y-3">
              <h2 className="font-bold text-lg">{cat.name}</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {items.map((item) => {
                  const available = availability[item.id];
                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-2xl bg-card border border-border"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <DietIndicator diet={item.diet} />
                          <p className="font-semibold text-sm truncate">{item.name}</p>
                        </div>
                        <p className="text-sm font-bold text-primary mt-1">
                          {formatCurrency(item.price)}
                        </p>
                        {!available && <Badge variant="muted" className="mt-1">Unavailable</Badge>}
                      </div>
                      <button
                        type="button"
                        onClick={() => toggle(item.id)}
                        className="shrink-0 self-center"
                        aria-label={available ? "Mark unavailable" : "Mark available"}
                      >
                        {available ? (
                          <ToggleRight size={32} className="text-success" />
                        ) : (
                          <ToggleLeft size={32} className="text-muted" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </MerchantShell>
  );
}
