"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { AeroDineLogo } from "@/components/brand/aerodine-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const FEATURES = [
  "Instant QR-based table ordering",
  "Zero-commission UPI payments integration",
  "Real-time Kitchen Display System (KDS)",
];

export default function MerchantSignupPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"mobile" | "email">("mobile");

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-[#0a1628] text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:24px_24px]" />
        <div className="relative">
          <AeroDineLogo variant="light" size="lg" />
        </div>
        <div className="relative space-y-6 max-w-lg">
          <h1 className="text-4xl font-extrabold leading-tight">
            Elevate your dining experience with Smart QR Ordering.
          </h1>
          <p className="text-white/70 leading-relaxed">
            Join India&apos;s fastest-growing platform. Streamline operations, boost table
            turnover, and delight customers with seamless ordering and UPI payments.
          </p>
          <ul className="space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="text-primary shrink-0" size={20} />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <div className="flex gap-1 mb-3 text-amber-400">★★★★★</div>
          <p className="text-sm text-white/80 leading-relaxed">
            &ldquo;Switching to AeroDine increased our table turnover by 30%. The QR ordering is
            flawless, and the kitchen management is a lifesaver during rush hours.&rdquo;
          </p>
          <p className="text-sm font-semibold mt-4">Raj Patel, Owner at Spice Route</p>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 lg:px-16 bg-white">
        <div className="lg:hidden mb-8">
          <AeroDineLogo size="md" />
        </div>
        <div className="max-w-md w-full mx-auto space-y-6 animate-slide-up">
          <div>
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-muted mt-1">
              Start managing your restaurant efficiently today.
            </p>
          </div>

          <div className="flex p-1 rounded-xl bg-zinc-100">
            {(["mobile", "email"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setAuthMode(mode)}
                className={cn(
                  "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors",
                  authMode === mode ? "bg-white shadow-sm" : "text-muted",
                )}
              >
                {mode === "mobile" ? "Mobile Number" : "Email Address"}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {authMode === "mobile" ? (
              <div>
                <label className="text-sm font-medium">Mobile Number</label>
                <div className="flex mt-1.5">
                  <span className="inline-flex items-center px-4 h-11 rounded-l-xl border border-r-0 border-border bg-zinc-50 text-sm font-medium">
                    +91
                  </span>
                  <Input
                    id="phone"
                    placeholder="Enter your 10-digit number"
                    className="rounded-l-none"
                  />
                </div>
              </div>
            ) : (
              <Input id="email" label="Email Address" type="email" placeholder="owner@cafe.in" />
            )}
            <Input id="restaurant" label="Restaurant Name" placeholder="e.g. The Grand Kitchen" />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="mt-1 accent-primary" />
            <div>
              <p className="text-sm font-medium">Get updates on WhatsApp</p>
              <p className="text-xs text-muted">
                Receive order notifications, analytics, and platform updates.
              </p>
            </div>
          </label>

          <Button size="lg" fullWidth onClick={() => router.push("/merchant/onboarding/profile")}>
            Send OTP
          </Button>

          <p className="text-xs text-center text-muted">
            By continuing, you agree to AeroDine&apos;s{" "}
            <span className="text-primary">Terms of Service</span> and{" "}
            <span className="text-primary">Privacy Policy</span>.
          </p>

          <p className="text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/merchant/login" className="text-primary font-semibold">
              Log in
            </Link>
          </p>
        </div>

        <Link
          href="#"
          className="absolute bottom-6 right-6 flex items-center gap-1 text-sm text-muted lg:static lg:mt-8 lg:ml-auto lg:max-w-md lg:w-full lg:justify-end"
        >
          <HelpCircle size={16} />
          Need help?
        </Link>
      </div>
    </div>
  );
}
