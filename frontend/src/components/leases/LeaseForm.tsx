import { useEffect, useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createLease,
  updateLease,
  type Lease,
} from "../../api/lease";

interface LeaseFormProps {
  tenantId: string;
  flatId: string;
  editingLease?: Lease | null;
  onSuccess?: () => void;
}

interface LeaseFormData {
  lease_start: string;
  lease_end: string;
  monthly_rent: string;
  security_deposit: string;
  due_day: string;
  status: string;
}

function LeaseForm({
  tenantId,
  flatId,
  editingLease = null,
  onSuccess,
}: LeaseFormProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] =
    useState<LeaseFormData>({
      lease_start: "",
      lease_end: "",
      monthly_rent: "",
      security_deposit: "",
      due_day: "",
      status: "active",
    });

  useEffect(() => {
    if (editingLease) {
      setFormData({
        lease_start: editingLease.lease_start,
        lease_end: editingLease.lease_end,
        monthly_rent:
          editingLease.monthly_rent.toString(),
        security_deposit:
          editingLease.security_deposit.toString(),
        due_day:
          editingLease.due_day.toString(),
        status: editingLease.status,
      });
    } else {
      setFormData({
        lease_start: "",
        lease_end: "",
        monthly_rent: "",
        security_deposit: "",
        due_day: "",
        status: "active",
      });
    }
  }, [editingLease]);

  const mutation = useMutation({
    mutationFn: () => {
      if (editingLease) {
        return updateLease(editingLease.id, {
          lease_start: formData.lease_start,
          lease_end: formData.lease_end,
          monthly_rent: Number(
            formData.monthly_rent
          ),
          security_deposit: Number(
            formData.security_deposit
          ),
          due_day: Number(formData.due_day),
          status: formData.status,
        });
      }

      return createLease({
        tenant_id: tenantId,
        flat_id: flatId,
        lease_start: formData.lease_start,
        lease_end: formData.lease_end,
        monthly_rent: Number(
          formData.monthly_rent
        ),
        security_deposit: Number(
          formData.security_deposit
        ),
        due_day: Number(formData.due_day),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leases", tenantId],
      });

      alert(
        editingLease
          ? "Lease updated successfully."
          : "Lease created successfully."
      );

      setFormData({
        lease_start: "",
        lease_end: "",
        monthly_rent: "",
        security_deposit: "",
        due_day: "",
        status: "active",
      });

      onSuccess?.();
    },

    onError: () => {
      alert("Operation failed.");
    },
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
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
        {editingLease ? "Edit Lease" : "Add Lease"}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Lease Start
          </label>

          <input
            type="date"
            name="lease_start"
            value={formData.lease_start}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Lease End
          </label>

          <input
            type="date"
            name="lease_end"
            value={formData.lease_end}
            onChange={handleChange}
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
            name="monthly_rent"
            value={formData.monthly_rent}
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
            name="security_deposit"
            value={formData.security_deposit}
            onChange={handleChange}
            placeholder="50000"
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Due Day
          </label>

          <input
            type="number"
            name="due_day"
            min={1}
            max={31}
            value={formData.due_day}
            onChange={handleChange}
            placeholder="5"
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        {editingLease && (
          <div>
            <label className="mb-2 block font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            >
              <option value="active">
                Active
              </option>

              <option value="expired">
                Expired
              </option>

              <option value="terminated">
                Terminated
              </option>
            </select>
          </div>
        )}

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
            : editingLease
            ? "Update Lease"
            : "Create Lease"}
        </button>

      </div>

    </form>
  );
}

export default LeaseForm;