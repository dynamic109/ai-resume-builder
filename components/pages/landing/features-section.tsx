"use client"

import { FeatureCard } from "./feature-card"
import { Cloud, Wand2, Download } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Supercharge your career in 3 steps</h2>
        <p className="text-lg text-muted-foreground">Simple, fast, and effective. No design skills needed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Cloud className="w-6 h-6" />}
          title="Upload or Enter Details"
          description="Import your LinkedIn profile or start from scratch. We support PDF and Word formats."
        />
        <FeatureCard
          icon={<Wand2 className="w-6 h-6" />}
          title="AI Generation"
          description="Our smart engine writes bullet points and cover letters for you based on your role."
        />
        <FeatureCard
          icon={<Download className="w-6 h-6" />}
          title="Download & Apply"
          description="Export as PDF or Word and start applying instantly with a polished, professional resume."
        />
      </div>
    </section>
  )
}
