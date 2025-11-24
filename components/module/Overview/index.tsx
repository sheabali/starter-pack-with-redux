/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetMetaQuery } from "@/redux/api/dashboardManagementApi";
import Metric from "./Metric";
import OverviewSkeleton from "./OverviewSkeleton";
import { SubscriptionBreakdown } from "./SubscriptionBreakdown";
import { RevenueGrowthChart } from "./UserChart";

const Overview = () => {
  const { data: metaData, isLoading } = useGetMetaQuery({}) as any;

  if (isLoading) return <OverviewSkeleton />;

  const metric = {
    totalCouple: metaData?.data?.totalCouple || 0,
    totalRevenue: metaData?.data?.totalRevenue || 0,
    totalSubscription: metaData?.data?.totalSubscription || 0,
  };

  return (
    <div className="space-y-6">
      <Metric metric={metric} />

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex-1  min-w-0">
          <RevenueGrowthChart data={metaData?.data?.monthlyGrowth} />
        </div>
        <div className="w-[30%]">
          <SubscriptionBreakdown
            monthlyUsers={metaData?.data?.monthlyPlanUsersCount}
            yearlyUsers={metaData?.data?.yearlyPlanUsersCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
