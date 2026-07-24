import { useMemo, useState } from "react";
import { Bell, Search, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Topbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Properties", path: "/properties" },
    { name: "Flats", path: "/flats" },
    { name: "Tenants", path: "/tenants" },
    { name: "Leases", path: "/leases" },
    { name: "Payments", path: "/payments" },
    { name: "Settings", path: "/settings" },
  ];

  const results = useMemo(() => {
    if (!query.trim()) return [];

    return menuItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      {/* Search */}
      <div className="relative w-96">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search className="h-5 w-5 text-slate-400" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages..."
            className="w-full bg-transparent outline-none"
          />
        </div>

        {results.length > 0 && (
          <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border bg-white shadow-lg">
            {results.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setQuery("");
                }}
                className="block w-full border-b px-4 py-3 text-left hover:bg-pink-50"
              >
                <p className="font-medium">{item.name}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-8">
        {/* Date */}
        <div className="hidden text-right lg:block">
          <p className="text-sm text-slate-500">{today}</p>
        </div>

        {/* Notifications */}
        <button className="relative">
          <Bell className="h-6 w-6 text-slate-600" />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <UserCircle2 className="h-10 w-10 text-pink-500" />

          <div>
            <p className="font-semibold text-slate-800">
              {user?.full_name ?? "Guest"}
            </p>

            <p className="text-sm capitalize text-slate-500">
              {user?.role ?? "User"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;