import { useEffect, useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createProperty,
  updateProperty,
  type CreatePropertyRequest,
  type Property,
} from "../../api/property";

interface PropertyFormProps {
  editingProperty?: Property | null;
  onSuccess?: () => void;
}

function PropertyForm({
  editingProperty,
  onSuccess,
}: PropertyFormProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] =
    useState<CreatePropertyRequest>({
      property_name: "",
      property_type: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      description: "",
    });

  useEffect(() => {
    if (editingProperty) {
      setFormData({
        property_name: editingProperty.property_name,
        property_type: editingProperty.property_type,
        address: editingProperty.address,
        city: editingProperty.city,
        state: editingProperty.state,
        pincode: editingProperty.pincode,
        description: editingProperty.description,
      });
    } else {
      setFormData({
        property_name: "",
        property_type: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        description: "",
      });
    }
  }, [editingProperty]);

  const mutation = useMutation({
    mutationFn: async (
      data: CreatePropertyRequest
    ) => {
      if (editingProperty) {
        return updateProperty(
          editingProperty.id,
          {
            ...data,
            is_active:
              editingProperty.is_active,
          }
        );
      }

      return createProperty(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });

      alert(
        editingProperty
          ? "Property updated successfully!"
          : "Property created successfully!"
      );

      setFormData({
        property_name: "",
        property_type: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        description: "",
      });

      onSuccess?.();
    },

    onError: (error) => {
      console.error(error);

      alert(
        editingProperty
          ? "Failed to update property."
          : "Failed to create property."
      );
    },
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
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
    mutation.mutate(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-slate-900">
        {editingProperty
          ? "Edit Property"
          : "Add Property"}
      </h2>

      <input
        type="text"
        name="property_name"
        placeholder="Property Name"
        value={formData.property_name}
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
        required
      />

      <input
        type="text"
        name="property_type"
        placeholder="Property Type"
        value={formData.property_type}
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
        required
      />

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="rounded-xl border p-3"
          required
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="rounded-xl border p-3"
          required
        />

      </div>

      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        className="w-full rounded-xl border p-3"
        required
      />

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {mutation.isPending
          ? "Saving..."
          : editingProperty
          ? "Update Property"
          : "Save Property"}
      </button>

    </form>
  );
}

export default PropertyForm;