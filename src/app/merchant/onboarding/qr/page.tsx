"use client";

import { Download, Play, QrCode, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/merchant/onboarding-layout";
import { AeroDineLogo } from "@/components/brand/aerodine-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QrOnboardingPage() {
  const router = useRouter();

  return (
    <OnboardingLayout step={4} title="Table QR Setup">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="font-semibold">Generate Table QRs</h2>
            <p className="text-sm text-muted">
              Create unique QR codes for your tables for instant ordering.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Input id="from" label="From" defaultValue="T1" />
              <Input id="to" label="To" defaultValue="T20" />
            </div>
            <p className="text-xs text-muted">Generates 20 unique table QRs.</p>
            <div>
              <label className="text-sm font-medium">Assign Zone/Section (Optional)</label>
              <select className="mt-1.5 w-full h-11 px-4 rounded-xl border border-border text-sm">
                <option>Main Dining Area</option>
                <option>Outdoor Patio</option>
                <option>Private Room</option>
              </select>
            </div>
            <Button variant="outline" fullWidth>
              <RefreshCw size={18} />
              Generate Codes
            </Button>
          </section>

          <section className="p-5 rounded-2xl bg-blue-50 border border-blue-100 space-y-3">
            <h3 className="font-semibold text-sm">Test Payment Flow</h3>
            <p className="text-sm text-muted">
              Simulate a customer scanning and paying to ensure your setup is working correctly.
            </p>
            <Button variant="black" fullWidth>
              <Play size={18} />
              Run Test
            </Button>
          </section>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">Ready for table tents or stickers.</p>
            <button type="button" className="text-sm text-primary font-semibold flex items-center gap-1">
              <Download size={16} />
              Download All
            </button>
          </div>
          <div className="mx-auto max-w-xs p-6 rounded-2xl border-2 border-border bg-white shadow-lg text-center space-y-4">
            <AeroDineLogo size="sm" className="justify-center" />
            <div>
              <p className="font-bold">AeroDine Cafe</p>
              <p className="text-xs text-muted">Scan to Order & Pay</p>
            </div>
            <div className="w-40 h-40 mx-auto bg-zinc-100 rounded-xl flex items-center justify-center">
              <QrCode size={80} className="text-zinc-400" />
            </div>
            <div className="bg-customer-primary text-white py-2 rounded-lg font-bold text-sm">
              TABLE 12
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {["T1", "T2", "T3", "…", "T17"].map((t, i) => (
              <span
                key={t}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-bold ${
                  i === 0 ? "border-primary bg-primary-light" : "border-border"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Button size="lg" fullWidth className="mt-8" onClick={() => router.push("/merchant/dashboard")}>
        Go to Dashboard
      </Button>
    </OnboardingLayout>
  );
}
