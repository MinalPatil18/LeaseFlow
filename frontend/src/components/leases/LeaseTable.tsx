import {
  Pencil,
  Trash2,
} from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  deleteLease,
  type Lease,
} from "../../api/lease";

interface LeaseTableProps {
  leases: Lease[];
  tenantId: string;
  onEdit: (lease: Lease) => void;
}

function LeaseTable({
  leases,
  tenantId,
  onEdit,
}: LeaseTableProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteLease,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leases", tenantId],
      });

      alert("Lease deleted successfully.");
    },

    onError: () => {
      alert("Failed to delete lease.");
    },
  });

  function handleDelete(id: string) {
    const ok = window.confirm(
      "Are you sure you want to delete this lease?"
    );

    if (ok) {
      deleteMutation.mutate(id);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Start
            </th>

            <th className="px-6 py-4 text-left">
              End
            </th>

            <th className="px-6 py-4 text-left">
              Rent
            </th>

            <th className="px-6 py-4 text-left">
              Deposit
            </th>

            <th className="px-6 py-4 text-left">
              Due Day
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

          {leases.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-10 text-center text-slate-500"
              >
                No leases found.
              </td>
            </tr>
          ) : (
            leases.map((lease) => (
              <tr
                key={lease.id}
                className="border-t"
              >
                <td className="px-6 py-4">
                  {lease.lease_start}
                </td>

                <td className="px-6 py-4">
                  {lease.lease_end}
                </td>

                <td className="px-6 py-4">
                  ₹{Number(
                    lease.monthly_rent
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  ₹{Number(
                    lease.security_deposit
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {lease.due_day}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      lease.status === "active"
                        ? "bg-green-100 text-green-700"
                        : lease.status === "expired"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {lease.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(lease)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(lease.id)
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default LeaseTable;