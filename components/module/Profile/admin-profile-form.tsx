/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useGetMeQuery } from "@/redux/api/authApi";
import {
  useAuthChangePasswordMutation,
  useUpdateUserMutation,
} from "@/redux/api/dashboardManagementApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "./password-input";
import { ProfilePictureUpload } from "./profile-picture-upload";

const profileUpdateSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
});

const passwordChangeSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

export function AdminProfileForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: profileData, isLoading: isLoadingProfile } = useGetMeQuery(
    {}
  ) as any;

  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateUserMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useAuthChangePasswordMutation();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    setValue,
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      fullName: "",
    },
  });

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

  useEffect(() => {
    if (profileData?.data?.fullName) {
      setValue("fullName", profileData.data.fullName);
    }
  }, [profileData, setValue]);

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
    if (file) {
      setSelectedFile(file);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  const profilePicture =
    profileData?.data?.profile || "/placeholder.svg?height=80&width=80";

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleProfileSubmit(onProfileSubmit)}
        className="space-y-6 bg-white rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Profile Information
        </h2>

        <ProfilePictureUpload
          profilePicture={profilePicture}
          onPictureChange={handlePictureChange}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <Input
            {...registerProfile("fullName")}
            placeholder="Enter your full name"
            defaultValue={profileData?.data?.fullName || ""}
            className="w-full"
          />
          {profileErrors.fullName && (
            <p className="text-sm text-red-500 mt-1">
              {profileErrors.fullName.message}
            </p>
          )}
        </div>

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

      <form
        onSubmit={handlePasswordSubmit(onPasswordSubmit)}
        className="space-y-6 bg-white rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Change Password
        </h2>

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
