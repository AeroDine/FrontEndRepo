"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { DietIndicator } from "@/components/ui/diet-indicator";
import { Button } from "@/components/ui/button";
import { getMenuItem } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { notFound } from "next/navigation";

export default function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const item = getMenuItem(id);
  const router = useRouter();
  const addLine = useCartStore((s) => s.addLine);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    item?.variants?.find((v) => v.isDefault)?.id ??
      item?.variants?.[0]?.id,
  );
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  if (!item || !item.isAvailable) notFound();

  const variant = item.variants?.find((v) => v.id === selectedVariant);
  const basePrice = variant?.price ?? item.price;
  const addOnTotal = (item.addOns ?? [])
    .filter((a) => selectedAddOns.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const unitPrice = basePrice + addOnTotal;

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId],
    );
  };

  const handleAdd = () => {
    const addOnNames = (item.addOns ?? [])
      .filter((a) => selectedAddOns.includes(a.id))
      .map((a) => a.name);

    addLine({
      itemId: item.id,
      name: item.name,
      variantId: variant?.id,
      variantName: variant?.name,
      addOnIds: selectedAddOns,
      addOnNames,
      quantity,
      unitPrice,
      diet: item.diet,
    });
    router.push("/order/menu");
  };

  return (
    <MobileShell>
      <div className="relative h-56">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" priority />
        <Link
          href="/order/menu"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur flex items-center justify-center shadow"
        >
          <ArrowLeft size={20} />
        </Link>
      </div>

      <div className="flex-1 px-5 py-5 space-y-5 -mt-6 relative bg-card rounded-t-3xl animate-slide-up">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <DietIndicator diet={item.diet} size="md" />
            <h1 className="text-xl font-bold">{item.name}</h1>
          </div>
          <p className="text-sm text-muted leading-relaxed">{item.description}</p>
        </div>

        {item.variants && item.variants.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold mb-2">Choose size</h2>
            <div className="flex flex-wrap gap-2">
              {item.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v.id)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors",
                    selectedVariant === v.id
                      ? "border-primary bg-primary-light text-primary-dark"
                      : "border-border hover:border-primary/40",
                  )}
                >
                  {v.name} · {formatCurrency(v.price)}
                </button>
              ))}
            </div>
          </div>
        )}

        {item.addOns && item.addOns.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold mb-2">Add-ons</h2>
            <div className="space-y-2">
              {item.addOns.map((addOn) => (
                <label
                  key={addOn.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-border cursor-pointer hover:bg-stone-50"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(addOn.id)}
                      onChange={() => toggleAddOn(addOn.id)}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm font-medium">{addOn.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    +{formatCurrency(addOn.price)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 bg-stone-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-card"
            >
              <Minus size={18} />
            </button>
            <span className="w-8 text-center font-bold">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-card"
            >
              <Plus size={18} />
            </button>
          </div>
          <span className="text-xl font-extrabold text-primary">
            {formatCurrency(unitPrice * quantity)}
          </span>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <Button size="lg" fullWidth onClick={handleAdd}>
          Add to Cart · {formatCurrency(unitPrice * quantity)}
        </Button>
      </div>
    </MobileShell>
  );
}
