"use client";

import { useEffect, useState } from "react";
import type { ResumeData } from "@/lib/ai/schema";
import { generateResume } from "@/app/_actions";
import { GeneratedResume } from "./generated-resume";
import { PreviewPlaceholder } from "./preview-placeholder";
import { ResumeForm } from "./resume-form";

export function GeneratorWorkspace() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [input, setInput] = useState<Record<string, unknown> | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenerationError, setRegenerationError] = useState("");

  useEffect(() => {
    try {
      const storedResume = localStorage.getItem("resumeai.resume");
      const storedInput = localStorage.getItem("resumeai.input");
      if (storedResume) setResume(JSON.parse(storedResume) as ResumeData);
      if (storedInput) setInput(JSON.parse(storedInput) as Record<string, unknown>);
    } catch {
      localStorage.removeItem("resumeai.resume");
      localStorage.removeItem("resumeai.input");
    }
  }, []);

  const handleGenerated = (data: ResumeData, formInput: Record<string, unknown>) => {
    setResume(data);
    setInput(formInput);
    localStorage.setItem("resumeai.resume", JSON.stringify(data));
    localStorage.setItem("resumeai.input", JSON.stringify(formInput));
  };

  const handleRegenerate = async () => {
    if (!input) return;
    setIsRegenerating(true);
    setRegenerationError("");
    try {
      handleGenerated(await generateResume(input), input);
    } catch {
      setRegenerationError("Could not regenerate the resume. Check your AI API key and try again.");
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ResumeForm onGenerated={handleGenerated} />
      <div className="min-w-0">
        {regenerationError && <p role="alert" className="mb-3 text-sm text-red-600">{regenerationError}</p>}
        {resume ? <GeneratedResume data={resume} onRegenerate={handleRegenerate} isRegenerating={isRegenerating} /> : <PreviewPlaceholder />}
      </div>
    </div>
  );
}
