"use client";

import type React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-xl bg-card border">
      <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
