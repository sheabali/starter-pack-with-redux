/* eslint-disable react-hooks/static-components */
"use client";

import { Box } from "lucide-react";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface PeriodData {
  label: string;
  addedServices: number;
  addedProducts: number;
}

interface AddStatistics {
  monthly: PeriodData;
  sixMonths?: PeriodData;
  yearly?: PeriodData;
}

interface AddStaticsChartProps {
  addStatistics: AddStatistics;
}

export const SubscriptionBreakdown = ({
  addStatistics,
}: AddStaticsChartProps) => {
  const [period, setPeriod] = useState<keyof AddStatistics>("monthly");
  const [isOpen, setIsOpen] = useState(false);

  const periods: Record<
    keyof AddStatistics,
    { label: string; data: PeriodData }
  > = {
    monthly: { label: "Monthly", data: addStatistics.monthly },
    sixMonths: {
      label: "6 Months",
      data: addStatistics.sixMonths || addStatistics.monthly,
    },
    yearly: {
      label: "Yearly",
      data: addStatistics.yearly || addStatistics.monthly,
    },
  };

  const currentData = periods[period].data;
  const total = currentData.addedServices + currentData.addedProducts;

  const data = [
    {
      name: "Added Services",
      value: currentData.addedServices,
      color: "#a66dd4",
    },
    {
      name: "Added Products",
      value: currentData.addedProducts,
      color: "#ef4444",
    },
  ];

  const CustomLabel = ({ cx, cy }: { cx?: number; cy?: number }) => (
    <g>
      <text
        x={cx}
        y={cy! - 10}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-2xl font-bold fill-gray-900"
      >
        {total}
      </text>
      <text
        x={cx}
        y={cy! + 15}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-sm fill-gray-500"
      >
        Total
      </text>
    </g>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      {/* Header with dropdown */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-gray-900">Subscription Breakdown</h3>
        <div className="relative">
          {isOpen && (
            <div className="absolute left-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
              {Object.entries(periods).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => {
                    setPeriod(key as keyof AddStatistics);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-right hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    period === key
                      ? "bg-green-50 text-green-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pie Chart */}
      <div
        className="flex items-center justify-center"
        style={{ height: "280px" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              label={<CustomLabel />}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 items-center">
        <p className="text-[#ff6b81] flex items-center gap-2">
          <Box />
          Monthly (37)
        </p>
        <p className="text-[#a66dd4] flex items-center gap-2">
          <Box /> Yearly (127)
        </p>
      </div>

      {/* Period Label */}
      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">{currentData.label}</p>
      </div>
    </div>
  );
};
