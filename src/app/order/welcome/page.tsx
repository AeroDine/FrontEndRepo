"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Sparkles } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { AeroDineLogo } from "@/components/brand/aerodine-logo";
import { Button } from "@/components/ui/button";
import { DEMO_RESTAURANT } from "@/lib/mock-data";
import { useCartStore } from "@/stores/cart-store";
import { useEffect } from "react";

export default function WelcomePage() {
  const setSessionId = useCartStore((s) => s.setSessionId);

  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, [setSessionId]);

  return (
    <MobileShell className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary-light/30 pointer-events-none" />

      <div className="relative flex-1 flex flex-col px-6 pt-10 pb-8">
        <AeroDineLogo size="sm" className="mb-auto" />

        <div className="my-8 space-y-6 animate-slide-up">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
              alt="Restaurant interior"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-sm font-medium opacity-90">Welcome to</p>
              <h1 className="text-2xl font-extrabold">{DEMO_RESTAURANT.name}</h1>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-muted text-sm leading-relaxed">
              {DEMO_RESTAURANT.tagline}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-sm font-medium">
                <MapPin size={14} className="text-primary" />
                Table {DEMO_RESTAURANT.tableNumber}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-sm font-medium">
                <Sparkles size={14} className="text-primary" />
                {DEMO_RESTAURANT.city}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-auto">
          <Link href="/order/menu" className="block">
            <Button size="lg" fullWidth>
              View Menu & Order
            </Button>
          </Link>
          <p className="text-center text-xs text-muted">
            No app install · Pay with UPI · GST invoice on WhatsApp
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
