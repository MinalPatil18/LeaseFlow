import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deletePayment,
  type Payment,
} from "../../api/payment";

interface PaymentTableProps {
  payments: Payment[];
  leaseId: string;
  onEdit: (payment: Payment) => void;
}

function PaymentTable({
  payments,
  leaseId,
  onEdit,
}: PaymentTableProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePayment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments", leaseId],
      });

      alert("Payment deleted successfully.");
    },

    onError: () => {
      alert("Delete failed.");
    },
  });

  return (
    <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Date
            </th>

            <th className="px-6 py-4 text-left">
              Amount
            </th>

            <th className="px-6 py-4 text-left">
              Method
            </th>

            <th className="px-6 py-4 text-left">
              Receipt
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {payments.length === 0 ? (

            <tr>

              <td
                colSpan={6}
                className="py-8 text-center text-gray-500"
              >
                No payments found.
              </td>

            </tr>

          ) : (

            payments.map((payment) => (

              <tr
                key={payment.id}
                className="border-t"
              >

                <td className="px-6 py-4">
                  {payment.payment_date}
                </td>

                <td className="px-6 py-4 font-semibold">
                  ₹
                  {Number(payment.amount).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {payment.payment_method}
                </td>

                <td className="px-6 py-4">
                  {payment.receipt_number}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium
                    ${
                      payment.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : payment.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.status}
                  </span>

                </td>

                <td className="px-6 py-4 text-center">

                  <button
                    onClick={() => onEdit(payment)}
                    className="mr-4 font-medium text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      mutation.mutate(payment.id)
                    }
                    className="font-medium text-red-600"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default PaymentTable;