"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

export default function TakeAssessmentPage() {
  const router = useRouter();

  // Form states
  const [formData, setFormData] = useState({
    firstName: "Dermaine",
    lastName: "Thompson",
    email: "dermaine@example.com",
    phone: "+1 (555) 345-6789",
    dob: "1994-05-15",
    gender: "Male",
    maritalStatus: "Married",
    appliedVisaBefore: "yes",
    visaApproved: "yes",
    nationality: "United States",
    residence: "United States",

    // Language
    takenEnglishTest: "yes",
    englishTestType: "IELTS General Training",
    englishListening: "8.5",
    englishReading: "8.0",
    englishSpeaking: "7.5",
    englishWriting: "7.5",

    takenFrenchTest: "no",
    frenchTestType: "TEF",
    frenchListening: "",
    frenchReading: "",
    frenchSpeaking: "",
    frenchWriting: "",

    // Education
    hasPostSecondary: "yes",
    educationLevel: "Master's Degree",
    fieldOfStudy: "Computer Science",
    hasEca: "yes",
    studiedInCanada: "no",

    // Work
    hasWorkExp: "yes",
    primaryOccupation: "Software Engineer (NOC 21232)",
    yearsOfExp: "5+ years",
    canadianWorkExp: "no",

    // Dependents
    hasDependents: "yes",
    dependentsCount: "1",

    // Adaptability
    hasCanadianRelatives: "yes",
    relativeRelation: "Brother/Sister",
    relativeProvince: "Ontario",

    // Job offer
    hasJobOffer: "no",
    hasLmia: "no",

    // Net worth
    settlementFunds: "$35,000 CAD",
    familyCount: "2",

    // Additional
    hasInadmissibility: "no",
    additionalNotes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Assessment submitted successfully! Score calculated: 85%");
      router.push("/user/assessments");
    }, 800);
  };

  return (
    <div className="space-y-8 container mx-auto pb-16 max-w-5xl">
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Personal Profile */}
        <div className="bg-white rounded-2xl border border-gray-100/90 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#0F172A]">
            Personal Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651] bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651] bg-white"
              >
                <option value="Single">Single / Never Married</option>
                <option value="Married">Married</option>
                <option value="Common-law">Common-law</option>
                <option value="Divorced">Divorced / Separated</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Country of Nationality
              </label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Country of Residence
              </label>
              <input
                type="text"
                name="residence"
                value={formData.residence}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651]"
              />
            </div>

            {/* Yes/No Toggles */}
            <div className="sm:col-span-2 space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Have you ever applied for a Canadian visa?
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggle("appliedVisaBefore", "yes")}
                    className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      formData.appliedVisaBefore === "yes"
                        ? "bg-[#00a651] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggle("appliedVisaBefore", "no")}
                    className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      formData.appliedVisaBefore === "no"
                        ? "bg-[#00a651] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Did you get approval for your visa application?
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggle("visaApproved", "yes")}
                    className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      formData.visaApproved === "yes"
                        ? "bg-[#00a651] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggle("visaApproved", "no")}
                    className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      formData.visaApproved === "no"
                        ? "bg-[#00a651] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Language Skills */}
        <div className="bg-white rounded-2xl border border-gray-100/90 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#0F172A]">
            Your Language Skills
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Have you taken an official English language test?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle("takenEnglishTest", "yes")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.takenEnglishTest === "yes"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle("takenEnglishTest", "no")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.takenEnglishTest === "no"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {formData.takenEnglishTest === "yes" && (
              <div className="p-4 bg-gray-50/60 rounded-xl space-y-4 border border-gray-100">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Which English test did you take?
                  </label>
                  <select
                    name="englishTestType"
                    value={formData.englishTestType}
                    onChange={handleChange}
                    className="w-full sm:w-80 px-4 py-2 rounded-xl border border-gray-200 text-sm bg-white"
                  >
                    <option value="IELTS General Training">IELTS General Training</option>
                    <option value="CELPIP General">CELPIP General</option>
                    <option value="PTE Core">PTE Core</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Enter your scores:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <span className="text-[11px] text-gray-500 block mb-1">Listening</span>
                      <input
                        type="text"
                        name="englishListening"
                        value={formData.englishListening}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white"
                        placeholder="8.5"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 block mb-1">Reading</span>
                      <input
                        type="text"
                        name="englishReading"
                        value={formData.englishReading}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white"
                        placeholder="8.0"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 block mb-1">Speaking</span>
                      <input
                        type="text"
                        name="englishSpeaking"
                        value={formData.englishSpeaking}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white"
                        placeholder="7.5"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 block mb-1">Writing</span>
                      <input
                        type="text"
                        name="englishWriting"
                        value={formData.englishWriting}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white"
                        placeholder="7.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Have you taken an official French language test?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle("takenFrenchTest", "yes")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.takenFrenchTest === "yes"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle("takenFrenchTest", "no")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.takenFrenchTest === "no"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Education and Training */}
        <div className="bg-white rounded-2xl border border-gray-100/90 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#0F172A]">
            Education and Training
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Have you completed post-secondary education?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle("hasPostSecondary", "yes")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.hasPostSecondary === "yes"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle("hasPostSecondary", "no")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.hasPostSecondary === "no"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Highest Level of Education
                </label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white"
                >
                  <option value="Doctoral (PhD)">Doctoral / PhD</option>
                  <option value="Master's Degree">Master&apos;s Degree or Professional Degree</option>
                  <option value="Bachelor's Degree">Bachelor&apos;s Degree (3+ years)</option>
                  <option value="Two or more diplomas">Two or more certificates/diplomas</option>
                  <option value="Post-secondary Diploma">Post-secondary Diploma (1-2 years)</option>
                  <option value="Secondary school">Secondary school / High school</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Did you complete any of your education inside Canada?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle("studiedInCanada", "yes")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.studiedInCanada === "yes"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle("studiedInCanada", "no")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.studiedInCanada === "no"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Work History */}
        <div className="bg-white rounded-2xl border border-gray-100/90 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#0F172A]">
            Your Work History
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Do you have skilled work experience in the past 10 years?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle("hasWorkExp", "yes")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.hasWorkExp === "yes"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle("hasWorkExp", "no")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.hasWorkExp === "no"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Primary Occupation / Job Title
                </label>
                <input
                  type="text"
                  name="primaryOccupation"
                  value={formData.primaryOccupation}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Years of Skilled Work Experience
                </label>
                <select
                  name="yearsOfExp"
                  value={formData.yearsOfExp}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white"
                >
                  <option value="1 year">1 year</option>
                  <option value="2-3 years">2 - 3 years</option>
                  <option value="4-5 years">4 - 5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Do you have at least 1 year of full-time Canadian work experience?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle("canadianWorkExp", "yes")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.canadianWorkExp === "yes"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle("canadianWorkExp", "no")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.canadianWorkExp === "no"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Canadian Adaptability & Job Offer */}
        <div className="bg-white rounded-2xl border border-gray-100/90 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#0F172A]">
            Canadian Connections &amp; Job Offer
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Do you have immediate family or close relatives living in Canada?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle("hasCanadianRelatives", "yes")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.hasCanadianRelatives === "yes"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle("hasCanadianRelatives", "no")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.hasCanadianRelatives === "no"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Do you have a valid written job offer from a Canadian employer?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle("hasJobOffer", "yes")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.hasJobOffer === "yes"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle("hasJobOffer", "no")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.hasJobOffer === "no"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Available Settlement Funds (CAD)
                </label>
                <input
                  type="text"
                  name="settlementFunds"
                  value={formData.settlementFunds}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Total Family Members Included
                </label>
                <input
                  type="number"
                  name="familyCount"
                  value={formData.familyCount}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Additional Information */}
        <div className="bg-white rounded-2xl border border-gray-100/90 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#0F172A]">
            Additional Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Do you or any accompanying family members have medical or criminal inadmissibility issues?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle("hasInadmissibility", "yes")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.hasInadmissibility === "yes"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle("hasInadmissibility", "no")}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    formData.hasInadmissibility === "no"
                      ? "bg-[#00a651] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Notes or specific questions (Optional)
              </label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows={3}
                placeholder="Mention any details about your case or goals..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#00a651]"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/user/assessments"
            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 text-sm font-semibold transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#00a651] hover:bg-[#009245] text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Submit Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
