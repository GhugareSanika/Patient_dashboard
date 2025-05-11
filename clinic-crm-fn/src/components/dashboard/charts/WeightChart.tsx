"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface WeightData {
  date: string;
  weight: number;
}

interface WeightChartProps {
  data: WeightData[];
}

export function WeightChart({ data }: WeightChartProps) {
  return (
    <div className="h-[400px]">
      <h3 className="font-semibold leading-none tracking-tight mb-4">
        Weight Over Time
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name="Weight (lbs)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
