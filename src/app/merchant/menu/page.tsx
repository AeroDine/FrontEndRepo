"use client";

import { useMemo, useState } from "react";
import { Bell, Plus, Search, X } from "lucide-react";
import { MerchantShell } from "@/components/layout/merchant-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuItemModal } from "@/components/merchant/modals/menu-item-modal";
import { MENU_ITEMS } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

const CATEGORIES = ["Appetizers", "Main Course", "Breads & Rice", "Desserts", "Beverages"];

export default function MenuManagementPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [categoryQuery, setCategoryQuery] = useState("");
  const [editItem, setEditItem] = useState(MENU_ITEMS[3] ?? MENU_ITEMS[0]);

  const filteredCategories = useMemo(() => {
    const q = categoryQuery.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter((c) => c.toLowerCase().includes(q));
  }, [categoryQuery]);

  return (
    <MerchantShell dark>
      <div className="flex min-h-screen">
        <div className={`flex-1 p-6 space-y-6 transition-all ${editing ? "lg:mr-96" : ""}`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Menu Management</h1>
              <select className="text-sm text-zinc-400 mt-1 bg-transparent">
                <option>AeroDine Cafe — Downtown</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setCreateOpen(true)}>
                <Plus size={16} />
                Add Item
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-600 text-zinc-300">
                <Plus size={16} />
                Add Category
              </Button>
              <button
                type="button"
                className="p-2.5 rounded-xl border border-zinc-700 hover:bg-merchant-card transition-colors"
              >
                <Bell size={20} className="text-zinc-400" />
              </button>
            </div>
          </div>

          <div className="flex gap-6">
            <aside className="w-48 shrink-0 space-y-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  placeholder="Search categories..."
                  value={categoryQuery}
                  onChange={(e) => setCategoryQuery(e.target.value)}
                  className="w-full h-9 pl-8 pr-3 rounded-lg bg-merchant-card border border-zinc-700 text-sm text-white"
                />
              </div>
              {filteredCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "text-zinc-400 hover:bg-merchant-card",
                  )}
                >
                  {cat}
                </button>
              ))}
            </aside>

            <div className="flex-1 space-y-3">
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
                {activeCategory}
              </p>
              {MENU_ITEMS.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-merchant-card border border-zinc-700"
                >
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-zinc-400">{formatCurrency(item.price)}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-600 text-zinc-300"
                    onClick={() => {
                      setEditItem(item);
                      setEditing(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {editing && (
          <aside className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-merchant-card border-l border-zinc-700 p-6 overflow-y-auto z-30 animate-modal-in">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Edit Item</h2>
                <p className="text-sm text-zinc-400">Update details for {editItem.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 text-white">
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-300">Basic Information</h3>
                <Input
                  id="item-name"
                  label="Item Name"
                  defaultValue={editItem.name}
                  className="bg-merchant-surface border-zinc-600 text-white"
                />
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="mt-1.5 w-full h-24 px-4 py-3 rounded-xl border border-zinc-600 bg-merchant-surface text-sm text-white"
                    defaultValue={editItem.description}
                  />
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-300">Pricing & Tax</h3>
                <Input
                  id="price"
                  label="Base Price (₹)"
                  defaultValue={String(editItem.price)}
                  className="bg-merchant-surface border-zinc-600 text-white"
                />
                <div>
                  <label className="text-sm font-medium">Tax/GST Mapping</label>
                  <select className="mt-1.5 w-full h-11 px-4 rounded-xl border border-zinc-600 bg-merchant-surface text-sm text-white">
                    <option>GST 5% (Food)</option>
                    <option>GST 12% (Packaged)</option>
                    <option>GST 18% (Beverages)</option>
                  </select>
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-300">Modifier Groups</h3>
                  <button type="button" className="text-sm text-primary">
                    + Add Group
                  </button>
                </div>
                <div className="p-4 rounded-xl border border-zinc-600 space-y-2">
                  <p className="font-medium text-sm">Spice Level</p>
                  <p className="text-xs text-zinc-500">Required · Choose 1</p>
                  {["Mild (+₹0)", "Medium (+₹0)", "Extra Spicy (+₹0)"].map((o) => (
                    <p key={o} className="text-sm text-zinc-400">
                      {o}
                    </p>
                  ))}
                </div>
              </section>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  fullWidth
                  className="border-zinc-600 text-zinc-300"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
                <Button fullWidth onClick={() => setEditing(false)}>
                  Save Item
                </Button>
              </div>
            </div>
          </aside>
        )}
      </div>

      <MenuItemModal open={createOpen} onClose={() => setCreateOpen(false)} mode="create" />
    </MerchantShell>
  );
}
