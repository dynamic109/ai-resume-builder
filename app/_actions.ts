"use server";

import { ResumeData, ResumeSchema } from "@/lib/ai/schema";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateResume(formData: unknown): Promise<ResumeData> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
You are a professional resume writer.

RULES:
- Output ONLY valid JSON
- No markdown
- No explanation
- Match this schema exactly

SCHEMA:
${ResumeSchema.toString()}

USER INPUT:
${JSON.stringify(formData)}
            `,
          },
        ],
      },
    ],
  });

  const text = response.text;

  const jsonStart = text?.indexOf("{");
  const jsonEnd = text?.lastIndexOf("}");
  const json = text?.slice(jsonStart, (jsonEnd ?? 0) + 1);

  return ResumeSchema.parse(JSON.parse(json ?? ""));
}
 