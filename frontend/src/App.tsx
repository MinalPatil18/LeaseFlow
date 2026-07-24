import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LeasePage from "./pages/LeasePage";
import PaymentPage from "./pages/PaymentPage";
import SettingsPage from "./pages/SettingsPage";

import DashboardPage from "./features/dashboard/DashboardPage";
import PropertyPage from "./features/properties/PropertyPage";
import FlatPage from "./features/flats/FlatPage";
import TenantPage from "./features/tenants/TenantPage";

import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <RegisterPage />
          )
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <DashboardPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Properties */}
      <Route
        path="/properties"
        element={
          isAuthenticated ? (
            <PropertyPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Flats */}
      <Route
        path="/flats"
        element={
          isAuthenticated ? (
            <FlatPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Tenants */}
      <Route
        path="/tenants"
        element={
          isAuthenticated ? (
            <TenantPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Leases */}
      <Route
        path="/leases"
        element={
          isAuthenticated ? (
            <LeasePage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Payments */}
      <Route
        path="/payments"
        element={
          isAuthenticated ? (
            <PaymentPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          isAuthenticated ? (
            <SettingsPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Invalid Route */}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? "/dashboard" : "/"}
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;