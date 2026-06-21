import Link from "next/link";
import {
  ArrowRight,
  ChefHat,
  QrCode,
  Smartphone,
  Store,
} from "lucide-react";
import { AeroDineLogo } from "@/components/brand/aerodine-logo";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-background to-amber-50">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <AeroDineLogo showTagline size="lg" />
        <div className="flex gap-3">
          <Link href="/merchant/login">
            <Button variant="ghost" size="sm">
              Merchant Login
            </Button>
          </Link>
          <Link href="/merchant/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary-dark text-sm font-semibold">
              <QrCode size={16} />
              QR Restaurant Ordering Platform
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Scan. Order. Pay.
              <br />
              <span className="text-primary">At your table.</span>
            </h1>
            <p className="text-lg text-muted max-w-lg">
              AeroDine helps restaurants serve faster with digital menus, kitchen
              displays, and seamless UPI payments — no app download required for
              customers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/order/welcome">
                <Button size="lg">
                  Try Customer Flow
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/merchant/signup">
                <Button variant="outline" size="lg">
                  Merchant Onboarding
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Smartphone,
                title: "Customer UX",
                desc: "Mobile-first QR ordering from scan to live order status.",
                href: "/order/welcome",
              },
              {
                icon: Store,
                title: "Merchant Portal",
                desc: "Onboarding, dashboard, kitchen display, and menu management.",
                href: "/merchant/dashboard",
              },
              {
                icon: ChefHat,
                title: "Kitchen Display",
                desc: "Real-time tickets sorted by age with status updates.",
                href: "/merchant/kitchen",
              },
              {
                icon: QrCode,
                title: "Table QR Codes",
                desc: "Generate and print QR stickers for every table.",
                href: "/merchant/onboarding/qr",
              },
            ].map(({ icon: Icon, title, desc, href }) => (
              <Link
                key={title}
                href={href}
                className="group p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} AeroDine · Freedom Security Solutions
      </footer>
    </div>
  );
}
