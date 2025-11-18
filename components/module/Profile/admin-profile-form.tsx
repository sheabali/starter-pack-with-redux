/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useAuthChangePasswordMutation } from "@/redux/api/dashboardManagementApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "./password-input";
import { ProfilePictureUpload } from "./profile-picture-upload";

// Zod validation schema
const adminProfileSchema = z.object({
  // name: z.string().min(2, "Name must be at least 2 characters"),
  // email: z.string().email("Invalid email address"),
  oldPassword: z.string().min(1, "Current password is required"),
  // newPassword: z
  //   .string()
  //   .min(8, "Password must be at least 8 characters")
  //   .optional()
  //   .or(z.literal("")),
  newPassword: z.string().optional().or(z.literal("")),
});
// .refine(
//   (data) => {
//     if (data.newPassword && data.newPassword !== data.confirmPassword) {
//       return false;
//     }
//     return true;
//   },
//   {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   }
// );

type AdminProfileFormData = z.infer<typeof adminProfileSchema>;

export function AdminProfileForm() {
  const [profilePicture, setProfilePicture] = useState(
    "/placeholder.svg?height=80&width=80"
  );
  const [isLoading, setIsLoading] = useState(false);

  const [changePassword, { isLoading: isChangingPassword }] =
    useAuthChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<AdminProfileFormData>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      // name: "Michel",
      // email: "michael@admin.com",
      oldPassword: "",
      // newPassword: "",
      newPassword: "",
    },
  });

  // const newPassword = watch("newPassword");

  const onSubmit = async (data: AdminProfileFormData) => {
    setIsLoading(true);

    try {
      const res = (await changePassword(data).unwrap()) as any;

      if (res?.success) {
        toast.success("Password changed successfully");
        reset();
      } else {
        toast.error(res?.message || "Failed to change password");
      }
    } catch (err: any) {
      console.error("Error:", err);

      // RTK Query error formatting
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Something went wrong while changing the password";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white rounded-lg p-6"
      >
        {/* Profile Picture Section */}
        <ProfilePictureUpload
          profilePicture={profilePicture}
          onPictureChange={setProfilePicture}
        />

        {/* Your Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          {/* <Input
            {...register("name")}
            placeholder="Michel"
            className="w-full"
          /> */}
          {/* {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )} */}
        </div>

        {/* Email Field */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder="michael@admin.com"
            className="w-full"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div> */}

        {/* Change Password Section */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Change Password
          </h2>

          {/* Current Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <PasswordInput
              {...register("oldPassword")}
              placeholder="••••••••••"
            />
            {errors.oldPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <PasswordInput
              {...register("newPassword")}
              placeholder="••••••••••"
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div> */}

          {/* Confirm New Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <PasswordInput
              {...register("newPassword")}
              placeholder="••••••••••"
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            {isLoading ? "Saving..." : "Save & Publish"}
          </Button>
        </div>
      </form>
    </div>
  );
}
