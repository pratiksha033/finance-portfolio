"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function PortfolioCharts({ data }: { data: any[] }) {
  const sectorMap: any = {};

  data.forEach((s) => {
    sectorMap[s.sector] = (sectorMap[s.sector] || 0) + s.presentValue;
  });

  const sectorData = Object.keys(sectorMap).map((k) => ({
    name: k,
    value: Number(sectorMap[k].toFixed(0)),
  }));

  const gainData = data.map((s) => ({
    name: s.name,
    gain: Number(s.gainLoss.toFixed(0)),
  }));

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-gray-900 p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold mb-4 text-white">
          Sector Allocation (₹ Value)
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={sectorData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label={({ name, percent = 0 }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {sectorData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-900 p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold mb-4 text-white">
          Profit / Loss per Stock
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={gainData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              angle={-35}
              textAnchor="end"
              height={80}
              interval={0}
            />

            <YAxis />
            <Tooltip />

            <Bar dataKey="gain">
              {gainData.map((d, i) => (
                <Cell key={i} fill={d.gain >= 0 ? "#22c55e" : "#ef4444"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
