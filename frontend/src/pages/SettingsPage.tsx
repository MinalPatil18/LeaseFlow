import DashboardLayout from "../components/layouts/DashboardLayout";
import ProfileForm from "../components/settings/ProfileForm";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";

function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Settings
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your profile and account.
          </p>
        </div>

        <ProfileForm />
        <ChangePasswordForm />
      </div>
    </DashboardLayout>
  );
}

export default SettingsPage;