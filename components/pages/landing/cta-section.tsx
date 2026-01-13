"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to land your dream job?
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={"/generator"}>
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 rounded-full px-8 py-6 text-base font-semibold">
              Create Free Resume
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-white">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">No credit card required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
