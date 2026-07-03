import Link from "next/link";
import { ArrowRight, QrCode, Smartphone, Store } from "lucide-react";
import { AeroDineLogo } from "@/components/brand/aerodine-logo";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <AeroDineLogo showTagline size="lg" />
        <div className="flex gap-3">
          <Link href="/merchant/login">
            <Button variant="ghost" size="sm">Merchant Login</Button>
          </Link>
          <Link href="/merchant/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-semibold">
            <QrCode size={16} />
            Two distinct journeys — one platform
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            AeroDine
          </h1>
          <p className="text-lg text-muted">
            Customer QR ordering and merchant operations — built from your UXPilot designs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">
          <Link
            href="/order/welcome"
            className="group p-8 rounded-3xl bg-white border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-customer-accent/10 text-customer-accent flex items-center justify-center mb-4">
              <Smartphone size={24} />
            </div>
            <h2 className="text-xl font-bold mb-2">Customer Flow</h2>
            <p className="text-sm text-muted mb-6">
              Scan table QR → sign in → browse menu → review order → checkout → live status.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-customer-accent group-hover:gap-3 transition-all">
              Try customer journey
              <ArrowRight size={16} />
            </span>
          </Link>

          <Link
            href="/merchant/signup"
            className="group p-8 rounded-3xl bg-[#0a1628] text-white border border-white/10 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-4">
              <Store size={24} />
            </div>
            <h2 className="text-xl font-bold mb-2">Merchant Flow</h2>
            <p className="text-sm text-white/70 mb-6">
              Sign up → business setup → plan → payouts → QR codes → dashboard, orders, KDS & reports.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
              Start merchant onboarding
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
