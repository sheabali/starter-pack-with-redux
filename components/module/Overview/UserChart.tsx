"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlyJoiner {
  month: string;
  count: number;
}

interface UserJoiningChartProps {
  monthlyJoiners: MonthlyJoiner[];
}

export function UserJoiningChart({ monthlyJoiners }: UserJoiningChartProps) {
  // Map API data to chart format
  const data = monthlyJoiners.map((item) => ({
    month: item.month,
    users: item.count,
  }));

  return (
    <Card className="bg-white border-0 shadow-2xl p-4 rounded-2xl h-[65vh]">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Revenue Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-120">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 0, left: 0, bottom: 10 }}
              layout="horizontal"
            >
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <YAxis
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                domain={[0, Math.max(...data.map((d) => d.users)) + 5]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                labelFormatter={(label) => `Month: ${label}`}
                formatter={(value) => [`${value} users`, "Users"]}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#8b5cf6"
                strokeWidth={1}
                fill="url(#userGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
