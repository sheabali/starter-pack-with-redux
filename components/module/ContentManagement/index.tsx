"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

interface PolicyFormData {
  privacyPolicy: string;
  termsOfService: string;
  refundPolicy: string;
}

export function PolicyForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PolicyFormData>({
    defaultValues: {
      privacyPolicy: "",
      termsOfService: "",
      refundPolicy: "",
    },
  });

  const onSubmit = async (data: PolicyFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
  };

  return (
    <div className="w-full container mx-auto p-6 space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Privacy Policy Section */}
        <Card className="p-6 border-0 shadow-sm bg-card">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Privacy Policy
          </h2>
          <textarea
            {...register("privacyPolicy")}
            placeholder="Enter your privacy policy here..."
            className="w-full h-40 p-4 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white gap-2"
              disabled={isSubmitting}
            >
              <Save size={16} />
              Save & Publish Privacy Policy
            </Button>
          </div>
        </Card>

        {/* Terms of Service Section */}
        <Card className="p-6 border-0 shadow-sm bg-card">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Terms of Service
          </h2>
          <textarea
            {...register("termsOfService")}
            placeholder="Enter your terms of service here..."
            className="w-full h-40 p-4 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white gap-2"
              disabled={isSubmitting}
            >
              <Save size={16} />
              Save & Publish Terms of Service
            </Button>
          </div>
        </Card>

        {/* Refund Policy Section */}
        <Card className="p-6 border-0 shadow-sm bg-card">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Refund Policy
          </h2>
          <textarea
            {...register("refundPolicy")}
            placeholder="Enter your Refund policy here..."
            className="w-full h-40 p-4 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white gap-2"
              disabled={isSubmitting}
            >
              <Save size={16} />
              Save & Publish Refund Policy
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
