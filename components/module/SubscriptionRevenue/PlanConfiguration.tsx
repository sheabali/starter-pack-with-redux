/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import {
  useGetAllSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "@/redux/api/dashboardManagementApi";

interface PricingFormData {
  monthlyPlan: boolean;
  monthlyPrice: number;
  yearlyPlan: boolean;
  yearlyPrice: number;
  yearlyDiscount: number;
}

const PriceInput = ({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) => (
  <div className="flex items-center gap-2">
    <span className="text-sm">$</span>
    <input
      type="number"
      step="0.01"
      min="0"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="flex-1 px-2 py-1 border border-border rounded bg-background text-foreground text-right disabled:opacity-60"
    />
  </div>
);

const DiscountInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => (
  <div className="flex items-center gap-2">
    <input
      type="number"
      step="0.1"
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="flex-1 px-2 py-1 border border-border rounded bg-background text-foreground text-right"
    />
    <span className="text-sm">%</span>
  </div>
);

const PlanConfiguration: React.FC = () => {
  const { control, watch, reset, getValues } = useForm<PricingFormData>({
    defaultValues: {
      monthlyPlan: true,
      monthlyPrice: 51,
      yearlyPlan: false,
      yearlyPrice: 500,
      yearlyDiscount: 20,
    },
  });

  const monthlyPlanActive = watch("monthlyPlan");
  const yearlyPlanActive = watch("yearlyPlan");
  const yearlyPrice = watch("yearlyPrice");
  const yearlyDiscount = watch("yearlyDiscount");

  const { data: subscriptionListData } = useGetAllSubscriptionQuery({}) as any;
  const [updateSubscription] = useUpdateSubscriptionMutation();

  // Extract monthly & yearly subscription from backend
  const monthlySub = subscriptionListData?.data?.find(
    (i: any) => i.duration === "MONTHLY"
  );
  const yearlySub = subscriptionListData?.data?.find(
    (i: any) => i.duration === "YEARLY"
  );

  // Reset form values when backend data loads
  useEffect(() => {
    if (subscriptionListData?.data) {
      reset({
        monthlyPlan: !!monthlySub?.isActive,
        monthlyPrice: monthlySub?.price ?? getValues().monthlyPrice,
        yearlyPlan: !!yearlySub?.isActive,
        yearlyPrice: yearlySub?.price ?? getValues().yearlyPrice,
        yearlyDiscount:
          yearlySub?.discountPercent ?? getValues().yearlyDiscount,
      });
    }
  }, [subscriptionListData]);

  const yearlyFinalPrice = useMemo(
    () => yearlyPrice * (1 - yearlyDiscount / 100) || 0,
    [yearlyPrice, yearlyDiscount]
  );

  const handleTogglePlan = useCallback(
    async (duration: "MONTHLY" | "YEARLY", isActive: boolean) => {
      const sub = duration === "MONTHLY" ? monthlySub : yearlySub;
      if (!sub) return;

      const payload = {
        id: sub.id,
        title: sub.title,
        price:
          duration === "MONTHLY"
            ? getValues("monthlyPrice")
            : getValues("yearlyPrice"),
        duration,
        isDiscounted: duration === "YEARLY",
        discountPercent:
          duration === "MONTHLY" ? 0 : getValues("yearlyDiscount"),
        isActive,
      };

      try {
        await updateSubscription(payload).unwrap();
        toast.success(`${sub.title} updated successfully`);
      } catch (e: any) {
        toast.error(e?.data?.message || "Failed to update subscription");
      }
    },
    [monthlySub, yearlySub, getValues, updateSubscription]
  );

  return (
    <Card className="p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-foreground mb-6">
          Plan Configuration
        </h1>

        {/* Monthly Plan */}
        <Card className="p-4 border border-border mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Controller
                name="monthlyPlan"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={(val) => {
                      field.onChange(val);
                      handleTogglePlan("MONTHLY", val);
                    }}
                  />
                )}
              />
              <div>
                <div className="font-medium">Monthly Plan</div>
                <div className="text-sm text-muted-foreground">
                  {monthlySub?.title ?? "Monthly plan"}
                </div>
              </div>
            </div>

            <Controller
              name="monthlyPrice"
              control={control}
              render={({ field }) => (
                <PriceInput
                  value={field.value}
                  onChange={async (v) => {
                    field.onChange(v);
                    await handleTogglePlan("MONTHLY", monthlyPlanActive);
                  }}
                />
              )}
            />
          </div>
        </Card>

        {/* Yearly Plan */}
        <Card className="p-4 border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Controller
                name="yearlyPlan"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={(val) => {
                      field.onChange(val);
                      handleTogglePlan("YEARLY", val);
                    }}
                  />
                )}
              />
              <div>
                <div className="font-medium">Yearly Plan</div>
                <div className="text-sm text-muted-foreground">
                  {yearlySub?.title ?? "Yearly plan"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <Controller
                name="yearlyPrice"
                control={control}
                render={({ field }) => (
                  <PriceInput
                    value={field.value}
                    onChange={async (v) => {
                      field.onChange(v);
                      await handleTogglePlan("YEARLY", yearlyPlanActive);
                    }}
                  />
                )}
              />
              <Controller
                name="yearlyDiscount"
                control={control}
                render={({ field }) => (
                  <DiscountInput
                    value={field.value}
                    onChange={async (v) => {
                      field.onChange(v);
                      await handleTogglePlan("YEARLY", yearlyPlanActive);
                    }}
                  />
                )}
              />
              <div>
                <div className="text-sm text-muted-foreground">Final Price</div>
                <div className="font-semibold">
                  ${yearlyFinalPrice.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default PlanConfiguration;
