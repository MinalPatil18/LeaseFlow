type StatCardProps = {
  title: string;
  value: string;
  color?: "pink" | "violet" | "green" | "blue";
  className?: string;
};

const colorClasses = {
  pink: {
    text: "text-pink-600",
    bg: "bg-pink-100",
  },
  violet: {
    text: "text-violet-600",
    bg: "bg-violet-100",
  },
  green: {
    text: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  blue: {
    text: "text-sky-600",
    bg: "bg-sky-100",
  },
};

function StatCard({
  title,
  value,
  color = "pink",
  className = "",
}: StatCardProps) {
  const theme = colorClasses[color];

  return (
    <div
      className={`rounded-3xl bg-white p-5 shadow-xl border border-slate-100 ${className}`}
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bg}`}
      >
        <div className={`h-3 w-3 rounded-full ${theme.text} bg-current`} />
      </div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className={`mt-2 text-3xl font-bold ${theme.text}`}>
        {value}
      </h3>
    </div>
  );
}

export default StatCard;