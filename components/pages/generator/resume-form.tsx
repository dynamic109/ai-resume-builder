"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

export function ResumeForm() {
  const [skills, setSkills] = useState([
    "Figma",
    "React",
    "User Research",
    "Prototyping",
  ]);
  const [skillInput, setSkillInput] = useState("");
  const [tone, setTone] = useState("professional");

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
      e.preventDefault();
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border py-8 px-4 md:px-8">
      <h2 className="text-2xl font-bold mb-2">Resume Details</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Provide your professional details to generate a tailored resume.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Target Job Title
            </label>
            <Input
              placeholder="Senior UX Designer"
              defaultValue="Senior UX Designer"
              className="bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Industry</label>
            <Select defaultValue="tech">
              <SelectTrigger className="bg-white w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Experience Level
            </label>
            <Select defaultValue="senior">
              <SelectTrigger className="bg-white w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Years of Experience
            </label>
            <Input
              type="number"
              placeholder="5"
              defaultValue="5"
              className="bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Key Skills</label>
          <div className="bg-white border border-input rounded-lg p-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="cursor-pointer hover:bg-red-100"
                onClick={() => handleRemoveSkill(skill)}
              >
                {skill}
                <span className="ml-1 opacity-60">×</span>
              </Badge>
            ))}
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Press Enter to add a skill."
              className="flex-1 outline-none text-sm bg-transparent min-w-32"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to add a skill.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Writing Tone</label>
          <ToggleGroup
            value={tone}
            onValueChange={setTone}
            type="single"
            className="w-full"
          >
            <ToggleGroupItem
              value="professional"
              className="border-indigo-200 data-[state=on]:bg-indigo-100 data-[state=on]:text-indigo-600"
            >
              Professional
            </ToggleGroupItem>
            <ToggleGroupItem
              value="creative"
              className="border-indigo-200 data-[state=on]:bg-indigo-100 data-[state=on]:text-indigo-600"
            >
              Creative
            </ToggleGroupItem>
            <ToggleGroupItem
              value="confident"
              className="border-indigo-200 data-[state=on]:bg-indigo-100 data-[state=on]:text-indigo-600"
            >
              Confident
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Job Description{" "}
            <span className="text-muted-foreground">(Optional)</span>
          </label>
          <Textarea
            placeholder="Paste the job description here for better keyword matching..."
            className="min-h-32 bg-white resize-none"
          />
        </div>

        <Button className="w-full gradient-primary gradient-primary-hover rounded-lg h-12 font-semibold text-base">
          <Zap className="w-4 h-4 mr-2" />
          Generate with AI
        </Button>
      </div>
    </div>
  );
}
