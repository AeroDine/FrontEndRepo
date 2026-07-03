"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEMO_RESTAURANT } from "@/lib/mock-data";
import { useCartStore } from "@/stores/cart-store";

export default function WelcomePage() {
  const router = useRouter();
  const setSessionId = useCartStore((s) => s.setSessionId);
  const [orderUpdates, setOrderUpdates] = useState(true);

  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, [setSessionId]);

  return (
    <MobileShell showNav={false}>
      <div className="relative min-h-dvh flex flex-col">
        <div className="relative h-[42vh] min-h-72">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
            alt="Restaurant interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
          <div className="absolute top-5 left-5 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-customer-accent text-white text-xs font-bold">
              TABLE {DEMO_RESTAURANT.tableNumber}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium flex items-center gap-1">
              <CheckCircle2 size={12} />
              Checked In
            </span>
          </div>
          <div className="absolute bottom-6 left-5 right-5 text-white">
            <h1 className="text-3xl font-extrabold">{DEMO_RESTAURANT.name}</h1>
            <p className="text-sm text-white/80 mt-1">{DEMO_RESTAURANT.tagline}</p>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-t-3xl -mt-6 relative z-10 px-6 pt-8 pb-8 flex flex-col animate-slide-up">
          <div className="space-y-2 mb-6">
            <h2 className="text-2xl font-bold">Welcome!</h2>
            <p className="text-sm text-muted leading-relaxed">
              Sign in to earn rewards, save your payment methods, and track your order easily.
            </p>
          </div>

          <div className="space-y-3">
            <Button variant="black" size="lg" fullWidth className="rounded-full">
              <span className="text-lg">&#63743;</span>
              Continue with Apple
            </Button>
            <Button variant="outline" size="lg" fullWidth className="rounded-full bg-zinc-50">
              <span className="font-bold text-blue-600">G</span>
              Continue with Google
            </Button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex gap-2 mb-6">
            <div className="flex items-center gap-2 px-3 h-12 rounded-xl border border-border bg-zinc-50 shrink-0">
              <span className="text-lg">🇮🇳</span>
              <span className="text-sm font-medium">+91</span>
            </div>
            <Input
              id="phone"
              placeholder="Mobile number"
              type="tel"
              className="flex-1"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-border mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center">
                <Bell size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Order Updates</p>
                <p className="text-xs text-muted">Get SMS & push notifications</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOrderUpdates(!orderUpdates)}
              className={`w-12 h-7 rounded-full transition-colors ${
                orderUpdates ? "bg-customer-primary" : "bg-zinc-300"
              }`}
              aria-label="Toggle order updates"
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow transition-transform mx-1 ${
                  orderUpdates ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <Button
            variant="customer"
            size="lg"
            fullWidth
            className="rounded-full mt-auto"
            onClick={() => router.push("/order/menu")}
          >
            Start Ordering →
          </Button>
          <p className="text-center text-xs text-muted mt-4">
            <Link href="/order/menu" className="underline">
              Skip sign-in and browse menu
            </Link>
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
