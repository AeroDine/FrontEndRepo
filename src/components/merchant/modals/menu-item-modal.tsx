"use client";

import { useEffect, useState } from "react";
import { ImagePlus, Leaf } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { SuccessBanner } from "@/components/ui/success-banner";
import { cn } from "@/lib/utils";
import type { DietType } from "@/types";

const CATEGORIES = ["Appetizers", "Main Course", "Breads & Rice", "Desserts", "Beverages"];

export type MenuItemFormValues = {
  name: string;
  description: string;
  category: string;
  price: string;
  tax: string;
  diet: DietType;
  available: boolean;
};

const EMPTY: MenuItemFormValues = {
  name: "",
  description: "",
  category: CATEGORIES[0],
  price: "",
  tax: "GST 5% (Food)",
  diet: "veg",
  available: true,
};

interface MenuItemModalProps {
  open: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  initial?: Partial<MenuItemFormValues>;
}

export function MenuItemModal({
  open,
  onClose,
  mode = "create",
  initial,
}: MenuItemModalProps) {
  const [form, setForm] = useState<MenuItemFormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof MenuItemFormValues, string>>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({ ...EMPTY, ...initial });
      setErrors({});
      setSaved(false);
    }
  }, [open, initial]);

  const update = <K extends keyof MenuItemFormValues>(key: K, value: MenuItemFormValues[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Item name is required";
    if (!form.price.trim() || Number(form.price) <= 0) next.price = "Enter a valid price";
    if (!form.description.trim()) next.description = "Add a short description";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaved(true);
    window.setTimeout(onClose, 1100);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={mode === "create" ? "Create Menu Item" : "Edit Menu Item"}
      description={
        mode === "create"
          ? "Add a new dish to your menu. Guests will see it instantly once saved."
          : "Update item details, pricing, and availability."
      }
      footer={
        saved ? null : (
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={submit}>
              {mode === "create" ? "Create Item" : "Save Changes"}
            </Button>
          </div>
        )
      }
    >
      {saved ? (
        <SuccessBanner
          title={mode === "create" ? "Menu item created" : "Menu item updated"}
          message={`${form.name} is ready in ${form.category}.`}
        />
      ) : (
        <div className="space-y-6">
          <button
            type="button"
            className="w-full h-36 rounded-2xl border-2 border-dashed border-border bg-zinc-50/80 flex flex-col items-center justify-center gap-2 text-muted hover:border-primary/40 hover:bg-primary-light/20 transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm">
              <ImagePlus size={20} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Upload item photo</span>
            <span className="text-xs">JPG or PNG · recommended 800×600</span>
          </button>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-700">Basic information</h3>
            <Input
              id="mi-name"
              label="Item name"
              placeholder="e.g. Paneer Tikka"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              error={errors.name}
            />
            <div className="space-y-1.5">
              <label htmlFor="mi-desc" className="block text-sm font-medium">
                Description
              </label>
              <textarea
                id="mi-desc"
                rows={3}
                placeholder="Short description guests will see..."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none",
                  errors.description && "border-danger",
                )}
              />
              {errors.description && <p className="text-xs text-danger">{errors.description}</p>}
            </div>
            <SelectField
              id="mi-cat"
              label="Category"
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectField>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-700">Diet type</h3>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "veg", label: "Veg", color: "text-veg border-veg/40 bg-green-50" },
                  { id: "egg", label: "Egg", color: "text-amber-700 border-amber-300 bg-amber-50" },
                  { id: "non-veg", label: "Non-veg", color: "text-non-veg border-red-300 bg-red-50" },
                ] as const
              ).map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => update("diet", d.id)}
                  className={cn(
                    "h-11 rounded-xl border-2 text-sm font-semibold transition-all",
                    form.diet === d.id
                      ? d.color
                      : "border-border text-muted hover:border-zinc-300",
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </section>

          <section className="grid sm:grid-cols-2 gap-4">
            <Input
              id="mi-price"
              label="Base price (₹)"
              type="number"
              min={0}
              placeholder="280"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              error={errors.price}
            />
            <SelectField
              id="mi-tax"
              label="Tax / GST mapping"
              value={form.tax}
              onChange={(e) => update("tax", e.target.value)}
            >
              <option>GST 5% (Food)</option>
              <option>GST 12% (Packaged)</option>
              <option>GST 18% (Beverages)</option>
              <option>Exempt</option>
            </SelectField>
          </section>

          <label className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-zinc-50/60 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                <Leaf size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Available for ordering</p>
                <p className="text-xs text-muted">Hide temporarily if out of stock</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => update("available", e.target.checked)}
              className="w-5 h-5 accent-primary"
            />
          </label>
        </div>
      )}
    </Modal>
  );
}
