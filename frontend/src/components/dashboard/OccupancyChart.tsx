import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface OccupancyChartProps {
  occupied: number;
  vacant: number;
}

const COLORS = ["#EC4899", "#E2E8F0"];

function OccupancyChart({
  occupied,
  vacant,
}: OccupancyChartProps) {
  const total = occupied + vacant;

  const occupiedPercent =
    total === 0 ? 0 : Math.round((occupied / total) * 100);

  const vacantPercent =
    total === 0 ? 0 : Math.round((vacant / total) * 100);

  const data = [
    {
      name: "Occupied",
      value: occupied,
    },
    {
      name: "Vacant",
      value: vacant,
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Occupancy Rate
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current property occupancy
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
            paddingAngle={4}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-center gap-8">
        <div className="text-center">
          <div className="mx-auto mb-2 h-3 w-3 rounded-full bg-pink-500" />

          <p className="text-sm text-slate-500">Occupied</p>

          <h3 className="font-bold text-slate-900">
            {occupiedPercent}%
          </h3>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-2 h-3 w-3 rounded-full bg-slate-300" />

          <p className="text-sm text-slate-500">Vacant</p>

          <h3 className="font-bold text-slate-900">
            {vacantPercent}%
          </h3>
        </div>
      </div>
    </div>
  );
}

export default OccupancyChart;