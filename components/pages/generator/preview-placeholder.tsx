"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const templates = [
  { id: "classic", name: "Classic", description: "Centered and traditional", mark: "C" },
  { id: "modern", name: "Modern", description: "Bold two-column layout", mark: "M" },
  { id: "minimal", name: "Minimal", description: "Clean and understated", mark: "—" },
  { id: "executive", name: "Executive", description: "Strong senior profile", mark: "E" },
  { id: "creative", name: "Creative", description: "Distinctive color accents", mark: "✳" },
  { id: "compact", name: "Compact", description: "Simple and space-saving", mark: "≡" },
] as const;

export function PreviewPlaceholder() {
  const [selected, setSelected] = useState("classic");

  useEffect(() => {
    const saved = localStorage.getItem("resumeai.template");
    if (templates.some((template) => template.id === saved)) setSelected(saved!);
  }, []);

  const selectTemplate = (id: string) => {
    setSelected(id);
    localStorage.setItem("resumeai.template", id);
  };

  return (
    <div className="space-y-5">
      <section className="bg-white rounded-xl shadow-sm border border-border p-5" aria-label="Choose resume template">
        <h2 className="text-lg font-semibold mb-1">Choose a template</h2>
        <p className="text-sm text-muted-foreground mb-4">Pick a style now. You can change it after generating, too.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => selectTemplate(template.id)}
              aria-pressed={selected === template.id}
              className={`min-h-24 rounded-lg border p-3 text-left transition-colors ${selected === template.id ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600" : "border-border hover:border-indigo-300"}`}
            >
              <span className={`mb-2 flex h-8 w-8 items-center justify-center rounded border text-sm font-bold ${selected === template.id ? "border-indigo-300 bg-white text-indigo-700" : "border-gray-200 bg-gray-50 text-gray-500"}`}>{template.mark}</span>
              <span className="block text-sm font-medium">{template.name}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{template.description}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="min-h-56 bg-white rounded-xl shadow-sm border border-border p-8 flex flex-col items-center justify-center text-center">
        <Sparkles className="w-10 h-10 text-indigo-400 mb-3" />
        <h3 className="font-medium">Resume preview</h3>
        <p className="mt-1 text-sm text-muted-foreground">Your resume will appear here after you generate it.</p>
      </div>
    </div>
  );
}
