import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 150000 },
  { month: "Mar", revenue: 175000 },
  { month: "Apr", revenue: 160000 },
  { month: "May", revenue: 210000 },
  { month: "Jun", revenue: 245000 },
];

function RevenueChart() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Revenue Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monthly revenue performance
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>

        <AreaChart data={data}>

          <defs>
            <linearGradient
              id="revenueGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#EC4899"
                stopOpacity={0.7}
              />

              <stop
                offset="95%"
                stopColor="#8B5CF6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#E2E8F0"
          />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tickFormatter={(value) => `₹${value / 1000}k`}
          />

          <Tooltip
           formatter={(value) => [
    `₹${Number(value).toLocaleString()}`,
    "Revenue",
  ]}
/>

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#EC4899"
            strokeWidth={3}
            fill="url(#revenueGradient)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}

export default RevenueChart;