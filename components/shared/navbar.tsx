"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              B
            </div>
            <span>ResumeAI</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link className="hidden md:flex" href={"/#how-it-works"}>
              <Button
                variant="ghost"
                className="text-sm hover:bg-transparent cursor-pointer hover:text-[#212121]"
              >
                How it work
              </Button>
            </Link>
            <Link href={"/generator"}>
              <Button className="gradient-primary gradient-primary-hover text-sm cursor-pointer">
                Generate Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
