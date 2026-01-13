"use client"

import { User } from "lucide-react"

export function AITooltip() {
  return (
    <div className="absolute top-32 right-8 bg-white rounded-xl shadow-lg p-4 max-w-xs">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
            <p className="text-sm font-semibold">AI Suggestion</p>
          </div>
          <p className="text-xs text-gray-600">
            Stronger verbs: Replaced "Worked on" with "Spearheaded" to show leadership.
          </p>
          <div className="flex gap-2 mt-3">
            <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded font-medium">Apply</button>
            <button className="text-xs text-gray-600 px-3 py-1">Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  )
}
