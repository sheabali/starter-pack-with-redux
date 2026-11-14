"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Calculator,
  BarChart2,
  BadgeCheck,
  CirclePause,
  TrendingUp,
  CalendarCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useGetMeQuery } from "@/redux/api/authApi";

export default function UserOverviewPage() {
  const token = useAppSelector((state) => state.auth.token);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: userData } = useGetMeQuery({ skip: !token }) as any;
  const userName = userData?.firstName || "dermaine";

  return (
    <div className="space-y-8 container mx-auto pb-12">
      {/* Welcome Greeting */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
          Welcome back, {userName}👋
        </h2>
        <p className="text-sm sm:text-base text-gray-500 font-normal mt-1.5">
          Here&apos;s an overview of your immigration journey.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Assessments */}
        <div className="relative overflow-hidden rounded-2xl p-5 border border-emerald-100/80 bg-gradient-to-br from-[#f2f9f5] via-[#eaf6ef] to-[#def2e6] shadow-xs">
          {/* Decorative arcs in background */}
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full border-[10px] border-emerald-200/40 pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-emerald-200/25 pointer-events-none" />

          <div className="relative z-10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00a651] flex items-center justify-center text-white shadow-xs shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[13px] font-semibold text-slate-800">
              Total Assessments
            </span>
          </div>
          <div className="relative z-10 mt-5">
            <span className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              03
            </span>
          </div>
        </div>

        {/* Card 2: Recent Score */}
        <div className="relative overflow-hidden rounded-2xl p-5 border border-amber-100/80 bg-gradient-to-br from-[#fffbf0] via-[#fef6e2] to-[#fdedcd] shadow-xs">
          {/* Decorative arcs in background */}
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full border-[10px] border-amber-200/40 pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-amber-200/25 pointer-events-none" />

          <div className="relative z-10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f59e0b] flex items-center justify-center text-white shadow-xs shrink-0">
              <Calculator className="w-4 h-4" />
            </div>
            <span className="text-[13px] font-semibold text-slate-800">
              Recent Score
            </span>
          </div>
          <div className="relative z-10 mt-5">
            <span className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              412
            </span>
          </div>
        </div>

        {/* Card 3: Reports Generated */}
        <div className="relative overflow-hidden rounded-2xl p-5 border border-rose-100/80 bg-gradient-to-br from-[#fff4f5] via-[#fee7ea] to-[#fcd9de] shadow-xs">
          {/* Decorative arcs in background */}
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full border-[10px] border-rose-200/40 pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-rose-200/25 pointer-events-none" />

          <div className="relative z-10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f43f5e] flex items-center justify-center text-white shadow-xs shrink-0">
              <BarChart2 className="w-4 h-4" />
            </div>
            <span className="text-[13px] font-semibold text-slate-800">
              Reports Generated
            </span>
          </div>
          <div className="relative z-10 mt-5">
            <span className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              03
            </span>
          </div>
        </div>

        {/* Card 4: Pathway Matches Found */}
        <div className="relative overflow-hidden rounded-2xl p-5 border border-sky-100/80 bg-gradient-to-br from-[#f0f8ff] via-[#e4f2fe] to-[#d6ebfd] shadow-xs">
          {/* Decorative arcs in background */}
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full border-[10px] border-sky-200/40 pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-sky-200/25 pointer-events-none" />

          <div className="relative z-10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0284c7] flex items-center justify-center text-white shadow-xs shrink-0">
              <BadgeCheck className="w-4 h-4" />
            </div>
            <span className="text-[13px] font-semibold text-slate-800">
              Pathway Matches Found
            </span>
          </div>
          <div className="relative z-10 mt-5">
            <span className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              01
            </span>
          </div>
        </div>
      </div>

      {/* 3 Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Action 1: Resume Assessment */}
        <div className="bg-white rounded-2xl border border-gray-100/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-11 h-11 rounded-full bg-[#00a651] flex items-center justify-center text-white shadow-xs">
              <CirclePause className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mt-5">
              Resume Assessment
            </h3>
            <p className="text-xs text-gray-500 font-normal mt-1">
              Continue your incomplete assessment
            </p>
          </div>
          <div className="mt-7">
            <Link
              href="/user/assessments"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e8f8f0] hover:bg-[#d6f4e3] text-[#00a651] font-semibold text-xs transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Action 2: View Reports */}
        <div className="bg-white rounded-2xl border border-gray-100/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-11 h-11 rounded-full bg-[#00a651] flex items-center justify-center text-white shadow-xs">
              <TrendingUp className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mt-5">
              View Reports
            </h3>
            <p className="text-xs text-gray-500 font-normal mt-1">
              Access your strategy reports
            </p>
          </div>
          <div className="mt-7">
            <Link
              href="/user/strategy-report"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e8f8f0] hover:bg-[#d6f4e3] text-[#00a651] font-semibold text-xs transition-colors"
            >
              <span>View Reports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Action 3: Book Consultation */}
        <div className="bg-white rounded-2xl border border-gray-100/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-11 h-11 rounded-full bg-[#00a651] flex items-center justify-center text-white shadow-xs">
              <CalendarCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mt-5">
              Book Consultation
            </h3>
            <p className="text-xs text-gray-500 font-normal mt-1">
              Schedule time with an expert
            </p>
          </div>
          <div className="mt-7">
            <Link
              href="/user/consultation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e8f8f0] hover:bg-[#d6f4e3] text-[#00a651] font-semibold text-xs transition-colors"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Assessments Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Recent Assessments
          </h3>
          <Link
            href="/user/assessments"
            className="px-5 py-2 rounded-lg bg-[#d96527] hover:bg-[#c2551d] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="space-y-3">
          {/* Assessment 1 */}
          <div className="bg-white rounded-xl border border-gray-100/90 px-5 py-4 flex items-center justify-between shadow-xs hover:border-gray-200 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 shrink-0">
                <CheckCircle2 className="w-4 h-4 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F172A]">
                  Study in Canada
                </h4>
                <p className="text-xs text-gray-400 font-normal mt-0.5">
                  Jun 4, 2026
                </p>
              </div>
            </div>
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-medium bg-[#f0f6f2] text-[#4d6b5b] border border-[#dcebe1]">
                Started
              </span>
            </div>
          </div>

          {/* Assessment 2 */}
          <div className="bg-white rounded-xl border border-gray-100/90 px-5 py-4 flex items-center justify-between shadow-xs hover:border-gray-200 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 shrink-0">
                <CheckCircle2 className="w-4 h-4 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F172A]">
                  Apply for Permanent Residence/Join Family
                </h4>
                <p className="text-xs text-gray-400 font-normal mt-0.5">
                  Jun 4, 2026
                </p>
              </div>
            </div>
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-medium bg-[#e0f2fe] text-[#0284c7] border border-[#bae6fd]">
                Completed
              </span>
            </div>
          </div>

          {/* Assessment 3 */}
          <div className="bg-white rounded-xl border border-gray-100/90 px-5 py-4 flex items-center justify-between shadow-xs hover:border-gray-200 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 shrink-0">
                <CheckCircle2 className="w-4 h-4 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F172A]">
                  Work in Canada
                </h4>
                <p className="text-xs text-gray-400 font-normal mt-0.5">
                  Jun 4, 2026
                </p>
              </div>
            </div>
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-medium bg-[#f0f6f2] text-[#4d6b5b] border border-[#dcebe1]">
                Started
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
