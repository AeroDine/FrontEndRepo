"use client";

import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { SuccessBanner } from "@/components/ui/success-banner";
import { DietIndicator } from "@/components/ui/diet-indicator";
import { MENU_ITEMS } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

type OrderType = "DINE_IN" | "TAKEAWAY";

type CartLine = {
  itemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

const TABLES = ["T1", "T2", "T3", "T4", "T5", "T7", "T12", "T15", "T18", "T20"];

interface ManualOrderModalProps {
  open: boolean;
  onClose: () => void;
}

export function ManualOrderModal({ open, onClose }: ManualOrderModalProps) {
  const [orderType, setOrderType] = useState<OrderType>("DINE_IN");
  const [table, setTable] = useState("T4");
  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");
  const [query, setQuery] = useState("");
  const [lines, setLines] = useState<CartLine[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (open) {
      setOrderType("DINE_IN");
      setTable("T4");
      setCustomerName("");
      setNotes("");
      setQuery("");
      setLines([]);
      setErrors({});
      setPlaced(false);
      setOrderId("");
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MENU_ITEMS;
    return MENU_ITEMS.filter(
      (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q),
    );
  }, [query]);

  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const addItem = (itemId: string, name: string, unitPrice: number) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.itemId === itemId);
      if (existing) {
        return prev.map((l) =>
          l.itemId === itemId ? { ...l, quantity: l.quantity + 1 } : l,
        );
      }
      return [...prev, { itemId, name, unitPrice, quantity: 1 }];
    });
    setErrors((e) => ({ ...e, lines: "" }));
  };

  const setQty = (itemId: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.itemId === itemId ? { ...l, quantity: qty } : l))
        .filter((l) => l.quantity > 0),
    );
  };

  const placeOrder = () => {
    const next: Record<string, string> = {};
    if (!lines.length) next.lines = "Add at least one item";
    if (orderType === "DINE_IN" && !table) next.table = "Select a table";
    setErrors(next);
    if (Object.keys(next).length) return;
    setOrderId(`ORD-${8800 + Math.floor(Math.random() * 90)}`);
    setPlaced(true);
    window.setTimeout(onClose, 1400);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="xl"
      title="Manual Order"
      description="Place an order for walk-in guests or phone / takeaway requests."
      footer={
        placed ? null : (
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-muted">Incl. 5% GST</p>
              <p className="text-lg font-extrabold">{formatCurrency(total)}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={placeOrder} disabled={!lines.length}>
                Place Order
              </Button>
            </div>
          </div>
        )
      }
    >
      {placed ? (
        <SuccessBanner
          title="Order placed"
          message={`#${orderId} sent to kitchen${
            orderType === "DINE_IN" ? ` for table ${table}` : " as takeaway"
          }.`}
        />
      ) : (
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 rounded-2xl">
              {(
                [
                  { id: "DINE_IN", label: "Dine-in" },
                  { id: "TAKEAWAY", label: "Takeaway" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setOrderType(t.id)}
                  className={cn(
                    "h-10 rounded-xl text-sm font-semibold transition-all",
                    orderType === t.id
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {orderType === "DINE_IN" ? (
                <SelectField
                  id="mo-table"
                  label="Table"
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                  error={errors.table}
                >
                  {TABLES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </SelectField>
              ) : (
                <Input
                  id="mo-customer"
                  label="Customer name (optional)"
                  placeholder="Walk-in guest"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              )}
              <Input
                id="mo-notes"
                label="Kitchen note"
                placeholder="Extra spicy, no onion..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-700">Add items</h3>
                {errors.lines && <p className="text-xs text-danger">{errors.lines}</p>}
              </div>
              <Input
                id="mo-search"
                placeholder="Search menu..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {filtered.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => addItem(item.id, item.name, item.price)}
                    className="w-full flex items-center justify-between gap-3 p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary-light/20 text-left transition-colors"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <span className="mt-0.5">
                        <DietIndicator diet={item.diet} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-xs text-muted truncate">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-bold">{formatCurrency(item.price)}</span>
                      <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                        <Plus size={16} />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-zinc-50/80 p-4 h-full min-h-72 flex flex-col">
              <h3 className="text-sm font-semibold mb-3">Order ticket</h3>
              {lines.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-center px-4">
                  <p className="text-sm text-muted">
                    Tap items on the left to build this order.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3 flex-1 overflow-y-auto">
                  {lines.map((line) => (
                    <li
                      key={line.itemId}
                      className="flex items-start justify-between gap-2 bg-white rounded-xl border border-border p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{line.name}</p>
                        <p className="text-xs text-muted">
                          {formatCurrency(line.unitPrice)} each
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-zinc-50"
                          onClick={() => setQty(line.itemId, line.quantity - 1)}
                        >
                          {line.quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{line.quantity}</span>
                        <button
                          type="button"
                          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-zinc-50"
                          onClick={() => setQty(line.itemId, line.quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 pt-3 border-t border-border space-y-1 text-sm">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>GST (5%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
