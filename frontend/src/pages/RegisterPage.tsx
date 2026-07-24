import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-600 lg:flex flex-col justify-center px-20 text-white">
        <h1 className="text-6xl font-black leading-tight">
          LeaseFlow
        </h1>

        <p className="mt-6 text-xl leading-9 text-pink-100">
          Create your account and start managing
          properties, tenants, leases and payments
          effortlessly.
        </p>

        <div className="mt-16 space-y-8">

          <div>
            <h3 className="text-xl font-bold">
              Property Management
            </h3>

            <p className="mt-2 text-pink-100">
              Manage all your properties from one
              dashboard.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              Lease Tracking
            </h3>

            <p className="mt-2 text-pink-100">
              Create and monitor leases with ease.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              Payment Monitoring
            </h3>

            <p className="mt-2 text-pink-100">
              Stay updated with rent payments and
              due dates.
            </p>
          </div>

        </div>
      </div>

      <RegisterForm />
    </div>
  );
}

export default RegisterPage;