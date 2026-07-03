"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";
import { OnboardingLayout } from "@/components/merchant/onboarding-layout";
import { SUBSCRIPTION_PLANS } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function PlanOnboardingPage() {
  const router = useRouter();
  const [annual, setAnnual] = useState(true);
  const [selected, setSelected] = useState("plan-pro");

  return (
    <OnboardingLayout
      step={2}
      title="Select a Plan"
      subtitle="Choose the right plan for your outlet. Start with a 14-day free trial. No credit card required."
    >
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className={cn("text-sm font-medium", !annual && "text-foreground")}>Monthly</span>
        <button
          type="button"
          onClick={() => setAnnual(!annual)}
          className={cn(
            "w-12 h-7 rounded-full transition-colors",
            annual ? "bg-primary" : "bg-zinc-300",
          )}
        >
          <span
            className={cn(
              "block w-5 h-5 rounded-full bg-white shadow transition-transform mx-1",
              annual ? "translate-x-5" : "translate-x-0",
            )}
          />
        </button>
        <span className={cn("text-sm font-medium", annual && "text-foreground")}>Annually</span>
        {annual && (
          <span className="text-xs font-bold text-customer-accent bg-green-50 px-2 py-1 rounded-full">
            Save 20%
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative p-5 rounded-2xl border-2 flex flex-col",
              plan.recommended ? "border-primary shadow-md" : "border-border",
            )}
          >
            {plan.recommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase bg-primary text-white px-3 py-1 rounded-full">
                Recommended
              </span>
            )}
            <h3 className="font-bold text-lg">{plan.name}</h3>
            <p className="text-xs text-muted mt-1 min-h-10">
              {plan.id === "plan-starter" && "Perfect for small cafes and new outlets getting started."}
              {plan.id === "plan-pro" && "Everything a growing restaurant needs to scale operations."}
              {plan.id === "plan-enterprise" && "Advanced features for multi-outlet chains and large venues."}
            </p>
            <p className="text-2xl font-extrabold mt-4">
              {formatCurrency(plan.price)}
              <span className="text-sm font-normal text-muted">/month</span>
            </p>
            {annual && (
              <p className="text-xs text-muted">
                Billed {formatCurrency(plan.price * 12)} annually
              </p>
            )}
            <ul className="mt-4 space-y-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="text-xs flex items-start gap-2">
                  <Check size={14} className="text-primary shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.recommended ? "primary" : "outline"}
              fullWidth
              className="mt-6"
              onClick={() => {
                setSelected(plan.id);
                router.push("/merchant/onboarding/payout");
              }}
            >
              Select {plan.name}
            </Button>
          </div>
        ))}
      </div>
    </OnboardingLayout>
  );
}
