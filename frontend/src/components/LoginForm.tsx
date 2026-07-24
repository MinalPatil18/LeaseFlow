import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await login({
        email,
        password,
      });

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ??
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center bg-white p-10 lg:p-20">
      <div className="w-full max-w-md">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
          Welcome Back
        </p>

        <h2 className="mt-4 text-5xl font-black text-slate-900">
          Sign In
        </h2>

        <p className="mt-4 leading-7 text-slate-500">
          Continue to your LeaseFlow dashboard.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 focus-within:border-pink-400 focus-within:ring-4 focus-within:ring-pink-100">

              <Mail className="h-5 w-5 text-slate-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none"
                required
              />

            </div>
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 focus-within:border-pink-400 focus-within:ring-4 focus-within:ring-pink-100">

              <Lock className="h-5 w-5 text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="text-slate-400 hover:text-pink-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>
          </div>

          {/* Remember Me */}

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm text-slate-600">

              <input
                type="checkbox"
                className="accent-pink-500"
              />

              Remember me

            </label>

            <button
              type="button"
              className="text-sm font-semibold text-pink-500 hover:text-pink-600"
            >
              Forgot Password?
            </button>

          </div>

          {/* Error */}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 text-lg font-semibold text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Sign In"}

            <ArrowRight className="h-5 w-5" />
          </button>

        </form>

        {/* Register */}

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-semibold text-pink-500 hover:text-pink-600"
          >
            Register
          </button>

        </p>

      </div>
    </section>
  );
}

export default LoginForm;