"use client";

import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/merchant/onboarding-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfileOnboardingPage() {
  const router = useRouter();

  return (
    <OnboardingLayout step={1} title="Business Profile" subtitle="Tell us about your restaurant">
      <div className="space-y-4">
        <Input id="business-name" label="Restaurant name" placeholder="Spice Garden" />
        <Input id="slug" label="Unique identifier (URL slug)" placeholder="spice-garden" />
        <Input id="address" label="Address line 1" placeholder="Shop 12, FC Road" />
        <div className="grid grid-cols-2 gap-3">
          <Input id="city" label="City" placeholder="Pune" />
          <Input id="pin" label="PIN code" placeholder="411004" />
        </div>
        <Input id="gstin" label="GST number (optional)" placeholder="27AABCU9603R1ZM" />
      </div>
      <Button size="lg" fullWidth className="mt-6" onClick={() => router.push("/merchant/onboarding/plan")}>
        Continue
      </Button>
    </OnboardingLayout>
  );
}
