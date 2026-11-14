"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  GraduationCap,
  Briefcase,
  Paperclip,
  ArrowRight,
} from "lucide-react";

export default function NewAssessmentGoalPage() {
  const goals = [
    {
      id: "pr",
      title: "Apply for Permanent Residence",
      description: "Express Entry, PNPs, and skilled worker programs",
      icon: Home,
      iconBg: "bg-[#eaf8f0]",
      iconColor: "text-[#00a651]",
      href: "/user/assessments/take?type=pr",
    },
    {
      id: "study",
      title: "Study in Canada",
      description: "Student visas, DLIs, and post-graduation pathways",
      icon: GraduationCap,
      iconBg: "bg-[#f3e8ff]",
      iconColor: "text-[#9333ea]",
      href: "/user/assessments/take?type=study",
    },
    {
      id: "work",
      title: "Work in Canada",
      description: "LMIA, open work permits, and IEC programs",
      icon: Briefcase,
      iconBg: "bg-[#fef3c7]",
      iconColor: "text-[#d97706]",
      href: "/user/assessments/take?type=work",
    },
    {
      id: "family",
      title: "Join Family in Canada",
      description: "Spousal, parent, and dependent sponsorship",
      icon: Paperclip,
      iconBg: "bg-[#ffe4e6]",
      iconColor: "text-[#e11d48]",
      href: "/user/assessments/take?type=family",
    },
  ];

  return (
    <div className="space-y-8 container mx-auto pb-12 max-w-5xl">
      {/* Back button */}
      <div>
        <Link
          href="/user/assessments"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Assessment List</span>
        </Link>
      </div>

      {/* Heading */}
      <div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
          Start Your Assessment
        </h2>
        <p className="text-sm text-gray-500 font-normal mt-1.5">
          Select your immigration goal to begin your free eligibility assessment.
        </p>
      </div>

      {/* Goal Cards */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <div
              key={goal.id}
              className="bg-white rounded-2xl border border-gray-100/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${goal.iconBg} ${goal.iconColor} flex items-center justify-center shrink-0 shadow-xs`}
                >
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">
                    {goal.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-normal mt-0.5">
                    {goal.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-auto">
                <Link
                  href={goal.href}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#e8f8f0] hover:bg-[#d4f3e0] text-[#00a651] font-semibold text-xs transition-colors shadow-xs"
                >
                  <span>Start</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
