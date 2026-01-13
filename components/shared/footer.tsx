"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                B
              </div>
              <span>ResumeAI</span>
            </div>
            <p className="text-xs text-muted-foreground">© 2026 ResumeAI Inc. All rights reserved.</p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold">Product</h4>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold">Support</h4>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Contact Support
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold">Follow</h4>
            <div className="flex gap-2">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>Trusted by job seekers at top companies</p>
        </div>
      </div>
    </footer>
  )
}
