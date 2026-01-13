"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CTAButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function CTAButton({ children, onClick, className = "" }: CTAButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`gradient-primary gradient-primary-hover rounded-full px-8 py-6 text-base font-semibold flex items-center gap-2 ${className}`}
    >
      {children}
      <ArrowRight className="w-4 h-4" />
    </Button>
  )
}
