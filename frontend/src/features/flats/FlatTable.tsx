import {
  Pencil,
  Trash2,
} from "lucide-react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteFlat,
  type Flat,
} from "../../api/flat";

interface FlatTableProps {
  flats: Flat[];
  onEdit?: (flat: Flat) => void;
}

function FlatTable({
  flats,
  onEdit,
}: FlatTableProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteFlat,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flats"],
      });

      alert("Flat deleted successfully.");
    },

    onError: () => {
      alert("Failed to delete flat.");
    },
  });

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this flat?"
    );

    if (!confirmed) return;

    deleteMutation.mutate(id);
  }

  if (flats.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm">
        No flats found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Flat
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Floor
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Bedrooms
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Bathrooms
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Rent
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Deposit
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

          {flats.map((flat) => (

            <tr
              key={flat.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-5 font-semibold">
                {flat.flat_number}
              </td>

              <td className="px-6 py-5">
                {flat.floor}
              </td>

              <td className="px-6 py-5">
                {flat.bedrooms}
              </td>

              <td className="px-6 py-5">
                {flat.bathrooms}
              </td>

              <td className="px-6 py-5 font-medium">
                ₹
                {flat.rent_amount.toLocaleString()}
              </td>

              <td className="px-6 py-5 font-medium">
                ₹
                {flat.deposit_amount.toLocaleString()}
              </td>

              <td className="px-6 py-5">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    flat.status === "Vacant"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {flat.status}
                </span>

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() =>
                      onEdit?.(flat)
                    }
                    className="rounded-xl bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(flat.id)
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

export default FlatTable;