"use server";

import { ResumeSchema, type ResumeData } from "@/lib/ai/schema";
import { GoogleGenAI } from "@google/genai";

export async function generateResume(formData: unknown): Promise<ResumeData> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const input = formData as Record<string, unknown>;
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    config: { responseMimeType: "application/json" },
    contents: [{
      role: "user",
      parts: [{
        text: `Write a polished resume using only the facts in the user input. Never invent employers, education, dates, contact details, certifications, skills, accomplishments, or numerical results. Rewrite and organize supplied experience details, but if a fact is absent, leave its field empty or omit that item. Return only valid JSON matching this shape:
{"header":{"name":"","title":"","email":"","phone":"","location":"","website":"","linkedin":""},"summary":"","experience":[{"company":"","role":"","startDate":"","endDate":"","bullets":[""]}],"education":[{"school":"","degree":"","startYear":"","endYear":""}],"skills":[""]}

User input:
${JSON.stringify(input)}`,
      }],
    }],
  });

  const text = response.text?.trim();
  if (!text) throw new Error("The AI returned an empty response.");
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  if (jsonStart < 0 || jsonEnd < jsonStart) throw new Error("The AI response was not valid JSON.");
  const generated = ResumeSchema.parse(JSON.parse(text.slice(jsonStart, jsonEnd + 1)));

  // Keep user supplied identity and credentials authoritative.
  return ResumeSchema.parse({
    ...generated,
    header: {
      ...generated.header,
      name: String(input.name ?? ""),
      title: String(input.targetJobTitle ?? ""),
      email: String(input.email ?? ""),
      phone: String(input.phone ?? ""),
      location: String(input.location ?? ""),
      website: String(input.website ?? ""),
      linkedin: String(input.linkedin ?? ""),
    },
    skills: Array.isArray(input.skills) ? input.skills.map(String) : [],
    experience: Array.isArray(input.experience) ? input.experience.map((item) => {
      const entry = item as Record<string, unknown>;
      return {
        company: String(entry.company ?? ""), role: String(entry.role ?? ""),
        startDate: String(entry.startDate ?? ""), endDate: String(entry.endDate ?? ""),
        bullets: String(entry.details ?? "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean),
      };
    }).filter((entry) => entry.company || entry.role || entry.bullets.length) : [],
    education: Array.isArray(input.education) ? input.education.map((item) => {
      const entry = item as Record<string, unknown>;
      return {
        school: String(entry.school ?? ""), degree: String(entry.degree ?? ""),
        startYear: String(entry.startYear ?? ""), endYear: String(entry.endYear ?? ""),
      };
    }).filter((entry) => entry.school || entry.degree) : [],
  });
}
