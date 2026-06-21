import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AeroDineLogo } from "@/components/brand/aerodine-logo";

const STEPS = ["Profile", "Plan", "Payout", "QR Setup"];

export function OnboardingLayout({
  step,
  title,
  subtitle,
  children,
}: {
  step: number;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Link href="/" className="p-2 -ml-2 rounded-lg hover:bg-stone-100">
            <ArrowLeft size={20} />
          </Link>
          <AeroDineLogo size="sm" />
          <span className="text-xs font-semibold text-muted w-8"> {step}/{STEPS.length}</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1">
              <div
                className={`h-1.5 rounded-full ${
                  i + 1 <= step ? "bg-primary" : "bg-stone-200"
                }`}
              />
              <p className="text-[10px] text-muted mt-1 hidden sm:block">{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-3xl border border-border p-6 shadow-sm animate-slide-up">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-sm text-muted mt-1 mb-6">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
