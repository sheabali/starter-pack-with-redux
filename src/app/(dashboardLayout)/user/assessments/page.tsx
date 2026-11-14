"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Home,
  GraduationCap,
  Briefcase,
  Paperclip,
} from "lucide-react";
import AssessmentDetailsModal from "@/components/user/AssessmentDetailsModal";

interface AssessmentItem {
  id: string;
  type: string;
  date: string;
  score: string;
  status: "Completed" | "In progress";
  report: string;
}

const initialAssessments: AssessmentItem[] = [
  {
    id: "assessment-pr-1",
    type: "Permanent Residence",
    date: "Jun 3, 2026",
    score: "85%",
    status: "Completed",
    report: "---",
  },
  {
    id: "assessment-wp-1",
    type: "Work Permit",
    date: "Jun 3, 2026",
    score: "85%",
    status: "Completed",
    report: "---",
  },
  {
    id: "assessment-wp-2",
    type: "Work Permit",
    date: "Jun 3, 2026",
    score: "85%",
    status: "Completed",
    report: "Purchased",
  },
  {
    id: "assessment-wp-3",
    type: "Work Permit",
    date: "Jun 3, 2026",
    score: "85%",
    status: "Completed",
    report: "Purchased",
  },
  {
    id: "assessment-wp-4",
    type: "Work Permit",
    date: "Jun 3, 2026",
    score: "85%",
    status: "Completed",
    report: "Purchased",
  },
];

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

function AssessmentsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isNewView = searchParams.get("view") === "new";

  const [assessments, setAssessments] = useState(initialAssessments);
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewGoal, setShowNewGoal] = useState(isNewView);

  const handleOpenDetails = (item?: AssessmentItem) => {
    setSelectedAssessment(item || assessments[0]);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this assessment?")) {
      setAssessments(assessments.filter((a) => a.id !== id));
    }
  };

  // ----------------------------------------------------
  // VIEW 1: Start Your Assessment (Goal selection)
  // ----------------------------------------------------
  if (showNewGoal || isNewView) {
    return (
      <div className="space-y-8 container mx-auto pb-12 max-w-5xl">
        {/* Back button */}
        <div>
          <button
            onClick={() => {
              setShowNewGoal(false);
              router.push("/user/assessments");
            }}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Assessment List</span>
          </button>
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

  // ----------------------------------------------------
  // VIEW 2: Assessments List (Default)
  // ----------------------------------------------------
  return (
    <div className="space-y-8 container mx-auto pb-12">
      {/* Header and New Assessment Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Assessments List
          </h2>
          <p className="text-sm text-gray-500 font-normal mt-1.5">
            View and manage your immigration assessments.
          </p>
        </div>
        <div>
          <button
            onClick={() => setShowNewGoal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00a651] hover:bg-[#009245] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Assessment</span>
          </button>
        </div>
      </div>

      {/* 3 Summary / In-Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Study in Canada */}
        <div className="bg-white rounded-2xl border border-gray-100/90 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-semibold bg-[#fef9c3] text-[#a16207] border border-[#fef08a]">
              In progress
            </span>
            <h3 className="text-lg font-bold text-[#0F172A] mt-3">
              Study in Canada
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              ID: assessment-3 &bull; May 20
            </p>

            {/* Progress bar */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#111827] rounded-full"
                  style={{ width: "80%" }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-600">80%</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/user/assessments/take?type=study"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#e8f8f0] hover:bg-[#d5f4e1] text-[#00a651] font-semibold text-xs transition-colors"
            >
              <span>Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 2: Apply for Permanent Residence */}
        <div className="bg-white rounded-2xl border border-gray-100/90 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-semibold bg-[#fef9c3] text-[#a16207] border border-[#fef08a]">
              In progress
            </span>
            <h3 className="text-lg font-bold text-[#0F172A] mt-3 truncate">
              Apply for Permanent...
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              ID: assessment-2 &bull; May 20
            </p>

            {/* Progress bar */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#111827] rounded-full"
                  style={{ width: "80%" }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-600">80%</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/user/assessments/take?type=pr"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#e8f8f0] hover:bg-[#d5f4e1] text-[#00a651] font-semibold text-xs transition-colors"
            >
              <span>Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 3: Work in Canada */}
        <div className="bg-white rounded-2xl border border-gray-100/90 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-semibold bg-[#e0f2fe] text-[#0284c7] border border-[#bae6fd]">
              Completed
            </span>
            <h3 className="text-lg font-bold text-[#0F172A] mt-3">
              Work in Canada
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              ID: assessment-1 &bull; May 15
            </p>

            {/* Progress bar */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#111827] rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-600">100%</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => handleOpenDetails()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#e8f8f0] hover:bg-[#d5f4e1] text-[#00a651] font-semibold text-xs transition-colors cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Assessments Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Score</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Report</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {assessments.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {item.type}
                  </td>
                  <td className="py-4 px-6 text-gray-500">{item.date}</td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                      {item.score}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-3.5 py-1 rounded-full text-xs font-medium bg-[#e0f2fe] text-[#0284c7] border border-[#bae6fd]">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {item.report === "Purchased" ? (
                      <span className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                        Purchased
                      </span>
                    ) : (
                      <span className="text-gray-400 font-medium">---</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {/* View / Eye Icon */}
                      <button
                        onClick={() => handleOpenDetails(item)}
                        className="text-[#f59e0b] hover:text-[#d97706] p-1.5 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                        title="View Assessment Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Trash Icon */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-[#ef4444] hover:text-[#dc2626] p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Assessment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-1.5 px-6 py-4 border-t border-gray-100 text-xs">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentPage(1)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold transition-colors ${
              currentPage === 1
                ? "bg-[#00a651] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            1
          </button>

          <button
            onClick={() => setCurrentPage(2)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold transition-colors ${
              currentPage === 2
                ? "bg-[#00a651] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            2
          </button>

          <button
            onClick={() => setCurrentPage(3)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold transition-colors ${
              currentPage === 3
                ? "bg-[#00a651] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            3
          </button>

          <span className="px-1 text-gray-400 font-bold">&bull;&bull;&bull;</span>

          <button
            onClick={() => setCurrentPage(440)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 font-semibold transition-colors"
          >
            440
          </button>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details Modal */}
      <AssessmentDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        assessmentData={selectedAssessment}
      />
    </div>
  );
}

export default function AssessmentsListPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading assessments...</div>}>
      <AssessmentsContent />
    </Suspense>
  );
}
