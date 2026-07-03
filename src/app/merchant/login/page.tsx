"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { AeroDineLogo } from "@/components/brand/aerodine-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MerchantLoginPage() {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center bg-[#0a1628] text-white p-12">
        <AeroDineLogo variant="light" size="lg" className="mb-12" />
        <h1 className="text-3xl font-extrabold max-w-md">
          Welcome back to your restaurant dashboard.
        </h1>
        <p className="text-white/70 mt-4 max-w-md">
          Manage orders, kitchen display, and payouts from one place.
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 lg:px-16 bg-white">
        <div className="lg:hidden mb-8">
          <AeroDineLogo size="md" />
        </div>
        <div className="max-w-md w-full mx-auto space-y-6 animate-slide-up">
          <div>
            <h1 className="text-2xl font-bold">Merchant Login</h1>
            <p className="text-sm text-muted mt-1">Sign in with your registered phone number</p>
          </div>

          <Input
            id="phone"
            label="Mobile Number"
            type="tel"
            placeholder="+91 98765 43210"
            disabled={otpSent}
          />
          {otpSent && (
            <Input id="otp" label="Enter OTP" placeholder="6-digit code" maxLength={6} />
          )}

          <Button
            size="lg"
            fullWidth
            onClick={() => {
              if (!otpSent) setOtpSent(true);
              else router.push("/merchant/dashboard");
            }}
          >
            {otpSent ? "Verify & Login" : "Send OTP"}
          </Button>

          <p className="text-center text-sm text-muted">
            New to AeroDine?{" "}
            <Link href="/merchant/signup" className="text-primary font-semibold">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
