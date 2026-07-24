const payments = [
  {
    tenant: "John Doe",
    flat: "A-101",
    amount: "₹18,000",
    status: "Paid",
  },
  {
    tenant: "Sarah Wilson",
    flat: "B-203",
    amount: "₹22,000",
    status: "Paid",
  },
  {
    tenant: "Rahul Sharma",
    flat: "C-102",
    amount: "₹16,500",
    status: "Pending",
  },
  {
    tenant: "Priya Patel",
    flat: "A-304",
    amount: "₹19,000",
    status: "Overdue",
  },
];

function statusColor(status: string) {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-red-100 text-red-700";
  }
}

function RecentPayments() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Recent Payments
          </h2>

          <p className="text-sm text-slate-500">
            Latest rent transactions
          </p>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="pb-4 text-left text-sm font-semibold text-slate-500">
                Tenant
              </th>

              <th className="pb-4 text-left text-sm font-semibold text-slate-500">
                Flat
              </th>

              <th className="pb-4 text-left text-sm font-semibold text-slate-500">
                Amount
              </th>

              <th className="pb-4 text-left text-sm font-semibold text-slate-500">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.map((payment, index) => (
              <tr
                key={index}
                className="border-b last:border-none"
              >

                <td className="py-4 font-medium text-slate-800">
                  {payment.tenant}
                </td>

                <td className="py-4 text-slate-600">
                  {payment.flat}
                </td>

                <td className="py-4 font-semibold">
                  {payment.amount}
                </td>

                <td className="py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentPayments;