"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              B
            </div>
            <span>ResumeAI</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
              Home
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Templates
            </Link>
            <Link href="/generator" className="text-sm text-muted-foreground hover:text-foreground transition">
              Generator
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              How it Works
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-sm">
              Log In
            </Button>
            <Button className="gradient-primary gradient-primary-hover text-sm">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
