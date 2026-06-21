import { OnboardingLayout } from "@/components/merchant/onboarding-layout";
import { PlanSelector } from "@/components/merchant/plan-selector";

export default function PlanOnboardingPage() {
  return (
    <OnboardingLayout
      step={2}
      title="Choose your plan"
      subtitle="Select a subscription that fits your restaurant"
    >
      <PlanSelector nextHref="/merchant/onboarding/payout" />
    </OnboardingLayout>
  );
}
