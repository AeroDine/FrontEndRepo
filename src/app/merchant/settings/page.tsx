import { MerchantShell } from "@/components/layout/merchant-shell";
import { PlanSelector } from "@/components/merchant/plan-selector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <MerchantShell>
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold">Settings & Subscription</h1>
          <p className="text-sm text-muted">Manage your restaurant profile and plan</p>
        </div>

        <section className="p-5 rounded-2xl bg-card border border-border space-y-4">
          <h2 className="font-bold">Restaurant Details</h2>
          <Input id="name" label="Restaurant name" defaultValue="Spice Garden" />
          <Input id="gst" label="GST number" defaultValue="27AABCU9603R1ZM" />
          <Input id="phone" label="Owner phone" defaultValue="+91 98765 43210" />
          <Input id="email" label="Owner email" defaultValue="rajan@spicegarden.in" />
          <Button>Save Changes</Button>
        </section>

        <section className="p-5 rounded-2xl bg-card border border-border space-y-4">
          <h2 className="font-bold">Billing Details</h2>
          <Input id="billing-address" label="Billing address" defaultValue="Shop 12, FC Road, Pune" />
          <Input id="billing-gst" label="Billing GSTIN" defaultValue="27AABCU9603R1ZM" />
        </section>

        <section className="p-5 rounded-2xl bg-card border border-border space-y-4">
          <h2 className="font-bold">Current Plan</h2>
          <p className="text-sm text-muted">Next billing date: 1 July 2026</p>
          <PlanSelector nextHref="/merchant/settings" />
        </section>
      </div>
    </MerchantShell>
  );
}
