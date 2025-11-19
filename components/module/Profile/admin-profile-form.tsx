/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useAuthChangePasswordMutation,
  useUpdateUserMutation,
} from "@/redux/api/dashboardManagementApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "./password-input";
import { ProfilePictureUpload } from "./profile-picture-upload";

// Schema for profile update
const profileUpdateSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
});

// Schema for password change
const passwordChangeSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

export function AdminProfileForm() {
  const [profilePicture, setProfilePicture] = useState(
    "/placeholder.svg?height=80&width=80"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateUserMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useAuthChangePasswordMutation();

  // Form for profile update
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      fullName: "",
    },
  });

  // Form for password change
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle profile update
  const onProfileSubmit = async (data: ProfileUpdateFormData) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({ fullName: data.fullName }));

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const res = (await updateProfile(formData).unwrap()) as any;

      if (res?.success) {
        toast.success("Profile updated successfully");
      } else {
        toast.error(res?.message || "Failed to update profile");
      }
    } catch (err: any) {
      console.error("Error:", err);
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Something went wrong while updating profile";
      toast.error(errorMessage);
    }
  };

  // Handle password change
  const onPasswordSubmit = async (data: PasswordChangeFormData) => {
    try {
      const res = (await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap()) as any;

      if (res?.success) {
        toast.success("Password changed successfully");
        resetPassword();
      } else {
        toast.error(res?.message || "Failed to change password");
      }
    } catch (err: any) {
      console.error("Error:", err);
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Something went wrong while changing the password";
      toast.error(errorMessage);
    }
  };

  const handlePictureChange = (newPicture: string, file?: File) => {
    setProfilePicture(newPicture);
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Update Form */}
      <form
        onSubmit={handleProfileSubmit(onProfileSubmit)}
        className="space-y-6 bg-white rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Profile Information
        </h2>

        {/* Profile Picture Section */}
        <ProfilePictureUpload
          profilePicture={profilePicture}
          onPictureChange={handlePictureChange}
        />

        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <Input
            {...registerProfile("fullName")}
            placeholder="Enter your full name"
            className="w-full"
          />
          {profileErrors.fullName && (
            <p className="text-sm text-red-500 mt-1">
              {profileErrors.fullName.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isUpdatingProfile}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            {isUpdatingProfile ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>

      {/* Password Change Form */}
      <form
        onSubmit={handlePasswordSubmit(onPasswordSubmit)}
        className="space-y-6 bg-white rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Change Password
        </h2>

        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <PasswordInput
            {...registerPassword("oldPassword")}
            placeholder="••••••••••"
          />
          {passwordErrors.oldPassword && (
            <p className="text-sm text-red-500 mt-1">
              {passwordErrors.oldPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <PasswordInput
            {...registerPassword("newPassword")}
            placeholder="••••••••••"
          />
          {passwordErrors.newPassword && (
            <p className="text-sm text-red-500 mt-1">
              {passwordErrors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <PasswordInput
            {...registerPassword("confirmPassword")}
            placeholder="••••••••••"
          />
          {passwordErrors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {passwordErrors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isChangingPassword}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            {isChangingPassword ? "Changing..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
