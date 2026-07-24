import { useEffect, useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTenant,
  updateTenant,
  type Tenant,
} from "../../api/tenant";

interface TenantFormProps {
  flatId: string;
  editingTenant?: Tenant | null;
  onSuccess?: () => void;
}

interface TenantFormData {
  full_name: string;
  email: string;
  phone: string;
  aadhaar_number: string;
  occupation: string;
  emergency_contact: string;
  move_in_date: string;
}

function TenantForm({
  flatId,
  editingTenant = null,
  onSuccess,
}: TenantFormProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] =
    useState<TenantFormData>({
      full_name: "",
      email: "",
      phone: "",
      aadhaar_number: "",
      occupation: "",
      emergency_contact: "",
      move_in_date: "",
    });

  useEffect(() => {
    if (editingTenant) {
      setFormData({
        full_name: editingTenant.full_name,
        email: editingTenant.email,
        phone: editingTenant.phone,
        aadhaar_number:
          editingTenant.aadhaar_number,
        occupation:
          editingTenant.occupation,
        emergency_contact:
          editingTenant.emergency_contact,
        move_in_date:
          editingTenant.move_in_date,
      });
    }
  }, [editingTenant]);

  const mutation = useMutation({
    mutationFn: () => {
      if (editingTenant) {
        return updateTenant(
          editingTenant.id,
          {
            ...formData,
            move_out_date:
              editingTenant.move_out_date,
            is_active:
              editingTenant.is_active,
          }
        );
      }

      return createTenant({
        flat_id: flatId,
        ...formData,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants", flatId],
      });

      alert(
        editingTenant
          ? "Tenant updated successfully."
          : "Tenant created successfully."
      );

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        aadhaar_number: "",
        occupation: "",
        emergency_contact: "",
        move_in_date: "",
      });

      onSuccess?.();
    },

    onError: () => {
      alert("Operation failed.");
    },
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement
    >
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
        {editingTenant
          ? "Edit Tenant"
          : "Add Tenant"}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Aadhaar Number
          </label>

          <input
            type="text"
            name="aadhaar_number"
            value={formData.aadhaar_number}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />
        </div>
                <div>
          <label className="mb-2 block font-medium">
            Occupation
          </label>

          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Emergency Contact
          </label>

          <input
            type="text"
            name="emergency_contact"
            value={formData.emergency_contact}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Move In Date
          </label>

          <input
            type="date"
            name="move_in_date"
            value={formData.move_in_date}
            onChange={handleChange}
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
            : editingTenant
            ? "Update Tenant"
            : "Create Tenant"}
        </button>

      </div>

    </form>
  );
}

export default TenantForm;