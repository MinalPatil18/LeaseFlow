import StatCard from "./StatCard";
import { Building2 } from "lucide-react";

function LoginHero() {
  return (
    <section className="relative hidden overflow-hidden bg-gradient-to-br from-pink-100 via-[#F8F6FF] to-white lg:flex">

      {/* Background Blur */}
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-16">

        {/* Logo + Text */}
        <div>

          <div className="inline-flex items-center gap-3 rounded-full bg-white/80 px-5 py-3 shadow-lg backdrop-blur">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-violet-500">

              <Building2 className="h-6 w-6 text-white" />

            </div>

            <span className="text-lg font-bold text-slate-800">
              LeaseFlow
            </span>

          </div>

          <h1 className="mt-10 text-6xl font-black leading-[1.05] text-slate-900">
            Property
            <br />
            Management
            <br />
            Made Beautiful.
          </h1>

          <p className="mt-8 max-w-lg text-xl leading-9 text-slate-600">
            Manage properties, leases, tenants and payments from one
            beautiful dashboard.
          </p>

        </div>

        {/* Dashboard Preview */}
        <div className="relative flex justify-center">

          <div className="w-[430px] rounded-[36px] border border-white/70 bg-white/70 p-6 shadow-2xl backdrop-blur-xl">

            {/* Revenue Card */}
            <div className="rounded-3xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 p-6 text-white">

              <p className="text-sm opacity-80">
                Monthly Revenue
              </p>

              <h2 className="mt-2 text-5xl font-black">
                ₹2.45L
              </h2>

              <p className="mt-2 opacity-80">
                +18% this month
              </p>

            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">

              <StatCard
                title="Properties"
                value="24"
                color="violet"
              />

              <StatCard
                title="Occupancy"
                value="94%"
                color="pink"
              />

            </div>

            {/* Chart */}
            <div className="mt-6 rounded-3xl bg-slate-50 p-5">

              <div className="mb-5 flex justify-between">

                <span className="font-semibold text-slate-700">
                  Revenue Trend
                </span>

                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
                  Live
                </span>

              </div>

              <div className="flex h-32 items-end gap-3">

                <div className="h-12 w-full rounded-full bg-pink-200"></div>
                <div className="h-20 w-full rounded-full bg-pink-300"></div>
                <div className="h-16 w-full rounded-full bg-violet-200"></div>
                <div className="h-24 w-full rounded-full bg-violet-400"></div>
                <div className="h-28 w-full rounded-full bg-pink-500"></div>
                <div className="h-20 w-full rounded-full bg-violet-300"></div>

              </div>

            </div>

          </div>

          {/* Floating Cards */}

          <StatCard
            title="Revenue"
            value="₹2.45L"
            color="pink"
            className="absolute -right-10 bottom-8"
          />

          <StatCard
            title="Tenants"
            value="128"
            color="violet"
            className="absolute -left-10 top-10"
          />

        </div>

      </div>

    </section>
  );
}

export default LoginHero;