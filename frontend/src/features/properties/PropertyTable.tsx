import type { Property } from "../../api/property";
import { deleteProperty } from "../../api/property";

import { Pencil, Trash2 } from "lucide-react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface PropertyTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
}

function PropertyTable({
  properties,
  onEdit,
}: PropertyTableProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteProperty,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });

      alert("Property deleted successfully.");
    },

    onError: (error) => {
      console.error(error);
      alert("Failed to delete property.");
    },
  });

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    deleteMutation.mutate(id);
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-50">
          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Property
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Type
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              City
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {properties.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-8 text-center text-slate-500"
              >
                No properties found.
              </td>
            </tr>
          ) : (
            properties.map((property) => (
              <tr
                key={property.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-5 font-semibold">
                  {property.property_name}
                </td>

                <td className="px-6 py-5">
                  {property.property_type}
                </td>

                <td className="px-6 py-5">
                  {property.city}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      property.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {property.is_active
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(property)}
                      className="rounded-xl bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(property.id)
                      }
                      disabled={deleteMutation.isPending}
                      className="rounded-xl bg-red-100 p-2 text-red-600 transition hover:bg-red-200 disabled:opacity-50"
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

export default PropertyTable;