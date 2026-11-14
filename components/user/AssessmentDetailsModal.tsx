"use client";

import React from "react";
import { X } from "lucide-react";

interface AssessmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentData?: {
    id: string;
    type: string;
    date: string;
    score: string;
    status: string;
  } | null;
}

export default function AssessmentDetailsModal({
  isOpen,
  onClose,
  assessmentData,
}: AssessmentDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-serif text-2xl font-bold text-[#0F172A]">
            Assessment Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-8 text-sm">
          {/* Section 1: Personal Profile */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              Personal Profile
            </h3>
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Full Name</span>
                <span className="font-semibold text-gray-900">Dermaine Thompson</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Email Address</span>
                <span className="font-semibold text-gray-900">dermaine@example.com</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Phone Number</span>
                <span className="font-semibold text-gray-900">+1 (555) 345-6789</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Date of Birth</span>
                <span className="font-semibold text-gray-900">15/05/1994</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Gender</span>
                <span className="font-semibold text-gray-900">Male</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Marital Status</span>
                <span className="font-semibold text-gray-900">Married</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Have you ever applied for a Canadian visa?</span>
                <span className="font-semibold text-gray-900">Yes</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Did you get approval for your visa application?</span>
                <span className="font-semibold text-gray-900">Yes</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Country of Nationality</span>
                <span className="font-semibold text-gray-900">United States</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Country of Residence</span>
                <span className="font-semibold text-gray-900">United States</span>
              </div>
            </div>
          </div>

          {/* Section 2: Language Skills */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              Language Skills
            </h3>
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Have you taken an English language test?</span>
                <span className="font-semibold text-gray-900">Yes</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Which official language test did you take (English)?</span>
                <span className="font-semibold text-gray-900">IELTS General Training</span>
              </div>
              <div className="py-2.5 flex justify-between items-start text-xs">
                <span className="text-gray-500">Test Scores</span>
                <div className="text-right space-y-0.5 font-semibold text-gray-900">
                  <div>Listening: 8.5</div>
                  <div>Reading: 8.0</div>
                  <div>Speaking: 7.5</div>
                  <div>Writing: 7.5</div>
                </div>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Have you taken a French language test?</span>
                <span className="font-semibold text-gray-900">Yes</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Which official language test did you take (French)?</span>
                <span className="font-semibold text-gray-900">TEF</span>
              </div>
              <div className="py-2.5 flex justify-between items-start text-xs">
                <span className="text-gray-500">Test Scores</span>
                <div className="text-right space-y-0.5 font-semibold text-gray-900">
                  <div>Listening: 7.0</div>
                  <div>Reading: 7.0</div>
                  <div>Speaking: 6.5</div>
                  <div>Writing: 6.5</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Education and Training */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              Education and Training
            </h3>
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Have you completed post-secondary education?</span>
                <span className="font-semibold text-gray-900">Yes</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Highest level of completed education</span>
                <span className="font-semibold text-gray-900">Master&apos;s Degree or Professional Degree</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Field of Study</span>
                <span className="font-semibold text-gray-900">Computer Science & Information Technology</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Have you obtained an ECA for your education?</span>
                <span className="font-semibold text-gray-900">Yes (WES)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Did you study in Canada?</span>
                <span className="font-semibold text-gray-900">No</span>
              </div>
            </div>
          </div>

          {/* Section 4: Work History */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              Work History
            </h3>
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Do you have skilled work experience?</span>
                <span className="font-semibold text-gray-900">Yes</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Primary Occupation (NOC TEER)</span>
                <span className="font-semibold text-gray-900">21232 - Software Developer</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Years of Skilled Work Experience</span>
                <span className="font-semibold text-gray-900">5+ Years</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Canadian Work Experience</span>
                <span className="font-semibold text-gray-900">None</span>
              </div>
            </div>
          </div>

          {/* Section 5: Canadian Adaptability & Connections */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              Canadian Adaptability and Connections
            </h3>
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Do you have family or relatives living in Canada?</span>
                <span className="font-semibold text-gray-900">Yes</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Relationship to relative</span>
                <span className="font-semibold text-gray-900">Brother / Sister</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Province of Residence</span>
                <span className="font-semibold text-gray-900">Ontario</span>
              </div>
            </div>
          </div>

          {/* Section 6: Canadian Job Offer */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              Canadian Job Offer
            </h3>
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Do you have a valid job offer from a Canadian employer?</span>
                <span className="font-semibold text-gray-900">No</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Are you currently working in Canada on a work permit?</span>
                <span className="font-semibold text-gray-900">No</span>
              </div>
            </div>
          </div>

          {/* Section 7: Net Worth */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              Your Personal Net Worth
            </h3>
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Settlement Funds Available (CAD)</span>
                <span className="font-semibold text-gray-900">$35,000 CAD</span>
              </div>
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Number of Family Members Included</span>
                <span className="font-semibold text-gray-900">2</span>
              </div>
            </div>
          </div>

          {/* Section 8: Additional Information */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              Additional Information
            </h3>
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              <div className="py-2.5 flex justify-between items-center text-xs">
                <span className="text-gray-500">Do you have any medical or criminal inadmissibility issues?</span>
                <span className="font-semibold text-gray-900">No</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end bg-gray-50/50">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-[#00a651] text-[#00a651] hover:bg-[#e8f8f0] text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
