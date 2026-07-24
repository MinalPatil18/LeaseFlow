import { useEffect, useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createPayment,
  updatePayment,
  type Payment,
} from "../../api/payment";

interface PaymentFormProps {
  leaseId: string;
  editingPayment?: Payment | null;
  onSuccess?: () => void;
}

interface PaymentFormData {
  amount: string;
  payment_date: string;
  payment_method: string;
  receipt_number: string;
  status: string;
}

function PaymentForm({
  leaseId,
  editingPayment = null,
  onSuccess,
}: PaymentFormProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] =
    useState<PaymentFormData>({
      amount: "",
      payment_date: "",
      payment_method: "",
      receipt_number: "",
      status: "paid",
    });

  useEffect(() => {
    if (editingPayment) {
      setFormData({
        amount: editingPayment.amount.toString(),
        payment_date:
          editingPayment.payment_date,
        payment_method:
          editingPayment.payment_method,
        receipt_number:
          editingPayment.receipt_number,
        status: editingPayment.status,
      });
    } else {
      setFormData({
        amount: "",
        payment_date: "",
        payment_method: "",
        receipt_number: "",
        status: "paid",
      });
    }
  }, [editingPayment]);

  const mutation = useMutation({
    mutationFn: () => {
      if (editingPayment) {
        return updatePayment(
          editingPayment.id,
          {
            amount: Number(formData.amount),
            payment_date:
              formData.payment_date,
            payment_method:
              formData.payment_method,
            receipt_number:
              formData.receipt_number,
            status: formData.status,
          }
        );
      }

      return createPayment({
        lease_id: leaseId,
        amount: Number(formData.amount),
        payment_date:
          formData.payment_date,
        payment_method:
          formData.payment_method,
        receipt_number:
          formData.receipt_number,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments", leaseId],
      });

      alert(
        editingPayment
          ? "Payment updated successfully."
          : "Payment added successfully."
      );

      setFormData({
        amount: "",
        payment_date: "",
        payment_method: "",
        receipt_number: "",
        status: "paid",
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
        {editingPayment
          ? "Edit Payment"
          : "Add Payment"}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Amount (₹)
          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="18000"
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Payment Date
          </label>

          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Payment Method
          </label>

          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          >
            <option value="">
              Select Method
            </option>

            <option value="Cash">
              Cash
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="Bank Transfer">
              Bank Transfer
            </option>

            <option value="Cheque">
              Cheque
            </option>

            <option value="Card">
              Card
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Receipt Number
          </label>

          <input
            type="text"
            name="receipt_number"
            value={formData.receipt_number}
            onChange={handleChange}
            placeholder="REC-1001"
            className="w-full rounded-xl border p-3"
          />
        </div>

        {editingPayment && (
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
              <option value="paid">
                Paid
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="failed">
                Failed
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
            : editingPayment
            ? "Update Payment"
            : "Create Payment"}
        </button>

      </div>

    </form>
  );
}

export default PaymentForm;