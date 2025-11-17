/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetMetaQuery } from "@/redux/api/apiManagementDashboard";
import Metric from "./Metric";
import { SubscriptionBreakdown } from "./SubscriptionBreakdown";
import { RevenueGrowthChart } from "./UserChart";

const Overview = () => {
  const { data: metaData } = useGetMetaQuery({}) as any;

  if (!metaData) return null;

  console.log("meta", metaData);

  return (
    <div className="space-y-6">
      {/* Metrics component */}
      <Metric />

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
