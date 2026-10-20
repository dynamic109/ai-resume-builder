"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { generateResume } from "@/app/_actions";
import type { ResumeData } from "@/lib/ai/schema";

type ExperienceInput = { company: string; role: string; startDate: string; endDate: string; details: string };
type EducationInput = { school: string; degree: string; startYear: string; endYear: string };
const blankExperience = (): ExperienceInput => ({ company: "", role: "", startDate: "", endDate: "", details: "" });
const blankEducation = (): EducationInput => ({ school: "", degree: "", startYear: "", endYear: "" });

interface ResumeFormProps {
  onGenerated: (resume: ResumeData, input: Record<string, unknown>) => void;
}

export function ResumeForm({ onGenerated }: ResumeFormProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [experience, setExperience] = useState<ExperienceInput[]>([blankExperience()]);
  const [education, setEducation] = useState<EducationInput[]>([blankEducation()]);
  const [tone, setTone] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGenerating(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    const input: Record<string, unknown> = {
      name: formData.get("name"), email: formData.get("email"), phone: formData.get("phone"),
      location: formData.get("location"), website: formData.get("website"), linkedin: formData.get("linkedin"),
      targetJobTitle: formData.get("targetJobTitle"), industry: formData.get("industry"),
      experienceLevel: formData.get("experienceLevel"), yearsOfExperience: formData.get("yearsOfExperience"),
      skills, tone, jobDescription: formData.get("jobDescription"),
      experience: experience.filter((item) => item.company || item.role || item.details),
      education: education.filter((item) => item.school || item.degree),
    };
    try {
      onGenerated(await generateResume(input), input);
    } catch (err) {
      console.error("Resume generation failed:", err);
      setError("Could not generate your resume. Check your AI API key and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const updateExperience = (index: number, field: keyof ExperienceInput, value: string) =>
    setExperience((items) => items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  const updateEducation = (index: number, field: keyof EducationInput, value: string) =>
    setEducation((items) => items.map((item, i) => i === index ? { ...item, [field]: value } : item));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border py-8 px-4 md:px-8">
      <h2 className="text-2xl font-bold mb-2">Resume Details</h2>
      <p className="text-sm text-muted-foreground mb-8">Add your real details. The AI will improve the wording without inventing experience.</p>
      <form onSubmit={handleSubmit} className="space-y-7">
        <section className="space-y-3">
          <h3 className="font-semibold">Contact information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input name="name" aria-label="Full name" placeholder="Full name" required />
            <Input name="email" type="email" aria-label="Email" placeholder="Email address" required />
            <Input name="phone" aria-label="Phone" placeholder="Phone (optional)" />
            <Input name="location" aria-label="Location" placeholder="City, country (optional)" />
            <Input name="website" aria-label="Website" placeholder="Website (optional)" />
            <Input name="linkedin" aria-label="LinkedIn" placeholder="LinkedIn URL (optional)" />
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold">Target role</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input name="targetJobTitle" placeholder="Target job title" required />
            <Select name="industry"><SelectTrigger className="w-full"><SelectValue placeholder="Select industry" /></SelectTrigger><SelectContent>
              <SelectItem value="tech">Technology</SelectItem><SelectItem value="finance">Finance</SelectItem><SelectItem value="healthcare">Healthcare</SelectItem><SelectItem value="marketing">Marketing</SelectItem><SelectItem value="other">Other</SelectItem>
            </SelectContent></Select>
            <Select name="experienceLevel"><SelectTrigger className="w-full"><SelectValue placeholder="Experience level" /></SelectTrigger><SelectContent>
              <SelectItem value="entry">Entry level</SelectItem><SelectItem value="mid">Mid level</SelectItem><SelectItem value="senior">Senior</SelectItem><SelectItem value="executive">Executive</SelectItem>
            </SelectContent></Select>
            <Input name="yearsOfExperience" type="number" min="0" placeholder="Years of experience" />
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between"><h3 className="font-semibold">Work history</h3><Button type="button" variant="outline" size="sm" onClick={() => setExperience((items) => [...items, blankExperience()])}>Add role</Button></div>
          {experience.map((item, index) => <div key={index} className="rounded-lg border p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input aria-label={`Company ${index + 1}`} placeholder="Company" value={item.company} onChange={(e) => updateExperience(index, "company", e.target.value)} />
              <Input aria-label={`Job title ${index + 1}`} placeholder="Job title" value={item.role} onChange={(e) => updateExperience(index, "role", e.target.value)} />
              <Input aria-label={`Start date ${index + 1}`} placeholder="Start date" value={item.startDate} onChange={(e) => updateExperience(index, "startDate", e.target.value)} />
              <Input aria-label={`End date ${index + 1}`} placeholder="End date or Present" value={item.endDate} onChange={(e) => updateExperience(index, "endDate", e.target.value)} />
            </div>
            <Textarea aria-label={`Achievements ${index + 1}`} placeholder="Responsibilities and achievements (one per line)" value={item.details} onChange={(e) => updateExperience(index, "details", e.target.value)} />
            {experience.length > 1 && <Button type="button" variant="ghost" size="sm" onClick={() => setExperience((items) => items.filter((_, i) => i !== index))}>Remove role</Button>}
          </div>)}
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between"><h3 className="font-semibold">Education</h3><Button type="button" variant="outline" size="sm" onClick={() => setEducation((items) => [...items, blankEducation()])}>Add education</Button></div>
          {education.map((item, index) => <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-lg border p-4">
            <Input aria-label={`School ${index + 1}`} placeholder="School or institution" value={item.school} onChange={(e) => updateEducation(index, "school", e.target.value)} />
            <Input aria-label={`Degree ${index + 1}`} placeholder="Degree or qualification" value={item.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} />
            <Input aria-label={`Education start year ${index + 1}`} placeholder="Start year" value={item.startYear} onChange={(e) => updateEducation(index, "startYear", e.target.value)} />
            <Input aria-label={`Education end year ${index + 1}`} placeholder="End year" value={item.endYear} onChange={(e) => updateEducation(index, "endYear", e.target.value)} />
            {education.length > 1 && <Button type="button" variant="ghost" size="sm" onClick={() => setEducation((items) => items.filter((_, i) => i !== index))}>Remove education</Button>}
          </div>)}
        </section>

        <section>
          <h3 className="font-semibold mb-2">Key skills</h3>
          <div className="bg-white border border-input rounded-lg p-3 flex flex-wrap gap-2">
            {skills.map((skill) => <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => setSkills((items) => items.filter((entry) => entry !== skill))}>{skill}<span className="ml-1 opacity-60">×</span></Badge>)}
            <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && skillInput.trim()) { e.preventDefault(); setSkills((items) => [...items, skillInput.trim()]); setSkillInput(""); } }} placeholder="Add a skill and press Enter" className="flex-1 outline-none text-sm bg-transparent min-w-32" />
          </div>
        </section>

        <section>
          <h3 className="font-semibold mb-3">Writing tone</h3>
          <ToggleGroup value={tone} onValueChange={(value) => value && setTone(value)} type="single" className="w-full">
            <ToggleGroupItem value="professional" className="border-indigo-200 data-[state=on]:bg-indigo-100 data-[state=on]:text-indigo-600">Professional</ToggleGroupItem>
            <ToggleGroupItem value="creative" className="border-indigo-200 data-[state=on]:bg-indigo-100 data-[state=on]:text-indigo-600">Creative</ToggleGroupItem>
            <ToggleGroupItem value="confident" className="border-indigo-200 data-[state=on]:bg-indigo-100 data-[state=on]:text-indigo-600">Confident</ToggleGroupItem>
          </ToggleGroup>
        </section>

        <section><h3 className="font-semibold mb-2">Job description <span className="font-normal text-muted-foreground">(optional)</span></h3><Textarea name="jobDescription" placeholder="Paste the job description for keyword matching" className="min-h-32 bg-white resize-none" /></section>
        <Button type="submit" disabled={isGenerating} className="w-full gradient-primary gradient-primary-hover rounded-lg h-12 font-semibold text-base"><Zap className="w-4 h-4 mr-2" />{isGenerating ? "Generating…" : "Generate with AI"}</Button>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}
