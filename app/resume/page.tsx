import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { ActionToolbar } from "@/components/pages/resume/action-toolbar"
import { ResumePreview } from "@/components/pages/resume/resume-preview"
import { InsightsSidebar } from "@/components/pages/resume/insights-sidebar"

export default function ResumePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <ActionToolbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ResumePreview />
          </div>
          <div>
            <InsightsSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
