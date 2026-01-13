"use client"

import { Button } from "@/components/ui/button"
import { Copy, Wand2, Download, CheckCircle2 } from "lucide-react"

export function ActionToolbar() {
  return (
    <div className="bg-white border-b border-border sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold">Senior UX Designer Resume</h1>
            <div className="flex items-center gap-2 mt-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600 font-medium">Saved</span>
              <span className="text-xs text-muted-foreground">Last edited just now</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            <span>458 words</span>
            <span className="text-border">•</span>
            <span>A4 Size</span>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Copy className="w-4 h-4" />
            Copy Text
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Wand2 className="w-4 h-4" />
            Regenerate
          </Button>
          <Button className="gradient-primary gradient-primary-hover gap-2 text-sm">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
