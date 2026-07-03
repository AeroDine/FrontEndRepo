"use client";

import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { OnboardingLayout } from "@/components/merchant/onboarding-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfileOnboardingPage() {
  const router = useRouter();

  return (
    <OnboardingLayout
      step={1}
      title="Business Info"
      subtitle="Tell us about your outlet"
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p className="text-sm text-muted">
            Provide basic details about your business so we can get started.
          </p>
          <Input id="outlet" label="Outlet Name *" placeholder="e.g. The Grand Kitchen" />
          <div>
            <label className="text-sm font-medium">Business Type *</label>
            <select className="mt-1.5 w-full h-11 px-4 rounded-xl border border-border bg-white text-sm">
              <option>Select type</option>
              <option>Restaurant</option>
              <option>Cafe</option>
              <option>Cloud Kitchen</option>
            </select>
          </div>
          <Input id="gstin" label="GSTIN (Optional)" placeholder="ENTER 15-DIGIT GSTIN" />
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold">Location & Contact Info</h2>
          <p className="text-sm text-muted">
            Where is your outlet located and how can we reach the manager?
          </p>
          <Input id="address" label="Complete Address *" placeholder="Street address, building, floor" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input id="city" label="City" placeholder="City" />
            <Input id="pin" label="PIN Code" placeholder="PIN Code" />
          </div>
          <div className="h-40 rounded-xl bg-zinc-100 border border-border flex flex-col items-center justify-center gap-2 text-muted">
            <MapPin size={24} className="text-primary" />
            <Button variant="outline" size="sm">Pin Location on Map</Button>
          </div>
        </section>

        <Button size="lg" fullWidth onClick={() => router.push("/merchant/onboarding/plan")}>
          Continue
        </Button>
      </div>
    </OnboardingLayout>
  );
}
