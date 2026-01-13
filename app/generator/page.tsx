import { ResumeForm } from "@/components/pages/generator/resume-form";
import { PreviewPlaceholder } from "@/components/pages/generator/preview-placeholder";

export default function GeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ResumeForm />
          <PreviewPlaceholder />
        </div>
      </main>
    </div>
  );
}
