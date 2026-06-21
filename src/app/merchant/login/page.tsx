"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AeroDineLogo } from "@/components/brand/aerodine-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MerchantLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    router.push("/merchant/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <div className="w-full max-w-md bg-card rounded-3xl shadow-xl border border-border p-8 space-y-8 animate-slide-up">
        <div className="text-center space-y-2">
          <AeroDineLogo showTagline className="justify-center" />
          <h1 className="text-xl font-bold pt-4">Merchant Login</h1>
          <p className="text-sm text-muted">Sign in with your registered phone number</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="phone"
            label="Phone number"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={otpSent}
          />
          {otpSent && (
            <Input
              id="otp"
              label="Enter OTP"
              type="text"
              placeholder="6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
            />
          )}
          <Button type="submit" size="lg" fullWidth>
            {otpSent ? "Verify & Login" : "Send OTP"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted">
          New to AeroDine?{" "}
          <Link href="/merchant/signup" className="text-primary font-semibold hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
