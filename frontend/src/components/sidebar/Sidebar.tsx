import {
  LayoutDashboard,
  Building2,
  Home,
  Users,
  FileText,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-pink-500 text-white shadow-md"
        : "text-slate-600 hover:bg-pink-50 hover:text-pink-600"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}

      <div className="border-b border-slate-200 p-6">

        <h1 className="text-3xl font-bold text-pink-600">
          LeaseFlow
        </h1>

        {user && (
          <div className="mt-5">

            <p className="text-lg font-semibold text-slate-800">
              {user.full_name}
            </p>

            <span className="mt-2 inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pink-600">
              {user.role}
            </span>

          </div>
        )}

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">

        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        {(user?.role === "admin" || user?.role === "owner") && (
          <>
            <NavLink to="/properties" className={linkClass}>
              <Building2 size={20} />
              Properties
            </NavLink>

            <NavLink to="/flats" className={linkClass}>
              <Home size={20} />
              Flats
            </NavLink>

            <NavLink to="/tenants" className={linkClass}>
              <Users size={20} />
              Tenants
            </NavLink>

            <NavLink to="/leases" className={linkClass}>
              <FileText size={20} />
              Leases
            </NavLink>

            <NavLink to="/payments" className={linkClass}>
              <CreditCard size={20} />
              Payments
            </NavLink>
          </>
        )}

        {user?.role === "tenant" && (
          <>
            <NavLink to="/leases" className={linkClass}>
              <FileText size={20} />
              My Lease
            </NavLink>

            <NavLink to="/payments" className={linkClass}>
              <CreditCard size={20} />
              Payments
            </NavLink>
          </>
        )}
      </nav>

      {/* Bottom */}

      <div className="border-t border-slate-200 p-4 space-y-2">

        <NavLink to="/settings" className={linkClass}>
          <Settings size={20} />
          Settings
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;