import { ResumeForm } from "@/components/pages/generator/resume-form";
import { GeneratedResume } from "@/components/pages/generator/generated-resume";
import { ResumeData } from "@/data/data";
import { generateResume } from "../_actions";
import { PreviewPlaceholder } from "@/components/pages/generator/preview-placeholder";

export default async function GeneratorPage() {
  let resumeData = null;
  let error = null;

  try {
    resumeData = await generateResume(ResumeData);
  } catch (err) {
    console.error("Gemini error:", err);
    error = "Failed to generate resume";
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ResumeForm />
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              {error}
            </div>
          ) : resumeData ? (
            <GeneratedResume data={resumeData} />
          ) : (
            <PreviewPlaceholder />
          )}
        </div>
      </main>
    </div>
  );
}
