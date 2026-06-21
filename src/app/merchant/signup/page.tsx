"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AeroDineLogo } from "@/components/brand/aerodine-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MerchantSignupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <div className="w-full max-w-md bg-card rounded-3xl shadow-xl border border-border p-8 space-y-6 animate-slide-up">
        <div className="text-center space-y-2">
          <AeroDineLogo showTagline className="justify-center" />
          <h1 className="text-xl font-bold pt-4">Welcome to AeroDine</h1>
          <p className="text-sm text-muted">
            Set up your restaurant in minutes — no credit card required to start
          </p>
        </div>

        <div className="space-y-4">
          <Input id="owner-name" label="Your name" placeholder="Rajan Mehta" />
          <Input id="phone" label="Phone number" type="tel" placeholder="+91 98765 43210" />
          <Input id="email" label="Email" type="email" placeholder="owner@spicegarden.in" />
        </div>

        <Button
          size="lg"
          fullWidth
          onClick={() => router.push("/merchant/onboarding/profile")}
        >
          Continue
        </Button>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/merchant/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
