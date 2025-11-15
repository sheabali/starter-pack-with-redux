import Metric from "./Metric";
import { SubscriptionBreakdown } from "./SubscriptionBreakdown";
import { UserJoiningChart } from "./UserChart";

// Mock data for UserJoiningChart (months in English)
const monthlyJoinersMock = [
  { month: "January", count: 12 },
  { month: "February", count: 25 },
  { month: "March", count: 18 },
  { month: "April", count: 30 },
  { month: "May", count: 22 },
  { month: "June", count: 35 },
  { month: "July", count: 28 },
  { month: "August", count: 40 },
  { month: "September", count: 33 },
  { month: "October", count: 45 },
  { month: "November", count: 38 },
  { month: "December", count: 50 },
];

// Mock data for AddStaticsChart (labels in English)
const addStatisticsMock = {
  monthly: {
    label: "October 2025",
    addedServices: 35,
    addedProducts: 50,
  },
  sixMonths: {
    label: "April - September 2025",
    addedServices: 180,
    addedProducts: 220,
  },
  yearly: {
    label: "2025",
    addedServices: 400,
    addedProducts: 500,
  },
};

const Overview = () => {
  return (
    <div className="space-y-6">
      {/* Metrics component */}
      <Metric />

      {/* Charts */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex-1 min-w-0">
          <UserJoiningChart monthlyJoiners={monthlyJoinersMock} />
        </div>
        <div className="w-[30%]">
          <SubscriptionBreakdown addStatistics={addStatisticsMock} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
