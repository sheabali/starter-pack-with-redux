/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetMetaQuery } from "@/redux/api/apiManagementDashboard";
import Metric from "./Metric";
import OverviewSkeleton from "./OverviewSkeleton";
import { SubscriptionBreakdown } from "./SubscriptionBreakdown";
import { RevenueGrowthChart } from "./UserChart";

const Overview = () => {
  const { data: metaData, isLoading } = useGetMetaQuery({}) as any;

  if (isLoading) return <OverviewSkeleton />;

  console.log("meta", metaData);

  const metric = {
    totalCouple: metaData?.data?.totalCouple || 0,
    totalRevenue: metaData?.data?.totalRevenue || 0,
    totalSubscription: metaData?.data?.totalSubscription || 0,
  };

  return (
    <div className="space-y-6">
      {/* Metrics component */}
      <Metric metric={metric} />

      {/* Charts */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex-1  min-w-0">
          <RevenueGrowthChart data={metaData?.data?.monthlyGrowth} />
        </div>
        <div className="w-[30%]">
          <SubscriptionBreakdown
            monthlyUsers={metaData?.data?.monthlyPlanUser}
            yearlyUsers={metaData?.data?.yearlyPlanUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
