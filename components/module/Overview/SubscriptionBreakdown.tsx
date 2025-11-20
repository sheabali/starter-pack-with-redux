/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export const SubscriptionBreakdown = ({ monthlyUsers, yearlyUsers }: any) => {
  const total = monthlyUsers + yearlyUsers;

  const data = [
    {
      name: "Monthly Plan",
      value: monthlyUsers,
      color: "#ff6b81",
    },
    {
      name: "Yearly Plan",
      value: yearlyUsers,
      color: "#a66dd4",
    },
  ];

  const renderCustomLabel = ({ cx, cy }: any) => (
    <g>
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-2xl font-bold fill-gray-900"
      >
        {total}
      </text>
      <text
        x={cx}
        y={cy + 15}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-sm fill-gray-500"
      >
        Total
      </text>
    </g>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full w-full">
      <h3 className="text-lg text-gray-900 mb-4">Subscription Breakdown</h3>

      {/* Fully responsive height */}
      <div className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="85%"
              paddingAngle={5}
              dataKey="value"
              label={renderCustomLabel}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-4 items-center mt-4 flex-wrap">
        <p className="text-[#ff6b81] flex items-center gap-2">
          <Box size={16} />
          Monthly ({monthlyUsers})
        </p>
        <p className="text-[#a66dd4] flex items-center gap-2">
          <Box size={16} />
          Yearly ({yearlyUsers})
        </p>
      </div>
    </div>
  );
};
