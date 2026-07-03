import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AeroDineLogo } from "@/components/brand/aerodine-logo";

const STEP_TITLES = [
  "Business Info",
  "Select a Plan",
  "Secure Setup",
  "Table QR Setup",
];

export function OnboardingLayout({
  step,
  title,
  subtitle,
  children,
  footer,
}: {
  step: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href={step > 1 ? `/merchant/onboarding/${["profile", "plan", "payout", "qr"][step - 2]}` : "/merchant/signup"}
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <AeroDineLogo size="sm" />
          <Link href="/merchant/dashboard" className="text-sm text-muted hover:text-foreground">
            Save & exit
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
          </div>
          <span className="text-sm font-medium text-muted shrink-0">
            Step {step} of 4
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 lg:p-8 shadow-sm animate-slide-up">
          {children}
        </div>

        {footer && <div className="mt-6">{footer}</div>}

        <p className="text-center text-xs text-muted mt-6">
          {STEP_TITLES[step - 1]}
        </p>
      </div>
    </div>
  );
}
