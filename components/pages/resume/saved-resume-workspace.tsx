"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { generateResume } from "@/app/_actions";
import { Button } from "@/components/ui/button";
import type { ResumeData } from "@/lib/ai/schema";
import { GeneratedResume } from "@/components/pages/generator/generated-resume";

export function SavedResumeWorkspace() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [input, setInput] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedResume = localStorage.getItem("resumeai.resume");
      const savedInput = localStorage.getItem("resumeai.input");
      if (savedResume) setResume(JSON.parse(savedResume) as ResumeData);
      if (savedInput) setInput(JSON.parse(savedInput) as Record<string, unknown>);
    } catch {
      setError("The saved resume could not be read. Generate a new one to continue.");
    }
  }, []);

  const regenerate = async () => {
    if (!input) return;
    setLoading(true);
    setError("");
    try {
      const result = await generateResume(input);
      setResume(result);
      localStorage.setItem("resumeai.resume", JSON.stringify(result));
    } catch {
      setError("Could not regenerate the resume. Check your AI API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!resume) return (
    <div className="mx-auto max-w-2xl p-12 text-center">
      <h1 className="text-2xl font-bold">No saved resume yet</h1>
      <p className="mt-2 text-muted-foreground">Generate a resume first. It will be saved in this browser.</p>
      {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
      <Button asChild className="mt-6"><Link href="/generator">Create a resume</Link></Button>
    </div>
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="no-print mb-6">
        <h1 className="text-2xl font-bold">{resume.header.title || "Your resume"}</h1>
        <p className="text-sm text-muted-foreground">Saved on this device</p>
        {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
      </header>
      <div className="max-w-4xl"><GeneratedResume data={resume} onRegenerate={regenerate} isRegenerating={loading} /></div>
    </main>
  );
}
