"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PlanSelector({ nextHref }: { nextHref: string }) {
  const router = useRouter();
  const [selected, setSelected] = useState(
    SUBSCRIPTION_PLANS.find((p) => p.recommended)?.id ?? SUBSCRIPTION_PLANS[0].id,
  );

  return (
    <>
      <div className="space-y-3">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => setSelected(plan.id)}
            className={cn(
              "w-full text-left p-4 rounded-2xl border-2 transition-all",
              selected === plan.id
                ? "border-primary bg-primary-light/30"
                : "border-border hover:border-primary/30",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{plan.name}</h3>
                  {plan.recommended && (
                    <span className="text-[10px] font-bold uppercase bg-primary text-white px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-2xl font-extrabold text-primary mt-1">
                  {formatCurrency(plan.price)}
                  <span className="text-sm font-normal text-muted">/mo</span>
                </p>
              </div>
              <div
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                  selected === plan.id
                    ? "border-primary bg-primary text-white"
                    : "border-border",
                )}
              >
                {selected === plan.id && <Check size={14} />}
              </div>
            </div>
            <ul className="mt-3 space-y-1">
              {plan.features.map((f) => (
                <li key={f} className="text-xs text-muted flex items-center gap-1.5">
                  <Check size={12} className="text-success shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
      <Button size="lg" fullWidth className="mt-6" onClick={() => router.push(nextHref)}>
        Continue with selected plan
      </Button>
    </>
  );
}
