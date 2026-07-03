"use client";

import { useRouter } from "next/navigation";
import { Building2, FileText, Lock, RefreshCw, ShieldCheck } from "lucide-react";
import { OnboardingLayout } from "@/components/merchant/onboarding-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PayoutOnboardingPage() {
  const router = useRouter();

  return (
    <OnboardingLayout step={3} title="Secure Setup">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={18} className="text-primary" />
              <h2 className="font-semibold">Bank Account Details</h2>
            </div>
            <p className="text-sm text-muted mb-4">Where should we send your daily settlements?</p>
            <div className="space-y-4">
              <Input id="account" label="Account Number" placeholder="e.g. 1234567890" />
              <div>
                <Input id="ifsc" label="IFSC Code" defaultValue="HDFC0001234" />
                <p className="text-xs text-customer-accent mt-1 flex items-center gap-1">
                  <ShieldCheck size={12} />
                  HDFC Bank, Koramangala Branch
                </p>
              </div>
              <div>
                <Input id="beneficiary" label="Beneficiary Name" defaultValue="AeroDine Pvt Ltd" />
                <p className="text-xs text-primary mt-1">Name matched automatically</p>
              </div>
              <Input id="upi" label="UPI ID (Optional)" placeholder="merchant@upi" />
              <p className="text-xs text-muted">For faster, instant settlements on weekends.</p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw size={18} className="text-primary" />
              <h2 className="font-semibold">Settlement Preferences</h2>
            </div>
            <div className="space-y-3">
              <label className="block p-4 rounded-xl border-2 border-primary bg-primary-light/20 cursor-pointer">
                <div className="flex items-start gap-3">
                  <input type="radio" name="settlement" defaultChecked className="mt-1 accent-primary" />
                  <div>
                    <p className="font-semibold">T+1 (Next Day)</p>
                    <p className="text-xs text-muted">
                      Standard settlement by 11 AM the next working day. Zero extra fees.
                    </p>
                  </div>
                </div>
              </label>
              <label className="block p-4 rounded-xl border border-border cursor-pointer">
                <div className="flex items-start gap-3">
                  <input type="radio" name="settlement" className="mt-1" />
                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      Instant
                      <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded">
                        PREMIUM
                      </span>
                    </p>
                    <p className="text-xs text-muted">Settle within 15 mins of order completion.</p>
                  </div>
                </div>
              </label>
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            <h2 className="font-semibold">KYC Checklist</h2>
          </div>
          <p className="text-sm text-muted">Upload required documents to activate settlements.</p>
          {[
            { name: "Business PAN", status: "upload" },
            { name: "GST Certificate", status: "verified" },
            { name: "Cancelled Cheque", status: "pending" },
          ].map((doc) => (
            <div
              key={doc.name}
              className="flex items-center justify-between p-4 rounded-xl border border-border"
            >
              <div>
                <p className="font-medium text-sm">{doc.name}</p>
                <p className="text-xs text-muted">JPEG, PNG or PDF up to 5MB</p>
              </div>
              {doc.status === "upload" && (
                <Button size="sm" variant="primary">Upload</Button>
              )}
              {doc.status === "verified" && (
                <span className="text-xs font-semibold text-customer-accent">Verified ✓</span>
              )}
              {doc.status === "pending" && (
                <span className="text-xs font-semibold text-amber-600">Pending Review</span>
              )}
            </div>
          ))}
          <div className="p-4 rounded-xl bg-primary-light/40 border border-primary/20 flex gap-3 text-sm">
            <Lock size={18} className="text-primary shrink-0" />
            <p className="text-muted">
              Your documents are securely encrypted. Verification usually takes 1–2 business hours.
              You can proceed with setup while we verify.
            </p>
          </div>
        </div>
      </div>

      <Button size="lg" fullWidth className="mt-8" onClick={() => router.push("/merchant/onboarding/qr")}>
        Continue
      </Button>
    </OnboardingLayout>
  );
}
