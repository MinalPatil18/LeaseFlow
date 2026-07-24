import { useEffect, useState } from "react";
import { User, Mail, Shield } from "lucide-react";

import {
  useProfile,
  useUpdateProfile,
} from "../../hooks/useSettings";

function ProfileForm() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name);
    }
  }, [profile]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await updateProfile.mutateAsync({
        full_name: fullName,
      });

      alert("Profile updated successfully.");
    } catch {
      alert("Failed to update profile.");
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold text-slate-900">
        My Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium text-slate-700">
            <User size={18} />
            Full Name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-pink-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium text-slate-700">
            <Mail size={18} />
            Email
          </label>

          <input
            type="email"
            value={profile?.email ?? ""}
            disabled
            className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3"
          />
        </div>

        {/* Role */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium text-slate-700">
            <Shield size={18} />
            Role
          </label>

          <input
            type="text"
            value={profile?.role ?? ""}
            disabled
            className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 capitalize"
          />
        </div>

        <button
          type="submit"
          disabled={updateProfile.isPending}
          className="rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600 disabled:opacity-50"
        >
          {updateProfile.isPending
            ? "Saving..."
            : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;