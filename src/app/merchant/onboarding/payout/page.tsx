"use client";

import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/merchant/onboarding-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PayoutOnboardingPage() {
  const router = useRouter();

  return (
    <OnboardingLayout
      step={3}
      title="UPI Payout & Settlement"
      subtitle="Where should we settle your order payments?"
    >
      <div className="space-y-4">
        <Input id="vpa" label="UPI ID (VPA)" placeholder="spicegarden@okhdfcbank" />
        <Input id="account-name" label="Account holder name" placeholder="Spice Garden Pvt Ltd" />
        <Input id="bank" label="Bank name" placeholder="HDFC Bank" />
        <p className="text-xs text-muted leading-relaxed">
          Settlement happens T+2 via Razorpay. You can update payout details anytime
          in Settings.
        </p>
      </div>
      <Button size="lg" fullWidth className="mt-6" onClick={() => router.push("/merchant/onboarding/qr")}>
        Continue
      </Button>
    </OnboardingLayout>
  );
}
