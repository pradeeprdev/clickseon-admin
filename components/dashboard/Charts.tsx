"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartItem = {
  label: string;
  value: number;
};

export default function Charts({
  type,
}: {
  type: "daily" | "monthly";
}) {
  const daily: ChartItem[] = [
    { label: "Mon", value: 12 },
    { label: "Tue", value: 8 },
    { label: "Wed", value: 15 },
    { label: "Thu", value: 10 },
    { label: "Fri", value: 18 },
    { label: "Sat", value: 6 },
    { label: "Sun", value: 4 },
  ];

  const monthly: ChartItem[] = Array.from({ length: 12 }).map((_, i) => ({
    label: `M${i + 1}`,
    value: Math.round(Math.random() * 200),
  }));

  const data = type === "daily" ? daily : monthly;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#6366F1"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}