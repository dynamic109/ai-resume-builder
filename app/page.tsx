import { Hero } from "@/components/pages/landing/hero";
import { FeaturesSection } from "@/components/pages/landing/features-section";
import { CTASection } from "@/components/pages/landing/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
