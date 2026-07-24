import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  UserCog,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [role, setRole] = useState<
    "admin" | "owner" | "tenant"
  >("tenant");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register({
        full_name: fullName,
        email,
        password,
        role,
      });

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ??
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center bg-white p-10 lg:p-20">
      <div className="w-full max-w-md">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
          Welcome
        </p>

        <h2 className="mt-4 text-5xl font-black text-slate-900">
          Create Account
        </h2>

        <p className="mt-4 leading-7 text-slate-500">
          Join LeaseFlow and manage properties
          smarter.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 px-4">

              <User className="h-5 w-5 text-slate-400" />

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none"
                required
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 px-4">

              <Mail className="h-5 w-5 text-slate-400" />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none"
                required
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Choose Role
            </label>

            <div className="grid grid-cols-3 gap-3">

              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`rounded-2xl border p-4 transition ${
                  role === "admin"
                    ? "border-pink-500 bg-pink-50"
                    : "border-slate-200"
                }`}
              >
                <UserCog className="mx-auto mb-2 h-6 w-6 text-pink-500" />
                <p className="text-sm font-semibold">
                  Admin
                </p>
              </button>

              <button
                type="button"
                onClick={() => setRole("owner")}
                className={`rounded-2xl border p-4 transition ${
                  role === "owner"
                    ? "border-pink-500 bg-pink-50"
                    : "border-slate-200"
                }`}
              >
                <Building2 className="mx-auto mb-2 h-6 w-6 text-pink-500" />
                <p className="text-sm font-semibold">
                  Owner
                </p>
              </button>

              <button
                type="button"
                onClick={() => setRole("tenant")}
                className={`rounded-2xl border p-4 transition ${
                  role === "tenant"
                    ? "border-pink-500 bg-pink-50"
                    : "border-slate-200"
                }`}
              >
                <User className="mx-auto mb-2 h-6 w-6 text-pink-500" />
                <p className="text-sm font-semibold">
                  Tenant
                </p>
              </button>

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 px-4">

              <Lock className="h-5 w-5 text-slate-400" />

              <input
                type={
                  showPassword ? "text" : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Create password"
                className="w-full bg-transparent outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="text-slate-400"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>

          </div>
                    <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 px-4">

              <Lock className="h-5 w-5 text-slate-400" />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm password"
                className="w-full bg-transparent outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="text-slate-400 hover:text-pink-500"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>

          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 text-lg font-semibold text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl disabled:opacity-70"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}

            <ArrowRight className="h-5 w-5" />
          </button>

        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="font-semibold text-pink-500 hover:text-pink-600"
          >
            Sign In
          </button>

        </p>

      </div>
    </section>
  );
}

export default RegisterForm;