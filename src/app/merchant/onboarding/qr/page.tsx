"use client";

import { QrCode, Download, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/merchant/onboarding-layout";
import { Button } from "@/components/ui/button";

export default function QrOnboardingPage() {
  const router = useRouter();

  return (
    <OnboardingLayout
      step={4}
      title="QR Code Setup"
      subtitle="Generate table QR codes and run a test payment"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="p-4 rounded-2xl border border-border bg-stone-50 text-center space-y-2"
            >
              <div className="w-20 h-20 mx-auto bg-white rounded-lg border flex items-center justify-center">
                <QrCode size={48} className="text-foreground" />
              </div>
              <p className="text-sm font-semibold">Table {n}</p>
            </div>
          ))}
        </div>

        <Button variant="outline" fullWidth>
          <Download size={18} />
          Download all QR codes (ZIP)
        </Button>

        <div className="p-4 rounded-2xl bg-green-50 border border-green-200 flex gap-3">
          <CheckCircle2 className="text-success shrink-0" size={22} />
          <div>
            <p className="font-semibold text-sm text-green-900">Test payment passed</p>
            <p className="text-xs text-green-700 mt-0.5">
              ₹1 test transaction verified. You&apos;re ready to go live.
            </p>
          </div>
        </div>
      </div>

      <Button size="lg" fullWidth className="mt-6" onClick={() => router.push("/merchant/dashboard")}>
        Go to Dashboard
      </Button>
    </OnboardingLayout>
  );
}
