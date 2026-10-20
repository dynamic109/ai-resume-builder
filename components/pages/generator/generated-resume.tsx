"use client";

import { useEffect, useState } from "react";
import { Copy, Download, RefreshCw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ResumeData } from "@/lib/ai/schema";

interface GeneratedResumeProps {
  data: ResumeData;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

const templates = [
  { id: "classic", name: "Classic", description: "Centered and traditional" },
  { id: "modern", name: "Modern", description: "Two-column with a bold sidebar" },
  { id: "minimal", name: "Minimal", description: "Clean, compact typography" },
  { id: "executive", name: "Executive", description: "Strong header for senior roles" },
  { id: "creative", name: "Creative", description: "Color accents and open spacing" },
  { id: "compact", name: "Compact", description: "Simple layout with tight spacing" },
] as const;

type TemplateId = (typeof templates)[number]["id"];

const templateStyles: Record<TemplateId, { page: string; header: string; name: string; title: string; section: string; accent: string }> = {
  classic: {
    page: "p-10 space-y-5", header: "text-center border-b pb-4", name: "text-2xl font-bold", title: "text-indigo-600", section: "border-b border-gray-200 pb-1", accent: "text-indigo-600",
  },
  modern: {
    page: "p-0 grid grid-cols-[34%_1fr] gap-0", header: "col-span-2 bg-slate-900 text-white p-8", name: "text-2xl font-bold", title: "text-indigo-200", section: "border-b border-indigo-200 pb-1", accent: "text-indigo-700",
  },
  minimal: {
    page: "p-10 space-y-4", header: "border-b-2 border-gray-900 pb-4", name: "text-2xl font-semibold tracking-tight", title: "text-gray-600", section: "border-b border-gray-300 pb-1", accent: "text-gray-700",
  },
  executive: {
    page: "p-0 space-y-5", header: "bg-slate-800 text-white px-10 py-8 border-b-4 border-amber-500", name: "text-3xl font-bold tracking-wide", title: "text-amber-300", section: "border-b-2 border-slate-700 pb-1", accent: "text-slate-800",
  },
  creative: {
    page: "p-10 space-y-6 border-l-8 border-fuchsia-500", header: "border-b-2 border-fuchsia-200 pb-4", name: "text-3xl font-bold text-slate-900", title: "text-fuchsia-700", section: "border-l-4 border-fuchsia-400 pl-3", accent: "text-fuchsia-700",
  },
  compact: {
    page: "p-8 space-y-3", header: "text-center border-b border-slate-400 pb-3", name: "text-xl font-bold", title: "text-slate-700", section: "border-b border-slate-300 pb-1", accent: "text-slate-700",
  },
};

export function GeneratedResume({ data, onRegenerate, isRegenerating }: GeneratedResumeProps) {
  const [selected, setSelected] = useState<TemplateId>("classic");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("resumeai.template");
    if (templates.some((template) => template.id === saved)) setSelected(saved as TemplateId);
  }, []);
  const style = templateStyles[selected];
  const isSidebar = selected === "modern";
  const headingClass = `font-bold text-xs uppercase tracking-wider mb-2 ${style.accent} ${style.section}`;

  const resumeText = [
    data.header.name, data.header.title, data.header.email, data.header.phone, data.header.location,
    "", "PROFESSIONAL SUMMARY", data.summary, "", "EXPERIENCE",
    ...data.experience.flatMap((item) => [`${item.role} — ${item.company} (${item.startDate} – ${item.endDate})`, ...item.bullets.map((bullet) => `• ${bullet}`)]),
    "", "EDUCATION", ...data.education.map((item) => `${item.degree} — ${item.school} (${item.startYear} – ${item.endYear})`),
    "", "SKILLS", data.skills.join(", "),
  ].filter((line) => line !== undefined).join("\n");

  const saveResume = () => {
    localStorage.setItem("resumeai.resume", JSON.stringify(data));
    localStorage.setItem("resumeai.template", selected);
    setNotice("Resume saved on this device.");
  };

  const copyResume = async () => {
    try {
      await navigator.clipboard.writeText(resumeText);
      setNotice("Resume text copied.");
    } catch {
      setNotice("Clipboard access is unavailable in this browser.");
    }
  };

  const downloadPdf = () => {
    const preview = document.querySelector<HTMLElement>(".print-area");
    if (!preview) return;

    const printWindow = window.open("", "resume-pdf", "width=900,height=700");
    if (!printWindow) {
      setNotice("Allow pop-ups to open the CV for PDF download.");
      return;
    }

    const styles = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
      .map((link) => `<link rel="stylesheet" href="${link.href}">`)
      .join("");
    const inlineStyles = Array.from(document.querySelectorAll("style"))
      .map((styleTag) => styleTag.outerHTML)
      .join("");
    printWindow.document.open();
    printWindow.document.write(`<!doctype html><html><head><title>${data.header.name || "Resume"}</title><base href="${window.location.origin}/">${styles}${inlineStyles}<style>@page{size:A4;margin:12mm}html,body{margin:0;padding:0;background:white}.print-area{width:100%;min-height:0!important;box-shadow:none!important;overflow:visible!important}</style></head><body>${preview.outerHTML}</body></html>`);
    printWindow.addEventListener("load", () => {
      printWindow.focus();
      printWindow.print();
      printWindow.addEventListener("afterprint", () => printWindow.close(), { once: true });
    }, { once: true });
    printWindow.document.close();
  };

  const selectTemplate = (template: TemplateId) => {
    setSelected(template);
    localStorage.setItem("resumeai.template", template);
  };

  return (
    <section className="w-full space-y-4" aria-label="Resume templates and preview">
      <div className="no-print flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={saveResume}><Save className="size-4" />Save</Button>
        <Button type="button" variant="outline" size="sm" onClick={copyResume}><Copy className="size-4" />Copy text</Button>
        <Button asChild type="button" variant="outline" size="sm"><Link href="/resume">Open saved resume</Link></Button>
        {onRegenerate && <Button type="button" variant="outline" size="sm" onClick={onRegenerate} disabled={isRegenerating}><RefreshCw className="size-4" />{isRegenerating ? "Regenerating…" : "Regenerate"}</Button>}
        <Button type="button" size="sm" onClick={downloadPdf}><Download className="size-4" />Download PDF</Button>
      </div>
      {notice && <p role="status" className="no-print text-sm text-muted-foreground">{notice}</p>}
      <div className="no-print">
        <h2 className="text-lg font-semibold mb-2">Choose a template</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => selectTemplate(template.id)}
              aria-pressed={selected === template.id}
              className={`rounded-lg border p-3 text-left transition-colors ${selected === template.id ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600" : "border-border hover:border-indigo-300"}`}
            >
              <span className="block text-sm font-medium">{template.name}</span>
              <span className="block mt-1 text-xs text-muted-foreground">{template.description}</span>
            </button>
          ))}
        </div>
      </div>

      <article className="print-area bg-white rounded-lg shadow-lg overflow-hidden text-gray-800">
        <div className={`min-h-[800px] text-sm ${style.page}`}>
          <header className={style.header}>
            <h1 className={`${style.name} ${selected === "executive" || selected === "modern" ? "text-white" : "text-gray-900"}`}>{data.header.name}</h1>
            <p className={`text-sm font-semibold tracking-wide uppercase mt-1 ${style.title}`}>{data.header.title}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-xs">
              <span>{data.header.email}</span>
              {data.header.phone && <span>{data.header.phone}</span>}
              {data.header.location && <span>{data.header.location}</span>}
              {data.header.website && <span>{data.header.website}</span>}
              {data.header.linkedin && <span>{data.header.linkedin}</span>}
            </div>
          </header>

          {isSidebar && <aside className="bg-slate-100 p-6 space-y-5">
            <section><h2 className={headingClass}>Key Skills</h2><ul className="space-y-1 text-xs">{data.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></section>
            <section><h2 className={headingClass}>Education</h2>{data.education.map((edu, index) => <div key={index} className="mb-3 text-xs"><p className="font-semibold">{edu.degree}</p><p>{edu.school}</p><p className="text-gray-500">{edu.startYear} – {edu.endYear}</p></div>)}</section>
          </aside>}

          <div className={`${isSidebar ? "p-6" : ""} space-y-5`}>
            <section><h2 className={headingClass}>Professional Summary</h2><p className="text-xs leading-relaxed">{data.summary}</p></section>
            <section>
              <h2 className={headingClass}>Experience</h2>
              <div className="space-y-4">{data.experience.map((exp, index) => <div key={index}>
                <div className="flex justify-between items-start gap-3"><div><p className="font-semibold text-xs">{exp.company}</p><p className={`text-xs ${style.accent}`}>{exp.role}</p></div><p className="text-xs whitespace-nowrap">{exp.startDate} – {exp.endDate}</p></div>
                <ul className="mt-1 space-y-1 text-xs list-disc pl-4">{exp.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}</ul>
              </div>)}</div>
            </section>
            {!isSidebar && <>
              <section><h2 className={headingClass}>Education</h2><div className="space-y-2">{data.education.map((edu, index) => <div key={index} className="flex justify-between items-start gap-3 text-xs"><div><p className="font-semibold">{edu.degree}</p><p className="text-gray-600">{edu.school}</p></div><p className="whitespace-nowrap">{edu.startYear} – {edu.endYear}</p></div>)}</div></section>
              <section><h2 className={headingClass}>Key Skills</h2><div className="flex flex-wrap gap-2">{data.skills.map((skill) => <span key={skill} className={`px-2 py-1 rounded text-xs ${selected === "classic" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-700"}`}>{skill}</span>)}</div></section>
            </>}
          </div>
        </div>
      </article>
    </section>
  );
}
