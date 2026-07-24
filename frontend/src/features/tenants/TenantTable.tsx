import {
  Pencil,
  Trash2,
} from "lucide-react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteTenant,
  type Tenant,
} from "../../api/tenant";

interface TenantTableProps {
  tenants: Tenant[];
  onEdit?: (tenant: Tenant) => void;
}

function TenantTable({
  tenants,
  onEdit,
}: TenantTableProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTenant,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });

      alert(
        "Tenant deleted successfully."
      );
    },

    onError: () => {
      alert("Failed to delete tenant.");
    },
  });

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tenant?"
    );

    if (!confirmed) return;

    deleteMutation.mutate(id);
  }

  if (tenants.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm">
        No tenants found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Phone
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Occupation
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Move In
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {tenants.map((tenant) => (

            <tr
              key={tenant.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-5 font-semibold">
                {tenant.full_name}
              </td>

              <td className="px-6 py-5">
                {tenant.phone}
              </td>

              <td className="px-6 py-5">
                {tenant.email}
              </td>

              <td className="px-6 py-5">
                {tenant.occupation}
              </td>
              <td className="px-6 py-5">
              {tenant.occupation}
               </td>
                             <td className="px-6 py-5">
                {new Date(
                  tenant.move_in_date
                ).toLocaleDateString()}
              </td>

              <td className="px-6 py-5">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    tenant.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {tenant.is_active
                    ? "Active"
                    : "Inactive"}
                </span>

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() =>
                      onEdit?.(tenant)
                    }
                    className="rounded-xl bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(tenant.id)
                    }
                    disabled={
                      deleteMutation.isPending
                    }
                    className="rounded-xl bg-red-100 p-2 text-red-600 transition hover:bg-red-200 disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default TenantTable;