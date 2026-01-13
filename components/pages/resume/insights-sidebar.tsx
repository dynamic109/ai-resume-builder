"use client"

import { CheckCircle2, AlertCircle } from "lucide-react"

export function InsightsSidebar() {
  return (
    <div className="space-y-6">
      {/* Resume Score */}
      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">Resume Score</p>
            <p className="text-3xl font-bold">
              85<span className="text-lg text-muted-foreground">/100</span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">✓</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div className="bg-gradient-to-r from-teal-500 to-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
        </div>
        <p className="text-xs text-muted-foreground">
          Your resume is strong! Adding more quantifiable results could boost your score.
        </p>
      </div>

      {/* AI Suggestions */}
      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-indigo-600" />
          AI Suggestions
        </h3>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm">Use stronger action verbs in "Experience".</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm">Add LinkedIn profile URL.</span>
          </li>
        </ul>
        <button className="text-indigo-600 text-xs font-semibold mt-4 hover:text-indigo-700">
          View All Suggestions →
        </button>
      </div>
    </div>
  )
}
