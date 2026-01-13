import { Sparkles, Info } from "lucide-react";

export function PreviewPlaceholder() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-border p-8 h-full flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center gap-4 text-center opacity-50">
        <Sparkles className="w-12 h-12 text-indigo-400" />
        <p className="text-sm text-muted-foreground">Fill details to preview</p>
      </div>

      <div className="absolute -top-10 lg:-top-28 right-0 bg-indigo-50 border border-indigo-200 rounded-lg p-4 max-w-xs shadow-lg">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-indigo-900 mb-1">
              Tip: Adding a Job Description increases ATS compatibility by 40%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
