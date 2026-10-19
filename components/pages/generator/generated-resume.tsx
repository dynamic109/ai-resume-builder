"use client";

import { ResumeData } from "@/lib/ai/schema";

interface GeneratedResumeProps {
  data: ResumeData;
}

export function GeneratedResume({ data }: GeneratedResumeProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-[8.5/11] bg-white p-12 text-sm text-gray-800 space-y-4 overflow-auto max-h-96 md:max-h-full">
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold">{data.header.name}</h1>
          <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">
            {data.header.title}
          </p>
          <div className="flex justify-center flex-wrap gap-4 mt-2 text-xs">
            <span>{data.header.email}</span>
            {data.header.phone && <span>{data.header.phone}</span>}
            {data.header.location && <span>{data.header.location}</span>}
          </div>
          <div className="flex justify-center flex-wrap gap-4 mt-1 text-xs text-gray-500">
            {data.header.website && <span>{data.header.website}</span>}
            {data.header.linkedin && <span>{data.header.linkedin}</span>}
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed">{data.summary}</p>
        </div>

        {/* Experience */}
        <div>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">
            Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-xs">{exp.company}</p>
                    <p className="text-xs text-indigo-600">{exp.role}</p>
                  </div>
                  <p className="text-xs">
                    {exp.startDate} – {exp.endDate}
                  </p>
                </div>
                <ul className="mt-1 space-y-1 text-xs">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>• {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start text-xs">
                <div>
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="text-gray-600">{edu.school}</p>
                </div>
                <p>
                  {edu.startYear} - {edu.endYear}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">
            Key Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
