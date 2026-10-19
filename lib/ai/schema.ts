import { z } from "zod";

export const ResumeSchema = z.object({
  header: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    linkedin: z.string().optional(),
  }),
  summary: z.string(),
  experience: z.array(
    z.object({
      company: z.string(),
      role: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      bullets: z.array(z.string()),
    }),
  ),
  education: z.array(
    z.object({
      school: z.string(),
      degree: z.string(),
      startYear: z.string(),
      endYear: z.string(),
    }),
  ),
  skills: z.array(z.string()),
});

export type ResumeData = z.infer<typeof ResumeSchema>;
