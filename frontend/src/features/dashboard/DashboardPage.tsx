import { Building2, CreditCard, Home, Users } from "lucide-react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatsCard from "../../components/dashboard/StatsCard";
import OccupancyChart from "../../components/dashboard/OccupancyChart";
import { useDashboard } from "../../hooks/useDashboard";

function DashboardPage() {
  const {
    data: dashboard,
    isLoading,
    isError,
  } = useDashboard();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center text-xl font-semibold">
          Loading Dashboard...
        </div>
      </DashboardLayout>
    );
  }

  if (isError || !dashboard) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center text-xl font-semibold text-red-500">
          Failed to load dashboard.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-black text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back 👋 Here's what's happening today.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Properties"
            value={dashboard.total_properties.toString()}
            subtitle="Total Properties"
            icon={<Building2 size={28} />}
            color="from-blue-500 to-cyan-500"
          />

          <StatsCard
            title="Flats"
            value={dashboard.total_flats.toString()}
            subtitle={`${dashboard.vacant_flats} Vacant Flats`}
            icon={<Home size={28} />}
            color="from-green-500 to-emerald-500"
          />

          <StatsCard
            title="Tenants"
            value={dashboard.total_tenants.toString()}
            subtitle={`${dashboard.active_leases} Active Leases`}
            icon={<Users size={28} />}
            color="from-violet-500 to-purple-500"
          />

          <StatsCard
            title="Rent Collected"
            value={`₹${dashboard.total_rent_collected.toLocaleString()}`}
            subtitle={`${dashboard.total_payments} Payments`}
            icon={<CreditCard size={28} />}
            color="from-pink-500 to-rose-500"
          />

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <OccupancyChart
  occupied={dashboard.occupied_flats}
  vacant={dashboard.vacant_flats}
/>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">
              Dashboard Summary
            </h2>

            <div className="space-y-4 text-lg">

              <div className="flex justify-between">
                <span>Occupied Flats</span>
                <span className="font-semibold">
                  {dashboard.occupied_flats}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Vacant Flats</span>
                <span className="font-semibold">
                  {dashboard.vacant_flats}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Active Leases</span>
                <span className="font-semibold">
                  {dashboard.active_leases}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total Payments</span>
                <span className="font-semibold">
                  {dashboard.total_payments}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total Rent</span>
                <span className="font-bold text-green-600">
                  ₹{dashboard.total_rent_collected.toLocaleString()}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;