"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/types";

interface CartState {
  lines: CartLine[];
  sessionId: string | null;
  addLine: (line: Omit<CartLine, "id">) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
  setSessionId: (id: string) => void;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      sessionId: null,
      addLine: (line) =>
        set((state) => ({
          lines: [
            ...state.lines,
            { ...line, id: crypto.randomUUID() },
          ],
        })),
      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.id !== lineId)
              : state.lines.map((l) =>
                  l.id === lineId ? { ...l, quantity } : l,
                ),
        })),
      removeLine: (lineId) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.id !== lineId),
        })),
      clearCart: () => set({ lines: [] }),
      setSessionId: (id) => set({ sessionId: id }),
      itemCount: () =>
        get().lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: () =>
        get().lines.reduce(
          (sum, line) => sum + line.unitPrice * line.quantity,
          0,
        ),
    }),
    { name: "aerodine-cart" },
  ),
);
