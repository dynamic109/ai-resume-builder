import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { Hero } from "@/components/pages/landing/hero"
import { TrustLogos } from "@/components/pages/landing/trust-logos"
import { FeaturesSection } from "@/components/pages/landing/features-section"
import { CTASection } from "@/components/pages/landing/cta-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustLogos />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
