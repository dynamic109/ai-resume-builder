"use client"

import { CTAButton } from "@/components/shared/cta-button"
import { ResumePreviewCard } from "./resume-preview-card"
import { AITooltip } from "./ai-tooltip"

export function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
        Create Job-Winning Resumes
        <br />
        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          & Cover Letters with AI
        </span>
      </h1>

      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
        Build professional, ATS-friendly resumes in minutes. Our AI analyzes your experience and writes tailored content
        to help you get hired faster.
      </p>

      <CTAButton className="mx-auto mb-12">Generate Now</CTAButton>

      <div className="relative">
        <ResumePreviewCard />
        <AITooltip />
      </div>
    </section>
  )
}
