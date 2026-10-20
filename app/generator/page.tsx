import { GeneratorWorkspace } from "@/components/pages/generator/generator-workspace";

export default function GeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <GeneratorWorkspace />
      </main>
    </div>
  );
}
