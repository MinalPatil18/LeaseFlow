import { useEffect, useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createFlat,
  updateFlat,
  type Flat,
} from "../../api/flat";

interface FlatFormProps {
  propertyId: string;
  editingFlat?: Flat | null;
  onSuccess?: () => void;
}

interface FlatFormData {
  flat_number: string;
  floor: string;
  bedrooms: string;
  bathrooms: string;
  rent_amount: string;
  deposit_amount: string;
}

function FlatForm({
  propertyId,
  editingFlat = null,
  onSuccess,
}: FlatFormProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] =
    useState<FlatFormData>({
      flat_number: "",
      floor: "",
      bedrooms: "",
      bathrooms: "",
      rent_amount: "",
      deposit_amount: "",
    });

  useEffect(() => {
    if (editingFlat) {
      setFormData({
        flat_number: editingFlat.flat_number,
        floor: editingFlat.floor.toString(),
        bedrooms:
          editingFlat.bedrooms.toString(),
        bathrooms:
          editingFlat.bathrooms.toString(),
        rent_amount:
          editingFlat.rent_amount.toString(),
        deposit_amount:
          editingFlat.deposit_amount.toString(),
      });
    }
  }, [editingFlat]);

  const mutation = useMutation({
    mutationFn: () => {
      if (editingFlat) {
        return updateFlat(editingFlat.id, {
          flat_number: formData.flat_number,
          floor: Number(formData.floor),
          bedrooms: Number(
            formData.bedrooms
          ),
          bathrooms: Number(
            formData.bathrooms
          ),
          rent_amount: Number(
            formData.rent_amount
          ),
          deposit_amount: Number(
            formData.deposit_amount
          ),
          status: editingFlat.status,
        });
      }

      return createFlat({
        property_id: propertyId,
        flat_number: formData.flat_number,
        floor: Number(formData.floor),
        bedrooms: Number(
          formData.bedrooms
        ),
        bathrooms: Number(
          formData.bathrooms
        ),
        rent_amount: Number(
          formData.rent_amount
        ),
        deposit_amount: Number(
          formData.deposit_amount
        ),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flats"],
      });

      alert(
        editingFlat
          ? "Flat updated successfully."
          : "Flat created successfully."
      );

      setFormData({
        flat_number: "",
        floor: "",
        bedrooms: "",
        bathrooms: "",
        rent_amount: "",
        deposit_amount: "",
      });

      onSuccess?.();
    },

    onError: () => {
      alert("Operation failed.");
    },
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    mutation.mutate();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-3xl font-bold">
        {editingFlat
          ? "Edit Flat"
          : "Add Flat"}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Flat Number
          </label>

          <input
            type="text"
            name="flat_number"
            value={formData.flat_number}
            onChange={handleChange}
            placeholder="A101"
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Floor
          </label>

          <input
            type="number"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            placeholder="1"
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Bedrooms
          </label>

          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            placeholder="2"
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Bathrooms
          </label>

          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="2"
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Monthly Rent (₹)
          </label>

          <input
            type="number"
            name="rent_amount"
            value={formData.rent_amount}
            onChange={handleChange}
            placeholder="18000"
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Security Deposit (₹)
          </label>

          <input
            type="number"
            name="deposit_amount"
            value={formData.deposit_amount}
            onChange={handleChange}
            placeholder="50000"
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

      </div>

      <div className="mt-8 flex justify-end gap-4">

        <button
          type="button"
          onClick={() => onSuccess?.()}
          className="rounded-xl border px-6 py-3"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-3 font-semibold text-white disabled:opacity-50"
        >
          {mutation.isPending
            ? "Saving..."
            : editingFlat
            ? "Update Flat"
            : "Create Flat"}
        </button>

      </div>
    </form>
  );
}

export default FlatForm;