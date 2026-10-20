"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface CTAButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
}

export function CTAButton({ children, onClick, href, className = "" }: CTAButtonProps) {
  const buttonClassName = `gradient-primary gradient-primary-hover w-fit rounded-full px-8 py-6 text-base font-semibold inline-flex items-center gap-2 ${className}`

  if (href) {
    return (
      <Button asChild className={buttonClassName}>
        <Link href={href}>
          {children}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    )
  }

  const button = (
    <Button
      onClick={onClick}
      className={buttonClassName}
    >
      {children}
      <ArrowRight className="w-4 h-4" />
    </Button>
  )

  return button
}
