import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import PropertyTable from "./PropertyTable";
import PropertyForm from "./PropertyForm";

import { useProperties } from "../../hooks/useProperties";
import type { Property } from "../../api/property";

function PropertyPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] =
    useState<Property | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    data: properties,
    isLoading,
    isError,
  } = useProperties();

  const filteredProperties = useMemo(() => {
    if (!properties) return [];

    return properties.filter((property) =>
      property.property_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      property.city
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      property.property_type
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [properties, searchTerm]);

  const totalPages = Math.ceil(
    filteredProperties.length / pageSize
  );

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center text-xl font-semibold">
          Loading Properties...
        </div>
      </DashboardLayout>
    );
  }

  if (isError || !properties) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center text-xl font-semibold text-red-500">
          Failed to load properties.
        </div>
      </DashboardLayout>
    );
  }

  function handleEdit(property: Property) {
    setEditingProperty(property);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setEditingProperty(null);
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900">
              Properties
            </h1>

            <p className="mt-2 text-slate-500">
              Manage all your properties.
            </p>
          </div>

          <button
            onClick={() => {
              if (showForm) {
                handleCloseForm();
              } else {
                setShowForm(true);
              }
            }}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            <Plus size={20} />
            {showForm ? "Close Form" : "Add Property"}
          </button>
        </div>

        <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border bg-white px-4 py-3">
          <Search
            className="text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search by property, city or type..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-transparent outline-none"
          />
        </div>

        <p className="text-sm text-slate-500">
          Showing {paginatedProperties.length} of{" "}
          {filteredProperties.length} properties
        </p>

        {showForm && (
          <PropertyForm
            editingProperty={editingProperty}
            onSuccess={handleCloseForm}
          />
        )}

        <PropertyTable
          properties={paginatedProperties}
          onEdit={handleEdit}
        />

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <button
              onClick={() =>
                setCurrentPage((p) => p - 1)
              }
              disabled={currentPage === 1}
              className="rounded-xl border px-4 py-2 disabled:opacity-50"
            >
              ← Previous
            </button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) => p + 1)
              }
              disabled={currentPage === totalPages}
              className="rounded-xl border px-4 py-2 disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default PropertyPage;