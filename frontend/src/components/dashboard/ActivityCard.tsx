import {
  Building2,
  CreditCard,
  FileText,
  UserPlus,
} from "lucide-react";

const activities = [
  {
    title: "New Tenant Added",
    description: "Rahul Sharma joined Flat A-203",
    time: "5 min ago",
    icon: <UserPlus className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Rent Payment Received",
    description: "₹18,000 received from John Doe",
    time: "25 min ago",
    icon: <CreditCard className="h-5 w-5" />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Property Added",
    description: "Sunrise Residency was created",
    time: "1 hour ago",
    icon: <Building2 className="h-5 w-5" />,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Lease Renewed",
    description: "Lease renewed for Flat B-102",
    time: "2 hours ago",
    icon: <FileText className="h-5 w-5" />,
    color: "bg-violet-100 text-violet-600",
  },
];

function ActivityCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Recent Activity
        </h2>

        <p className="text-sm text-slate-500">
          Latest updates in LeaseFlow
        </p>
      </div>

      <div className="space-y-5">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4"
          >

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${activity.color}`}
            >
              {activity.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-slate-800">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {activity.description}
              </p>

            </div>

            <span className="text-xs text-slate-400">
              {activity.time}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ActivityCard;