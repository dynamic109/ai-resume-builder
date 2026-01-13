"use client"

export function ResumePreviewCard() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-3 filter blur-sm opacity-60">
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        <div className="h-2 bg-indigo-200 rounded w-1/4"></div>
        <div className="space-y-2 mt-6">
          <div className="h-2 bg-gray-200 rounded"></div>
          <div className="h-2 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="h-3 bg-gray-800 rounded w-2/3 mt-4"></div>
        <div className="space-y-2">
          <div className="h-2 bg-gray-200 rounded"></div>
          <div className="h-2 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}
