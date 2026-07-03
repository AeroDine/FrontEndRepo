"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronLeft, Flame, Heart, Minus, Plus, Star } from "lucide-react";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { getMenuItem } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
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
    item?.variants?.find((v) => v.isDefault)?.id ?? item?.variants?.[0]?.id,
  );

  if (!item || !item.isAvailable) notFound();

  const variant = item.variants?.find((v) => v.id === selectedVariant);
  const unitPrice = variant?.price ?? item.price;

  const handleAdd = () => {
    addLine({
      itemId: item.id,
      name: item.name,
      variantId: variant?.id,
      variantName: variant?.name,
      addOnIds: [],
      addOnNames: [],
      quantity,
      unitPrice,
      diet: item.diet,
    });
    router.push("/order/menu");
  };

  return (
    <MobileShell>
      <div className="relative">
        <div className="relative h-72 bg-zinc-100 flex items-center justify-center">
          <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-lg">
            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" priority />
          </div>
          <Link
            href="/order/menu"
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow"
          >
            <ChevronLeft size={22} />
          </Link>
          <button
            type="button"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow"
            aria-label="Favorite"
          >
            <Heart size={20} />
          </button>
        </div>

        <div className="px-5 py-6 space-y-4 animate-slide-up">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-extrabold flex-1">{item.name}</h1>
            <span className="text-2xl font-extrabold">{formatCurrency(unitPrice)}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted">
            {item.rating && (
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {item.rating} (128)
              </span>
            )}
            {item.calories && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Flame size={14} />
                  {item.calories} kcal
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-muted leading-relaxed">{item.description}</p>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-xs font-medium">
              Contains Gluten
            </span>
            <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-xs font-medium">
              Contains Dairy
            </span>
          </div>

          {item.variants && item.variants.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {item.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${
                    selectedVariant === v.id
                      ? "border-customer-primary bg-customer-primary text-white"
                      : "border-border"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto p-5 border-t border-border space-y-4 bg-white">
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center"
          >
            <Minus size={18} />
          </button>
          <span className="text-xl font-bold w-8 text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center"
          >
            <Plus size={18} />
          </button>
        </div>
        <Button variant="black" size="lg" fullWidth className="rounded-2xl" onClick={handleAdd}>
          <span className="flex-1 text-left">Add to Order</span>
          <span>{formatCurrency(unitPrice * quantity)}</span>
        </Button>
      </div>
    </MobileShell>
  );
}
